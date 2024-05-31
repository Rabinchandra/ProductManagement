namespace AngularApp1.Server.Models.DTO
{
    public class NewOrderDTO
    {
        public int CustomerId { get; set; }
        public DateOnly OrderDate { get; set; }

        public List<NewOrderDetailDTO> OrderDetails { get; set; }
    }
}
