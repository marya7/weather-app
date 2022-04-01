export const getIcon = (main) => {
  switch (main) {
    case "Clear":
      return <i className="wi wi-day-sunny"></i>;
    case "Clouds":
      return <i className="wi wi-cloudy"></i>;
    case "Thunderstorm":
      return <i className="wi wi-thunderstorm"></i>;
    case "Drizzle":
      return <i className="wi wi-sprinkle"></i>;
    case "Rain":
      return <i className="wi wi-rain"></i>;
    case "Snow":
      return <i className="wi wi-snow"></i>;
    default:
      return <i className="wi wi-cloud"></i>;
  }
};
