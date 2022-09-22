/**
 * Objet contenant toutes les salles ainsi que les utilisateurs présentement 
 * connectés dedans.
 */
let rooms = {};

/**
 * Retourne un tableau contenant le nom de toutes les salles.
 */
export function getRooms() {
    return Object.keys(rooms);
};

/**
 * Ajoute une salle.
 * @param {String} name Le nom de la salle.
 */
export function addRoom(name) {
    rooms[name] = [];
};

/**
 * Supprime une salle.
 * @param {String} name Le nom de la salle.
 */
export function removeRoom(name) {
    delete rooms[name];
};

/**
 * Retourne un tableau de tous les utilisateurs dans la salle.
 * @param {String} name Le nom de la salle.
 */
export function inspectRoom(name) {
    return rooms[name];
};

/**
 * Ajoute un utilisateur à une salle.
 * @param {String} roomName Le nom de la salle.
 * @param {String} userName Le nom de l'utilisateur.
 */
export function joinRoom(roomName, userName) {
    console.log(roomName);
    rooms[roomName].push(userName);
};

/**
 * Expulser un utilisateur d'une salle. 
 * @param {String} roomName Le nom de la salle.
 * @param {String} userName Le nom de l'utilisateur.
 */
export function exitRoom(roomName, userName) {
    for(let i = 0 ; i < rooms[roomName].length ; i++){
        if(rooms[roomName][i] === userName){
            rooms[roomName].splice(i, 1);
            break;
        }
    }
};

/**
 * Affiche toutes les salles et leurs utilisateurs dans la console.
 */
export function logs() {
    console.log(rooms);
}
