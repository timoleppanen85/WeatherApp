using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WeatherApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        private readonly IWeatherRepository _weatherRepository;

        public WeatherController(IWeatherRepository weatherRepository)
        {
            _weatherRepository = weatherRepository;
        }

        [HttpGet]
        public ActionResult<List<Location>> GetAllLocations()
        {
            return Ok(_weatherRepository.GetAllLocations());
        }

        [HttpGet("{id}")]
        public ActionResult<Location> GetLocation(int id)
        {
            return Ok(_weatherRepository.GetLocation(id));
        }

        [HttpPost]
        public ActionResult<Location> AddWeather(Location location)
        {
            return Ok(_weatherRepository.AddWeather(location));
        }

        [HttpPost("{location}")]
        public ActionResult<List<Location>> AddLocation(string location)
        {
            return Ok(_weatherRepository.AddLocation(location));
        }

        [HttpPut("{id}")]
        public ActionResult<Location> UpdateLocation(int id, Location location)
        {
            return Ok(_weatherRepository.UpdateLocation(id, location));
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteLocation(int id)
        {
            return Ok(_weatherRepository.DeleteLocation(id));
        }

        [HttpDelete("{id}/{weatherId}")]
        public ActionResult DeleteWeather(int id, int weatherId)
        {
            return Ok(_weatherRepository.DeleteWeather(id, weatherId));
        }
    }
}
