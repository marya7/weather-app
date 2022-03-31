/* eslint-disable no-unused-vars */
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
import getLocationByCoordinates from "../services.js/location";
import getWeatherData from "../services.js/weather";

const WeatherView = () => {
  const [data, setData] = useState();
  const [scaleType, setScaleType] = useState(ScaleTypeEnum.Metric);
  const [lat, setLat] = useState("59.436962");
  const [lon, setLon] = useState("24.753574");
  const [city, setCity] = useState("Tallinn");
  const [warning, setWarning] = useState();

  console.log("data", data);

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

  const changeScaleType = (test) => {
    if (scaleType === ScaleTypeEnum.Metric)
      setScaleType(ScaleTypeEnum.Imperial);
    else setScaleType(ScaleTypeEnum.Metric);
  };

  const getScaleTypeText = () =>
    scaleType === ScaleTypeEnum.Metric ? "°C" : "°F";

  const getWeather = async () => {
    const data = await getWeatherData(scaleType, lat, lon);
    setData(data);
  };

  const handleCityChange = async (e) => {
    if (e.key === "Enter") {
      const city = await getLocationByCoordinates(e.target.value);

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

  useEffect(() => {
    getWeather();
  }, [scaleType, city]);

  if (!data) return <Spinner animation="border" size="lg" />;

  return (
    <Container>
      <h1 className="city">{city}</h1>
      <Row className={warning ? "mb-2" : "mb-4"}>
        <InputGroup>
          <InputGroup.Text>
            <span className="material-icons">search</span>
          </InputGroup.Text>
          <FormControl
            placeholder="Search for city"
            onKeyDown={handleCityChange}
          />
          <Button variant="secondary" onClick={changeScaleType}>
            {getScaleTypeText()}
          </Button>
        </InputGroup>
      </Row>
      {warning && (
        <Row className="mb-2">
          <Col>
            <Alert variant="warning">City not found</Alert>
          </Col>
        </Row>
      )}

      <Row className="mb-4">
        <Col md={{ span: 4, offset: 4 }}>
          <DayContainer
            title="Current weather"
            temp={Math.round(data?.current.temp)}
            scaleType={getScaleTypeText()}
          />
        </Col>
      </Row>
      <Row>
        {data?.daily.slice(1).map((d, i) => (
          <Col key={i} className="mb-4">
            <DayContainer
              title={getWeekDay(i)}
              temp={Math.round(d.temp.day)}
              scaleType={getScaleTypeText()}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WeatherView;
