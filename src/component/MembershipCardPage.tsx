import { useSelector } from "react-redux";
import { Profile } from "../redux/reducers/profile";
import { RootState } from "../redux/store";
import { Card } from "../interfaces/Card";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function MemberhipCardPage() {
  const currentProfile: Profile = useSelector((state: RootState) => state.profile);
  const libraryId = currentProfile.id;
  const [cards, setCards] = useState<Card[]>([]);

  let endDate = new Date();
  endDate.setDate(new Date().getDate() + 365);

  const getMembershipCards = async () => {
    try {
      let response = await fetch(`http://localhost:8080/card/allByLibrary/${libraryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setCards(data);
      } else {
        console.log("Errore nella ricezione dei dati");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };

  const acceptCard = async (card: Card, endDate: string) => {
    const id = card.id;
    try {
      let response = await fetch(`http://localhost:8080/card/accept/${id}?endDate=${endDate}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        getMembershipCards();
      } else {
        console.log("Errore nell'accettazione della tessera");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };

  const rejectCard = async (card: Card) => {
    const id = card.id;
    try {
      let response = await fetch(`http://localhost:8080/card/reject/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        getMembershipCards();
      } else {
        console.log("Errore nel rifiuto della tessera");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };
  const blockCard = async (card: Card) => {
    const id = card.id;
    try {
      let response = await fetch(`http://localhost:8080/card/block/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log("Tessera bloccata");
        console.log(data);
        getMembershipCards();
      } else {
        console.log("Errore nel blocco della tessera");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };

  const unblockCard = async (card: Card, endDate: string) => {
    const id = card.id;
    try {
      let response = await fetch(`http://localhost:8080/card/restore/${id}?endDate=${endDate}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log("Tessera sbloccata");
        console.log(data);
        getMembershipCards();
      } else {
        console.log("Errore nello sblocco della tessera");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };

  useEffect(() => {
    getMembershipCards();
  }, []);

  return (
    <div className="ms-2">
      {currentProfile.roles[0].roleName !== "ROLE_MODERATOR" ? (
        <h1>Unathorized</h1>
      ) : (
        <>
          <h1>Cards:</h1>
          {cards.map((card) => (
            <div className="card w-75 d-flex flex-row justify-content-between align-items-center" key={card.id}>
              <span>
                <h5>{"User: " + card.user.fullname}</h5>
                <p>{"Card ID: " + card.id}</p>
                <p>{"State: " + card.state}</p>
                <p>{card.state !== "WAITING_FOR_APPROVAL" && "Blacklist: " + card.blacklist}</p>
                {card.endDate && <p>{"Expire Date: " + card.endDate}</p>}
              </span>
              <span>
                {card.state === "WAITING_FOR_APPROVAL" && (
                  <>
                    <Button className="me-2" variant="danger" onClick={() => rejectCard(card)}>
                      Reject
                    </Button>
                    <Button
                      className="me-2"
                      variant="success"
                      onClick={() => acceptCard(card, endDate.toISOString().split("T")[0])}
                    >
                      Accept
                    </Button>
                  </>
                )}
                {card.state === "APPROVED" &&
                  (card.blacklist ? (
                    <Button
                      className="me-2"
                      variant="danger"
                      onClick={() => unblockCard(card, endDate.toISOString().split("T")[0])}
                    >
                      UNLOCK CARD
                    </Button>
                  ) : (
                    <Button className="me-2" variant="danger" onClick={() => blockCard(card)}>
                      BLOCK CARD
                    </Button>
                  ))}
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
