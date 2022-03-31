import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import DayContainer from "../components/DayContainer";

const WeatherView = () => {
  const [data, setData] = useState();

  console.log("data", data);

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=59.436962&lon=24.753574&exclude=minutely,hourly&units=metric&appid=b0f2182a58378839a0f71ea753e31bcc"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
        },
        (error) => {
          console.log("err", error);
        }
      );
  }, []);

  if (!data) return <Spinner animation="border" size="lg" />;

  return (
    <Container fluid>
      <Row>
        <Col xs={4}>
          <DayContainer
            title="Current weather"
            temp={Math.round(data?.current.temp)}
          />
        </Col>
      </Row>
      <Row>
        {data?.daily.slice(1).map((d, i) => (
          <Col key={i}>
            <DayContainer title={i.toString()} temp={Math.round(d.temp.day)} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WeatherView;
