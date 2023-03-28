namespace WeatherApp.Repositories
{
    public class WeatherRepository : IWeatherRepository
    {
        private static readonly List<Location> _locations = new()
        {
            new Location()
            {
                Id = 1,
                Name = "Helsinki",
                Weather = new()
                {
                    new Weather() {
                        Id = 1,
                        Temperature = 20,
                        RainAmountMM = 0,
                        WindSpeed = 6,
                        Date = new DateOnly( 2023, 03, 15)
                    }
                }
            },
            new Location()
            {
                Id = 2,
                Name = "Lappeenranta",
                Weather = new()
                {
                    new Weather() {
                        Id = 1,
                        Temperature = 15,
                        RainAmountMM = 55,
                        WindSpeed = 12,
                        Date = new DateOnly( 2023, 03, 16)
                    }
                }
            }
        };

        public List<Location> GetAllLocations()
        {
            return _locations;
        }

        public Location GetLocation(int id)
        {
            Location? _location = FindLocation(id);

            return _location ?? null!;

        }

        public List<Location> AddLocation(string location)
        {
            int id = 0;

            // Check existing ID's and assign unused to avoid duplicates
            foreach (Location locale in _locations)
            {
                id = id < locale.Id ? locale.Id : id;
            }

            id++;
            _locations.Add(new Location(id, location.ToLower()));
            return _locations;
        }

        public Location AddWeather(Location location)
        {
            int id = 0;

            Location? _location = FindLocation(location.Id);
            if (_location != null)
            {
                foreach (Weather weather in _location.Weather)
                {
                    id = id < weather.Id ? weather.Id : id;
                }

                _location.Weather.Add(location.Weather.FirstOrDefault()!);
                _location.Weather.Sort((x, y) => y.Date.CompareTo(x.Date));
            }

            return _location ?? null!;
        }

        public Location UpdateLocation(int id, Location location)
        {
            Location _location = FindLocation(id);
            if (_location != null)
            {
                _location.Name = location.Name;
            }

            return _location ?? null!;
        }

        public Location DeleteLocation(int id)
        {
            Location _location = FindLocation(id);
            if (_location != null)
            {
                _locations.Remove(_location);
            }
            return _location ?? null!;
        }

        public Weather DeleteWeather(int id, int weatherId)
        {
            Location _location = FindLocation(id);
            if (_location != null)
            {
                Weather? _weather = _location.Weather.Find(w => w.Id == weatherId);
                if (_weather != null)
                {
                    _location.Weather.Remove(_weather);
                    return _weather;
                }
            }

            // Return existing location with data removed or null
            return null!;
        }

        private static Location FindLocation(int id)
        {
            Location? _location = _locations.Find(l => l.Id == id);
            return _location ?? null!;
        }
    }
}