import sqlite3 from 'sqlite3';

export interface DB {
    createDB(): void;
    initizlizeDB(): void;
    incrementWin(player: number): void;
    getWins(): Promise<string>;
}

export class sqliteDB implements DB {
    private db: sqlite3.Database | null;

    constructor() {
        this.db = null;
    } 

    createDB(): void {
        this.db = new sqlite3.Database(':memory:', (err : any) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
        });
    }
    
    initizlizeDB(): void {
        this.db?.serialize(() => {
            this.db?.run("CREATE TABLE players (name integer, wins integer)", (err : any) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log("Table created successfully.");
            });
            this.db?.run("INSERT INTO players(name, wins) VALUES(1, 0)", (err : any) => {
                if (err) {
                return console.log(err.message);
                }
                console.log("Player1 entry has been inserted");
            });
            this.db?.run("INSERT INTO players(name, wins) VALUES(2, 0)", (err : any) => {
                if (err) {
                return console.log(err.message);
                }
                console.log("Player2 entry has been inserted");
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
            this.db?.all(sql, (err: Error, rows: any) => {
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




