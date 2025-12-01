const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'testdb'
};

// Function to connect with retry logic (รอ DB ตื่น)
const connectWithRetry = () => {
    const connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
        if (err) {
            console.error('Failed to connect to DB, retrying in 5s...', err);
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log('Connected to Database!');
            // Create Table and Seed Data
            connection.query(`CREATE TABLE IF NOT EXISTS items (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`, () => {
                connection.query(`INSERT IGNORE INTO items (id, name) VALUES (1, 'Final Project Item'), (2, 'DIT312 Demo')`);
            });
        }
    });
    return connection;
};

const db = connectWithRetry();

app.get('/api/items', (req, res) => {
    // Re-create connection for query to be safe in simple demo
    const conn = mysql.createConnection(dbConfig);
    conn.query('SELECT * FROM items', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.listen(3000, () => console.log('Backend running on port 3000'));