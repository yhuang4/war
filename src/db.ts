import sqlite3 from 'sqlite3';

export interface DB {
    openDB(): void;
    incrementWin(player: number): void;
    getWins(): Promise<string>;
}

export class sqliteDB implements DB {
    private db: sqlite3.Database | null;

    constructor() {
        this.db = null;
    } 

    openDB(): void {
        this.db = new sqlite3.Database('./db/data.db', (err: any) => {
            if (err) {
                return console.error(err.message);
            }
            this.initizlizeDB();
            console.log('Connected to the data database.');
        });
    }
    
    initizlizeDB(): void {
        this.db?.serialize(() => {
            this.db?.run("CREATE TABLE IF NOT EXISTS players (name integer, wins integer, UNIQUE(name))", (err : any) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log("Table already exists or has been created.");
            });
            this.db?.run("INSERT OR IGNORE INTO players(name, wins) VALUES(1, 0)", (err : any) => {
                if (err) {
                    return console.log(err.message);
                }
                console.log("Player1 entry already exists or has been inserted");
            });
            this.db?.run("INSERT OR IGNORE INTO players(name, wins) VALUES(2, 0)", (err : any) => {
                if (err) {
                    return console.log(err.message);
                }
                console.log("Player2 entry already exists or has been inserted");
            });
        })
    }
    
    async incrementWin(player: number) {
        let sql = "UPDATE players SET wins = wins + 1 WHERE name = ?";
        this.db?.run(sql, [player], (err : any) => {
            if (err) {
                return console.log(err.message);
            }
            console.log(`Wins updated: ${player}`);
        });
    }

    async getWinsHelper(): Promise<string> {
        return new Promise((resolve, reject) => {
            let message = "";
            let sql = "SELECT * FROM players";
            this.db?.all(sql, (err: any, rows: any) => {
                if (err) {
                    reject(err);
                }
                rows.forEach((row: any) => {
                    message += `Player ${row.name} has ${row.wins} wins\n`;
                })
                resolve(message);
            })
        });
    }
    
    async getWins(): Promise<string> {
        return await this.getWinsHelper();
    }
}




