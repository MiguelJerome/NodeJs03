import express, { json } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { listBooks, addBook, modifyBook, deleteBook, getBook, logs } from './bookManager.js';

/** Création du serveur */
let app = express();

// Ajout de middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(json());

// Route pour aller chercher tous les livres ou en ajouter
app.route('/books')
    .get((request, response) => {
        // Aller chercher la liste de tous le livres
        let books = listBooks();

        // Retourner la liste de tous le livres
        response.status(200).json(books);
    })
    .post((request, response) => {
        // Ajouter un livre
        addBook(request.body);

        // Retourner une réponse
        response.sendStatus(200);
    })
    .put((request, response) => {
        // Modifier un livre
        modifyBook(request.body.isbn, request.body.book);
        
        // Retourner une réponse
        response.sendStatus(200);
    })
    .delete((request, response) => {
        // Supprimer un livre
        deleteBook(request.body.isbn);
        
        // Retourner une réponse
        response.sendStatus(200);
    });

app.get('/books/isbn', (request, response) => {
    // Retourner un livre
    let book = getBook(request.body.isbn);
    
    // Retourner le livre recherché
    response.status(200).json(book);
});
    

// Renvoyer une erreur 404 pour les routes non définies
app.use((request, response) => {
    // Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas
    response.status(404).send(request.originalUrl + ' not found.');
});

// Démarrage du serveur
const PORT = 1337;
app.listen(PORT);

// Démarrage des logs au 10 secondes
setInterval(logs, 10000);
