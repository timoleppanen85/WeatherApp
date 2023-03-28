namespace WeatherApp.Models
{
    public class Weather
    {
        public int Id { get; set; }
        public int Temperature { get; set; }
        public int RainAmountMM { get; set; }
        public int WindSpeed { get; set; }
        public DateOnly Date { get; set; }

        public Weather(int temperature, int rainAmountMM, int windSpeed, DateOnly date)
        {
            Temperature = temperature;
            RainAmountMM = rainAmountMM;
            WindSpeed = windSpeed;
            Date = date;
        }

        public Weather() { }
    }
}
