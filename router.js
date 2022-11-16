import { Router } from 'express';
const router = Router();
import { findall, create, update, remove } from './controllers/database.js';
import { login, signUp } from './controllers/user.js';
import { jsonToIpfs } from './controllers/convertToIpfs.js';
import multer from 'multer'
import { storage } from './controllers/multerConfig.js';
const upload = multer({ storage: storage })

// rechercher dans une une BDD =>

// Route pour afficher tous le contenu d'une table
router.get('/findall', findall);

// Route pour ajouter un enregistrement dans la table
router.post('/create', create);

// Route pour modifier une tache
router.put("/update/:id", update);

// Route pour supprimer une tache
router.delete("/delete/:id", remove);

// connexion / déconnexion d'un utilisateur  =>

// Connexion
router.get('/login', login);

// Inscription
router.get('/signup', signUp);

// IPFS 

router.post('/jsonipfs', upload.single("file"), jsonToIpfs);


export default router;
