// require('dotenv').config();

import express, { urlencoded, json } from 'express';
import bodyParser from 'body-parser';
import router from './router.js';
// On importe le middleware cors qui permet de faire des requetes vers l'API
// depuis le navigateur
import cors from 'cors';
//const rateLimit = require('express-rate-limit');
// import bodySanitizer from './middlewares/exemple_sanitizer.js';

const PORT = process.env.PORT || 4000;
const app = express();

// C'est un middleware donc on utilise app.use
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(urlencoded({ extended: true }));

/* Permet de décoder le req.body qui est reçu au format JSON */
app.use(json());

// on ajoute le middleware de "nettoyage" des variables
// app.use(bodySanitizer);

// const corsOptions = {
//   // autorise des domaines
//   origin:'http://localhost:3000',
//   // For legacy browser support
//   optionsSuccessStatus: 200, 
//   methods: ['GET', 'PUT', 'POST', 'DELETE'],
//   credentials: true
// }

app.use(cors());

// // Add rate limit policy
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100000, // limit each IP to 100K requests per `window` (here, per 15 minutes)
//   standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // disable the `X-RateLimit-*` headers
// });
// app.use(limiter);

app.use(router);
   
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
})
