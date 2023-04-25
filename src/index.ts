import express, { Request, Response } from 'express';
const playGame = require('./game.js');
const app = express();
import { sqliteDB } from './db';

let db = new sqliteDB();

db.createDB();
db.initizlizeDB();

// Endpoint to start a game
app.post('/game', async (req: Request, res: Response) => {
    let gameRes = playGame();
    if (gameRes === 0) {
        res.status(200).send("It's a draw");
        return;
    }
    await db.incrementWin(gameRes);
    res.status(200).send("Player " + gameRes + " wins");
});

// Endpoint to get lifetime wins for each player
app.get('/wins', async (req: Request, res: Response) => {
    // Query database for lifetime wins
    let message = await db.getWins();
    res.status(200).send(message);
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});