"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_js_1 = require("./game.js");
const db_1 = require("./db");
const app = (0, express_1.default)();
let db = new db_1.sqliteDB();
db.openDB();
// Endpoint to start a game
app.post('/game', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // playGame simulates a game and returns 1 or 2 based on the winner
    let gameRes = (0, game_js_1.playGame)();
    if (gameRes === 0) {
        res.send("It's a draw");
        return;
    }
    yield db.incrementWin(gameRes);
    res.send("Player " + gameRes + " wins");
}));
// Endpoint to get lifetime wins for each player
app.get('/wins', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Query database for lifetime wins
    let message = yield db.getWins();
    res.send(message);
}));
// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
