using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Server.Models.EntityModel;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ProductManagementContext _context;
        public CustomerController()
        {
            _context = new ProductManagementContext();
        }

        // Get all the customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await _context.Customers.ToListAsync();
        }

        // Add a new customer
        [HttpPost]
        public async Task<ActionResult> AddCustomer([FromBody] Customer newCustomer) // binds with data from http request body
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Customers.Add(newCustomer);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(AddCustomer), newCustomer);
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong: " + ex.Message);
            }
        }

        // Delete a customer
        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveCustomer(int id)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == id);

            if (customer == null)
            {
                return BadRequest("Customer with given id not found");
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Update a customer
        [HttpPatch("{id}")]
        public async Task<ActionResult> UpdateCustomer(int id, [FromBody] JsonPatchDocument<Customer> updatedCustomer)
        {
            var existsCustomer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == id);
            
            if (existsCustomer == null) return BadRequest();
            
            updatedCustomer.ApplyTo(existsCustomer);
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}
