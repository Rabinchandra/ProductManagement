using AngularApp1.Server.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Server.Models.EntityModel;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ProductManagementContext _context;

        public OrderController()
        {
            _context = new ProductManagementContext();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetAllOrders()
        {
            return await _context.OrderDetails.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult> AddOrder([FromBody] NewOrderDTO newOrder)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid order format");

            try
            {
                // Find the total amount - required for new order
                var totalAmount = newOrder.OrderDetails.Sum(o => o.Price * o.Quantity);

                // Create a new order
                var order = new Order
                {
                    CustomerId = newOrder.CustomerId,
                    OrderDate = newOrder.OrderDate,
                    Total = totalAmount
                };

                // Add the order
                _context.Orders.Add(order);

                // Save changes to generate the OrderId
                await _context.SaveChangesAsync();

                // Now the order.OrderId will have the generated ID
                var generatedOrderId = order.OrderId;

                // Add each order detail - with the generated order id
                newOrder.OrderDetails.ForEach(od =>
                {
                    var orderDetail = new OrderDetail
                    {
                        OrderId = generatedOrderId,
                        ProductId = od.ProductId,
                        Price = od.Price,
                        Quantity = od.Quantity
                    };

                    _context.OrderDetails.Add(orderDetail);
                });

                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(AddOrder), generatedOrderId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveOrder(int id)
        {
            var order = _context.Orders.FirstOrDefault(o => o.OrderId == id);
            var orderDetails = _context.OrderDetails.Where(o => o.OrderId == id).ToList();

            if (order == null) return BadRequest("Order with given id doesn't exists");

            // Remove all order details from OrderDetails Table
            orderDetails.ForEach(od => _context.OrderDetails.Remove(od));

            // Then remove the order from order table
            _context.Orders.Remove(order);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Update document
        [HttpPatch("id")]
        public async Task<ActionResult> UpdateOrderDetail(int id, [FromBody] JsonPatchDocument<OrderDetail> updatedOrder)
        {
            var currentOrderDetail = await _context.OrderDetails.FirstOrDefaultAsync(od => od.OrderDetailId == id);

            if (currentOrderDetail == null) return BadRequest("Order with given id not found");

            updatedOrder.ApplyTo(currentOrderDetail);

            // We need to modify the total amount in order table since we change quantity
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.OrderId == currentOrderDetail.OrderId);
            // To calculate the updated total amount
            var orderDetails = _context.OrderDetails.Where(od => od.OrderId == currentOrderDetail.OrderId).ToList();

            // Calculate the total amount
            var totalAmount = orderDetails.Sum(od => od.Price * od.Quantity);

            order.Total = totalAmount;

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
