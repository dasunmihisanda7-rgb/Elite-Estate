import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const dbPath = path.join(__dirname, 'data', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('Connected to SQLite database at', dbPath);

// Initialize database tables
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            type TEXT NOT NULL,
            amount REAL NOT NULL,
            description TEXT NOT NULL,
            status TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error("Error creating tables", err);
        } else {
            console.log("Database tables initialized.");

            // Check if there are any transactions, if not, insert defaults
            db.get("SELECT COUNT(*) as count FROM transactions", (err, row) => {
                if (row.count === 0) {
                    console.log("Database empty. Inserting initial mock transactions...");
                    const stmt = db.prepare("INSERT INTO transactions (date, type, amount, description, status) VALUES (?, ?, ?, ?, ?)");

                    const initialTransactions = [
                        { date: '2026-03-01', type: 'buy', amount: 750000, description: '124 Maple St Lot', status: 'completed' },
                        { date: '2026-03-05', type: 'build', amount: 125000, description: 'Maple St Foundation Phase', status: 'completed' },
                        { date: '2026-03-10', type: 'build', amount: 85000, description: 'Maple St Framing', status: 'in-progress' },
                        { date: '2026-03-15', type: 'sell', amount: 1550000, description: '88 Oak Wood Heights', status: 'pending' },
                    ];

                    initialTransactions.forEach((tx) => {
                        stmt.run(tx.date, tx.type, tx.amount, tx.description, tx.status);
                    });
                    stmt.finalize();
                    console.log("Initial transactions inserted.");
                }
            });
        }
    });
});

export default db;
