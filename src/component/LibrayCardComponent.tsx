import { Alert, Button, Card } from "react-bootstrap";
import { libraryProps } from "../interfaces/PropsIntefaces";
import { NewBookingDto } from "../interfaces/BookingDto";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LibraryCardComponent({
  library,
  cards,
  getCards,
  currentProfile,
  book,
  index,
  isUser,
}: libraryProps) {
  const [isBooked, setIsBooked] = useState(false);
  const navigate = useNavigate();
  const newCard = async (username: string, libraryId: number) => {
    try {
      let response = await fetch(`http://localhost:8080/card/new`, {
        method: "POST",
        body: JSON.stringify({ username, libraryId }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let data = await response.json();
        alert("Tessera creata con successo");
        getCards();
      } else {
        alert("Errore nella richiesta della tessera");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };
  const newBooking = async (bookingDto: NewBookingDto) => {
    try {
      let response = await fetch(`http://localhost:8080/booking/newRequest`, {
        method: "POST",
        body: JSON.stringify(bookingDto),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        alert("Prenotazione creata con successo");
        setIsBooked(true);
      } else {
        alert("Errore nella creazione della prenotazione");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };
  return (
    <Card className="w-100">
      <Card.Body>
        <Card.Title>{library.name}</Card.Title>
        {
          <span className="d-flex justify-content-between">
            <span>
              {library.address != null &&
                `${library.address.street}, ${library.address.number} -${library.address.municipality.name}`}
            </span>

            <span>
              <Button
                variant="danger"
                className="ms-2"
                key={index}
                onClick={() => {
                  navigate(`/library/${library.id}`);
                }}
              >
                Show library
              </Button>
              {/* mostra i buttons prenota o richiedi tessera se il profilo ha ruolo utente */}
              {isUser &&
                cards.map((card, index) => {
                  if (
                    card.library.id === library.id &&
                    card.user.id === currentProfile.id
                  ) {
                    return (
                      <>
                        <Button
                          disabled={
                            card.state === "WAITING_FOR_APPROVAL" ||
                            card.state === "REJECTED" ||
                            isBooked
                          }
                          variant="danger"
                          className="ms-2"
                          key={index + card.library.id!}
                          onClick={() => {
                            let bookingDto = {
                              cardId: card.id,
                              books: [book.isbn],
                            };
                            newBooking(bookingDto);
                          }}
                        >
                          Book now
                        </Button>
                      </>
                    );
                  } else {
                    return (
                      <Button
                        variant="danger"
                        className="ms-2"
                        key={index + "" + card.user.id!}
                        onClick={() => {
                          newCard(currentProfile.username, library.id!);
                        }}
                      >
                        Request card
                      </Button>
                    );
                  }
                })}
              {isUser && cards.length === 0 && (
                <Button
                  disabled={!currentProfile.isActive}
                  variant="danger"
                  className="ms-2"
                  key={index}
                  onClick={() => {
                    newCard(currentProfile.username, library.id!);
                  }}
                >
                  Request card
                </Button>
              )}
            </span>
          </span>
        }
      </Card.Body>
    </Card>
  );
}
