using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Models.EntityModel;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductManagementContext _context;
        public ProductController()
        {
            _context = new ProductManagementContext();
        }

        [HttpGet]
        public ActionResult GetProducts()
        {
            return Ok(_context.Products);
        }
    }
}
