import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- ROUTES ---

// GET all transactions
app.get('/api/transactions', (req, res) => {
    db.all("SELECT * FROM transactions ORDER BY id DESC", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

// POST a new transaction
app.post('/api/transactions', (req, res) => {
    const { date, type, amount, description, status } = req.body;

    // Validate required fields
    if (!date || !type || amount === undefined || !description || !status) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `INSERT INTO transactions (date, type, amount, description, status) VALUES (?, ?, ?, ?, ?)`;
    const params = [date, type, amount, description, status];

    db.run(sql, params, function (err) {
        if (err) {
            console.error("Error inserting transaction", err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({
            message: "success",
            data: {
                id: this.lastID, // Get the ID of the newly inserted row
                date, type, amount, description, status
            }
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
