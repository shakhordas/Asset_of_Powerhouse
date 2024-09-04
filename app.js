const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');

// Start the server
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "powerhouse"
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Database Connected');
});

// Handle POST requests to /order_registration
app.post('/order_registration', (req, res) => {
    const { product_name, buying_date, price, manufactured_by, assigned_to } = req.body;

    const sql = 'INSERT INTO assets (product_name, buying_date, price, manufactured_by, assigned_to) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [product_name, buying_date, price, manufactured_by, assigned_to], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);  // Log the actual error
            res.status(500).json({ message: 'Error inserting data' });
            return;
        }
        res.json({ message: 'Order Submitted Successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


