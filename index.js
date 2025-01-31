import express from 'express';
import { words } from "./src/mock/data.es.js";
import { wordsEn } from "./src/mock/data.en.js";
import rateLimit from 'express-rate-limit';
import dotenv from "dotenv";
import cors from 'cors'

dotenv.config();

const app = express();

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 1000 // limit each IP to 1000 requests per windowMs
});

app.use(limiter);

// enable cors
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: "Made w/♥️ by PedroC. Up and running. Have a nice day!"
    });
});

app.get('/es/get-word', (req, res) => {

    let length = words.length;
    let word = words[Math.floor(Math.random() * length)]

    res.json(word);
});

app.get('/en/get-word', (req, res) => {

    let length = wordsEn.length;
    let word = wordsEn[Math.floor(Math.random() * length)]

    res.json(word);
});

// Redirect all other routes to /
app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(process.env.PORT || "3800", () => {
    console.log('Server running on PORT 3800')
})