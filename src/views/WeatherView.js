import { useEffect, useState } from "react";
import {
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Spinner,
  Button,
  Alert,
} from "react-bootstrap";
import DayContainer from "../components/DayContainer";
import ScaleTypeEnum from "../enums/ScaleTypeEnum";
import getCoordinatesByCity from "../services.js/location";
import getWeatherData from "../services.js/weather";

const WeatherView = () => {
  const [data, setData] = useState();
  const [scaleType, setScaleType] = useState(ScaleTypeEnum.Metric);
  const [lat, setLat] = useState("58.3780");
  const [lon, setLon] = useState("26.7290");
  const [city, setCity] = useState("Tartu");
  const [warning, setWarning] = useState();

  const getWeekDay = (i) => {
    const arrayOfWeekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return arrayOfWeekdays[date.getDay()];
  };

  const changeScaleType = () => {
    if (scaleType === ScaleTypeEnum.Metric)
      setScaleType(ScaleTypeEnum.Imperial);
    else setScaleType(ScaleTypeEnum.Metric);
  };

  const getScaleTypeText = () =>
    scaleType === ScaleTypeEnum.Metric ? "°C" : "°F";

  const getWeather = async () => {
    const data = await getWeatherData(scaleType, lat, lon);
    console.log("getWeather", data);
    setData(data);
  };

  const handleCityChange = async (e) => {
    if (e.key === "Enter") {
      const city = await getCoordinatesByCity(e.target.value);

      if (city.length > 0) {
        setCity(city[0].name);
        setLat(city[0].lat);
        setLon(city[0].lon);
        setWarning(false);
      } else {
        setWarning(true);
      }
    }
  };

  function setCurrentLocation(pos) {
    const crd = pos.coords;
    setLat(crd.latitude);
    setLon(crd.longitude);
    setCity("Current location");
    setWarning(false);
  }

  const handleCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(setCurrentLocation);
  };

  const getIcon = (main) => {
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

  useEffect(() => {
    getWeather();
  }, [scaleType, lat, lon]);

  if (!data) return <Spinner animation="border" size="lg" />;

  const renderCityName = () => (
    <Row className="mb-4">
      <h1 className="city">{city}</h1>
    </Row>
  );

  const renderSearchWithButtons = () => (
    <Row className={warning ? "mb-2" : "mb-4"}>
      <InputGroup>
        <InputGroup.Text>
          <span className="material-icons">search</span>
        </InputGroup.Text>
        <FormControl
          placeholder="Search for city"
          onKeyDown={handleCityChange}
        />
        <Button variant="secondary" onClick={changeScaleType} className="scale">
          {getScaleTypeText()}
        </Button>
        <Button variant="secondary" onClick={handleCurrentLocation}>
          <span className="material-icons">location_on</span>
        </Button>
      </InputGroup>
    </Row>
  );

  const renderWarning = () => (
    <Row className="mb-2">
      <Col>
        <Alert variant="warning">City not found</Alert>
      </Col>
    </Row>
  );

  const renderCurrentWeather = () => (
    <Row className="mb-4">
      <Col md={{ span: 4, offset: 4 }}>
        <DayContainer
          title="Current weather"
          temp={Math.round(data.current.temp)}
          scaleType={getScaleTypeText()}
          icon={getIcon(data.current.weather[0].main)}
        />
      </Col>
    </Row>
  );

  const renderForecast = () => (
    <Row>
      {data?.daily.slice(1).map((d, i) => (
        <Col key={i} className="mb-4">
          <DayContainer
            title={getWeekDay(i)}
            temp={Math.round(d.temp.day)}
            scaleType={getScaleTypeText()}
            icon={getIcon(d.weather[0].main)}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <Container>
      {renderCityName()}
      {renderSearchWithButtons()}
      {warning && renderWarning()}
      {renderCurrentWeather()}
      {renderForecast()}
    </Container>
  );
};

export default WeatherView;
