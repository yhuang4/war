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
exports.sqliteDB = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
class sqliteDB {
    constructor() {
        this.db = null;
    }
    openDB() {
        // Open the database or if doesn't exist, create a database
        this.db = new sqlite3_1.default.Database('./db/data.db', (err) => {
            if (err) {
                return console.error(err.message);
            }
            this.initizlizeDB();
            console.log('Connected to the data database.');
        });
    }
    // If not done before, creates a table and inserts two players' entries
    initizlizeDB() {
        var _a;
        (_a = this.db) === null || _a === void 0 ? void 0 : _a.serialize(() => {
            var _a, _b, _c;
            // Table has two columns, name (1 or 2) and wins. name is unique
            (_a = this.db) === null || _a === void 0 ? void 0 : _a.run("CREATE TABLE IF NOT EXISTS players (name integer, wins integer, UNIQUE(name))", (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log("Table already exists or has been created.");
            });
            (_b = this.db) === null || _b === void 0 ? void 0 : _b.run("INSERT OR IGNORE INTO players(name, wins) VALUES(1, 0)", (err) => {
                if (err) {
                    return console.log(err.message);
                }
                console.log("Player1 entry already exists or has been inserted");
            });
            (_c = this.db) === null || _c === void 0 ? void 0 : _c.run("INSERT OR IGNORE INTO players(name, wins) VALUES(2, 0)", (err) => {
                if (err) {
                    return console.log(err.message);
                }
                console.log("Player2 entry already exists or has been inserted");
            });
        });
    }
    incrementWin(player) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "UPDATE players SET wins = wins + 1 WHERE name = ?";
            (_a = this.db) === null || _a === void 0 ? void 0 : _a.run(sql, [player], (err) => {
                if (err) {
                    return console.log(err.message);
                }
                console.log(`Wins updated: ${player}`);
            });
        });
    }
    // Helper function so that we can await the return string
    getWinsHelper() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var _a;
                let message = "";
                let sql = "SELECT * FROM players";
                (_a = this.db) === null || _a === void 0 ? void 0 : _a.all(sql, (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    rows.forEach((row) => {
                        message += `Player ${row.name} has ${row.wins} wins\n`;
                    });
                    resolve(message);
                });
            });
        });
    }
    // Returns a string stating two players' wins
    getWins() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getWinsHelper();
        });
    }
}
exports.sqliteDB = sqliteDB;
