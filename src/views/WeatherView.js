import { useEffect, useState } from "react";
import {
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Spinner,
  Button,
} from "react-bootstrap";
import DayContainer from "../components/DayContainer";
import ScaleTypeEnum from "../enums/ScaleTypeEnum";

const WeatherView = () => {
  const [data, setData] = useState();
  const [scapeType, setScaleType] = useState(ScaleTypeEnum.Metric);

  console.log("data", data);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=59.436962&lon=24.753574&exclude=minutely,hourly&units=${scapeType}&appid=b0f2182a58378839a0f71ea753e31bcc`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, [scapeType]);

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
    if (scapeType === ScaleTypeEnum.Metric)
      setScaleType(ScaleTypeEnum.Imperial);
    else setScaleType(ScaleTypeEnum.Metric);
  };

  const getScaleTypeText = () =>
    scapeType === ScaleTypeEnum.Metric ? "°C" : "°F";

  if (!data) return <Spinner animation="border" size="lg" />;

  return (
    <Container>
      <Row>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <span className="material-icons">search</span>
          </InputGroup.Text>
          <FormControl placeholder="Search for city" />
          <Button variant="secondary" onClick={changeScaleType}>
            {getScaleTypeText()}
          </Button>
        </InputGroup>
      </Row>

      <Row>
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
          <Col key={i}>
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
