import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

const DayContainer = ({ title, temp }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{temp}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DayContainer;

DayContainer.propTypes = {
  title: PropTypes.string,
  temp: PropTypes.number,
};
