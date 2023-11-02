import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Book } from "../interfaces/Book";
import { useEffect, useState } from "react";

interface bookProps {
  book: Book;
}
function BookCardComponent(props: bookProps) {
  const [cover, setCover] = useState<string>("");
  const getCover = async () => {
    try {
      let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${props.book.isbn}`, {});
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setCover(data.items[0].volumeInfo.imageLinks.thumbnail);
      } else {
        console.log("Errore nella ricezione dei dati");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };
  useEffect(() => {
    getCover();
  }, []);
  return (
    <Card className="text-start d-inline-block carouselCard">
      <Card.Img
        className="card-img"
        variant="top"
        src={cover}
        alt={"book" + props.book.isbn}
        onError={(event) =>
          (event.currentTarget.src =
            "https://cdn.icon-icons.com/icons2/1189/PNG/512/1490793840-user-interface33_82361.png")
        }
      />
      <Card.Body>
        <Card.Title className="text-center text-truncate">{props.book.title}</Card.Title>
        <Card.Text>
          <span className="fw-bold">isbn: </span>
          {props.book.isbn}
          <br></br>
          <span className="fw-bolder">Author: </span>
          {props.book.author} <br></br>
          <span className="fw-bolder">Category: </span>
          {props.book.category} <br></br>
          <span className="fw-bolder">Language: </span>
          {props.book.language} <br></br>
          <span className="fw-bolder">Publisher: </span>
          {props.book.publisher} <br></br>
          <span className="fw-bolder">Author: </span>
          {props.book.author} <br></br>
          <span className="fw-bolder">Published date: </span>
          {props.book.publishedYear} <br></br>
        </Card.Text>
        <Link to={`/details/${props.book.isbn}`}>
          <div className="btn btn-success">details</div>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default BookCardComponent;
