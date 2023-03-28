namespace WeatherApp.Repositories
{
    public interface IWeatherRepository
    {
        List<Location> GetAllLocations();
        Location GetLocation(int id);
        List<Location> AddLocation(string location);
        Location AddWeather(Location location);
        Location UpdateLocation(int id, Location location);
        Location DeleteLocation(int id);
        Weather DeleteWeather(int id, int weatherId);
    }
}
