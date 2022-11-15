const express = require('express');
const router = express.Router();
const database = require('./controllers/database');
const user = require('./controllers/user');
const mintIpfs = require('./controllers/convertToIpfs')

// rechercher dans une une BDD =>

// Route pour afficher tous le contenu d'une table
router.get('/findall', database.findall);

// Route pour ajouter un enregistrement dans la table
router.post('/create', database.create);

// Route pour modifier une tache
router.put("/update/:id", database.update);

// Route pour supprimer une tache
router.delete("/delete/:id", database.delete);

// connexion / déconnexion d'un utilisateur  =>

// Connexion
router.get('/login', user.login);

// Inscription
router.get('/signup', user.signUp);

// IPFS 

router.post('/jsonipfs', mintIpfs.jsonToIpfs);

module.exports = router;
