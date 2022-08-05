
import React, {useState} from "react";
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom'
import { Container } from "react-bootstrap";



const data = []

function MainPage() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (<>
    <Container className="p-0 background-image" fluid={true}>
    <Carousel activeIndex={index} onSelect={handleSelect}>
       {data.map((slide, i) => {
        return (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100"
              src={slide.image}
              alt="slider image"
              />
            <Carousel.Caption>
              <h3>{slide.caption}</h3>
              <p>{slide.description}</p>
              <p>{slide.comment}</p>
              <Link to={'/models'}>
                <button className="btn btn-light"> Find Friends</button>
              </Link>
              <button className="btn btn-light"> Buy Tickets</button>
            </Carousel.Caption>
          </Carousel.Item>
        )
      })}
    </Carousel>
    </Container>

    </>
  );
}
export default MainPage;
