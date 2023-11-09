import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Book } from "../interfaces/Book";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
interface CarouselProps {
  items: Book[];
}
function CarouselComponent(props: CarouselProps) {
  const responsive = {
    xxl: {
      breakpoint: { max: 3000, min: 1440 },
      items: 7,
      slidesToSlide: 1, // optional, default to 1.
    },
    xl: {
      breakpoint: { max: 1439, min: 1200 },
      items: 6,
      slidesToSlide: 1, // optional, default to 1.
    },
    lg: {
      breakpoint: { max: 1199, min: 992 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
    },
    md: {
      breakpoint: { max: 991, min: 768 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    sm: {
      breakpoint: { max: 767, min: 575 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    xs: {
      breakpoint: { max: 574, min: 500 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    xxs: {
      breakpoint: { max: 380, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      responsive={responsive}
      infinite={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      transitionDuration={300}
      containerClass="carousel-container"
      itemClass="carousel-item w-100 d-flex align-items-center "
    >
      {props.items.map((book) => (
        <CarouselCardComponent key={book.isbn} book={book} />
      ))}
    </Carousel>
  );
}
interface bookProps {
  book: Book;
}
export function CarouselCardComponent(props: bookProps) {
  const [cover, setCover] = useState<string>("");
  const getCover = async () => {
    try {
      let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${props.book.isbn}`, {});
      if (response.ok) {
        let data = await response.json();
        //console.log(data);
        setCover(data.items[0].volumeInfo.imageLinks.thumbnail);
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };
  useEffect(() => {
    getCover();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card className="carouselCard">
      <Link to={`/details/${props.book.isbn}`} className="text-decoration-none">
        <Card.Img
          className="card-img "
          variant="fluid"
          src={cover}
          alt={"book " + props.book.isbn}
          onError={(event) =>
            (event.currentTarget.src =
              "https://cdn.icon-icons.com/icons2/1189/PNG/512/1490793840-user-interface33_82361.png")
          }
        />
        <Card.Body>
          <Card.Title>{props.book.title}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
}
export default CarouselComponent;
