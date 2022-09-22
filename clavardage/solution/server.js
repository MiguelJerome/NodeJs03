import { config } from 'dotenv';
config();

import express, { json } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { getRooms, addRoom, removeRoom, inspectRoom, joinRoom, exitRoom, logs } from './rooms.js';

/** Création du serveur */
let app = express();

// Ajout de middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(json());

// Support des routes pour lister, ajouter et supprimer des salles
app.route('/rooms')
    .get((request, response) => {
        // Lister les salles
        let rooms = getRooms();

        // Retourner une réponse avec la listes des salles
        response.status(200).json(rooms);
    })
    .post((request, response) => {
        // Ajouter une salle
        addRoom(request.body.name);

        // Retourner une réponse
        response.sendStatus(200);
    })
    .delete((request, response) => {
        // Supprimer une salle
        removeRoom(request.body.name);

        // Retourner une réponse
        response.sendStatus(200);
    });

// Support des routes pour lister, joindre et sortir des salles
app.route('/rooms/:roomName')
    .get((request, response) => {
        // Lister les utilisateur dans une salle
        let room = inspectRoom(request.params.roomName);

        // Retourner une réponse avec la listes des utilisateurs de la salle
        response.status(200).json(room);
    })
    .post((request, response) => {
        // Joindre une salle
        joinRoom(request.params.roomName, request.body.userName);

        // Retourner une réponse
        response.sendStatus(200);
    })
    .delete((request, response) => {
        // Sortir d'une salle
        exitRoom(request.params.roomName, request.body.userName);
        
        // Retourner une réponse
        response.sendStatus(200);
    });

// Renvoyer une erreur 404 pour les routes non définies
app.use(function (request, response) {
    // Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas
    response.status(404).send(request.originalUrl + ' not found.');
});

// Démarrage du serveur
app.listen(process.env.PORT);
console.info(`Serveurs démarré:`);
console.info(`https://localhost:${ process.env.PORT }`);

// Démarrage des logs au 10 secondes (Optionnel)
// On affiche les salles aux 10 secondes dans la console
setInterval(logs, 10000);