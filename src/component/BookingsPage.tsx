import { useEffect, useState } from "react";

import { Booking } from "../interfaces/Booking";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Profile } from "../redux/reducers/profile";
import { Button, Card } from "react-bootstrap";

export default function BookingsPage() {
  const currentProfile: Profile = useSelector((state: RootState) => state.profile);
  const libraryId = currentProfile.id;
  const [bookings, setBookings] = useState<Booking[]>([]);
  const getBookings = async () => {
    try {
      let response = await fetch(`http://localhost:8080/booking/${libraryId}/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setBookings(data);
      } else {
        console.log("Errore nella ricezione dei dati");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };
  const acceptBooking = async (booking: Booking, numberOfDays: number) => {
    const id = booking.id;
    const libraryId = booking.card.library.id;
    const today: Date = new Date();
    const endDate: Date = new Date();
    endDate.setDate(today.getDate() + numberOfDays);
    const endDateInString = endDate.toISOString().split("T")[0];
    console.log("Data inizio: " + today.toISOString().split("T")[0]);
    console.log("Data fine: " + endDateInString);

    try {
      let response = await fetch(`http://localhost:8080/booking/accept/${libraryId}/${id}?endDate=${endDateInString}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        getBookings();
      } else {
        console.log("Errore nell'accettazione del prestito");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };
  const rejectBooking = async (booking: Booking) => {
    console.log(booking);
    const id = booking.id;

    try {
      let response = await fetch(`http://localhost:8080/booking/reject/${id}`, {
        method: "POST",
        body: JSON.stringify(""),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        getBookings();
      } else {
        console.log(response);
        console.log("Errore nel rifiutare il prestito");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);
  return (
    <div className="ms-2">
      <h1>Bookings:</h1>
      {bookings.map((booking) => {
        let library = booking.card.library;
        let user = booking.card.user;

        return (
          <Card className="w-75" key={booking.id}>
            <Card.Body>
              <Card.Title>{"Member: " + user.fullname}</Card.Title>
              <span className="d-flex justify-content-between">
                <span>
                  {booking.books.length > 0 ? "Book: " + booking.books[0].title : "None"}
                  <br />
                  State: {booking.state}
                  <br />
                </span>

                <span>
                  {booking.state === "ACCEPTED" && <span>{`End date : ${booking.endDate}`}</span>}
                  {booking.state === "PENDING" && (
                    <>
                      <Button
                        variant="success"
                        className="me-2"
                        onClick={() => {
                          acceptBooking(booking, 3);
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="danger"
                        className="me-2"
                        onClick={() => {
                          rejectBooking(booking);
                        }}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </span>
              </span>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
