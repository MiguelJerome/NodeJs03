/**
 * Banque de livre sur notre serveur
 */
let bookList = {};

/**
 * Fonction de log pour affichage dans la console
 */
export function logs() {
    console.log(bookList);
}

/**
 * Liste le isbn et le titre de tous les livres
 */
export function listBooks() {
    let array = [];
    for(let book in bookList){
        array.push({ 
            isbn: bookList[book].isbn,
            title: bookList[book].title
        });
    }

    return array;
}

/**
 * Retourne un livre dans la banque de livres à partir de son ISBN
 * @param {String} isbn ISBN du livre
 */
export function getBook(isbn) {
    return bookList[isbn];
}

/**
 * Ajoute un livre dans la banque de livres
 * @param {Book} book Livre à ajouter
 */
export function addBook(book) {
    // Validate that the book does not exists in the list
    if(!bookList[book.isbn]){
        // Add the book
        bookList[book.isbn] = book;
    }
}

/**
 * Supprime un livre dans la banque de livres à partir de son ISBN
 * @param {String} isbn 
 */
export function deleteBook(isbn) {
    // Validate that the book exists in the list
    if(bookList[isbn]){
        // Delete the book
        delete bookList[isbn];
    }
}

/**
 * Modifie un livre dans la banque de livres à partir de son ISBN
 * @param {String} isbn ISBN du livre à modifier
 * @param {Book} book Nouvelle valeur du livre
 */
export function modifyBook(isbn, book) {
    // Validate that the book exists in the list
    if(bookList[isbn]){
        bookList[isbn] = book;
    }
}
