import { useEffect, useState } from "react";
import api from "../services/api";

function Events() {
    const [evenements, setEvenements] = useState([]);

    useEffect(() => {
        api.get("/evenements")
            .then((response) => {
                console.log(response.data);
                setEvenements(response.data.data);
            })
            .catch((error) => {
                console.error("Erreur API :", error);
            });
    }, []);

    return (
        <div>
            <h1>Liste des événements</h1>

            {evenements.map((evenement) => (
                <div key={evenement.id}>
                    <h2>{evenement.titre}</h2>
                    <p>{evenement.description}</p>
                    <p>Date : {evenement.date}</p>
                    <p>Lieu : {evenement.lieu}</p>
                    <p>Prix : {evenement.prix} DH</p>
                    <p>Capacité : {evenement.capaciteMax}</p>
                </div>
            ))}
        </div>
    );
}

export default Events;
