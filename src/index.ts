import express, { Request, Response } from 'express';
import { playGame } from './game.js';
import { sqliteDB } from './db';
const app = express();

let db = new sqliteDB();

db.openDB();

// Endpoint to start a game
app.post('/game', async (req: Request, res: Response) => {
    // playGame simulates a game and returns 1 or 2 based on the winner
    let gameRes = playGame();
    if (gameRes === 0) {
        res.send("It's a draw");
        return;
    }
    await db.incrementWin(gameRes);
    res.send("Player " + gameRes + " wins");
});

// Endpoint to get lifetime wins for each player
app.get('/wins', async (req: Request, res: Response) => {
    // Query database for lifetime wins
    let message = await db.getWins();
    res.send(message);
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});