namespace WeatherApp.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Weather> Weather { get; set; }

        public Location(int id, string name)
        {
            Id = id;
            Name = name;
            Weather = new();
        }

        public Location(int id, string name, List<Weather> weathers)
        {
            Id = id;
            Name = name;
            Weather = weathers;
        }

        public Location() { }
    }
}
