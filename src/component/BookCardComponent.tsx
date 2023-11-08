import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { bookProps } from "../interfaces/PropsIntefaces";

function BookCardComponent(props: bookProps) {
  const [cover, setCover] = useState<string>("");
  const getCover = async () => {
    try {
      let response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${props.book.isbn}`,
        {}
      );
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
    <Row className="my-4">
      <Col xs={12} sm={4} className="text-center">
        <img
          className="w-75 book-cover"
          src={cover}
          alt={"book" + props.book.isbn}
          onError={(event) =>
            (event.currentTarget.src =
              "https://cdn.icon-icons.com/icons2/1189/PNG/512/1490793840-user-interface33_82361.png")
          }
        />
      </Col>
      <Col xs={8} sm={6}>
        <h3 className="mt-2 mb-4">{props.book.title}</h3>
        <span className="fw-bold">ISBN: </span>
        {props.book.isbn}
        <br />
        <span className="fw-bolder">AUTHOR: </span>
        {props.book.author} <br />
        <span className="fw-bolder">CATEGORY: </span>
        {props.book.category} <br />
        <span className="fw-bolder">LANGUAGE: </span>
        {props.book.language} <br />
        <span className="fw-bolder">PUBLISHER: </span>
        {props.book.publisher} <br />
        <span className="fw-bolder">PUBLISHED DATE: </span>
        {props.book.publishedYear} <br />
      </Col>
    </Row>
  );
}

export default BookCardComponent;
