//npm packages//
import express from "express";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
// controllers//
import { handleLogin } from './routes/controllers/loginController.js';
import { handleRegister } from './routes/controllers/registerController.js';
import dataUser from "./routes/controllers/userDataController.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

// Configura Express per servire l'intera directory "src" come file statici
app.use(express.static(join(__dirname, '../client/dist')));

app.use(express.json());

// Configura Express per servire il file index.html principale
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../client/dist/index.html'));
});

app.post('/get-csrf-token', (req, res) => {
    // Genera un token CSRF casuale (puoi sostituirlo con la tua logica di generazione del token)
    const csrfToken = Math.random().toString(36).substring(2);
    
    // Invia il token CSRF al client come parte della risposta JSON
    res.json({ csrfToken });
});

// dataUser;
app.post("/save-user-data",dataUser);

//login
app.post("/login",handleLogin);

app.post("/register",handleRegister);



app.listen(port, () => {
    console.log(`App running on port : ${port}`);
});