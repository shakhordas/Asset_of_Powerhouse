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
//get data from database
app.get('/ordered', (req, res) => {
    const sql = 'SELECT * FROM assets'
    connection.query(sql, (err, results) => {
        if(err){
            console.error('Error inserting data:', err)
            res.send(400).json({message:'Error Inserting data'})
            return
        }else{
            res.send(results)
        }
    })
})

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

// Fetch ordered data and the total number of rows
app.get('/total_orders', (req, res) => {
    const sql = 'SELECT * FROM assets'; // Adjust table name as needed
    connection.query(sql, (err, result) => {
      if (err) throw err;
  
      // Count total rows in the table
      const totalCountQuery = 'SELECT COUNT(id) AS totalIds FROM assets';
      connection.query(totalCountQuery, (err, countResult) => {
        if (err) throw err;
  
        // Send both data and total count in the response
        res.json({
          data: result,
          totalIds: countResult[0].totalIds
        });
      });
    });
  });

  // Get records added in the last 7 days
  app.get('/last7days', (req, res) => {
    // Use the 'buying_date' column to check for the last 7 days
        const sql = `
            SELECT * FROM assets
            WHERE buying_date >= NOW() - INTERVAL 7 DAY
        `;

        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return res.status(500).json({ message: 'Error fetching data' });
            }

            res.json(results);
        });
    });

    // Get records added in the last 7 days along with the total count
    app.get('/last7days_total_oders', (req, res) => {
        // Query to fetch data added in the last 7 days and total count of rows
        const sql = `
            SELECT *, (SELECT COUNT(*) FROM assets WHERE buying_date >= NOW() - INTERVAL 7 DAY) AS totalCount
            FROM assets
            WHERE buying_date >= NOW() - INTERVAL 7 DAY
        `;

        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return res.status(500).json({ message: 'Error fetching data' });
            }

            // Send the results and total count
            res.json({
                data: results,
                totalIds: results.length > 0 ? results[0].totalCount : 0
            });
        });
    });




app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


