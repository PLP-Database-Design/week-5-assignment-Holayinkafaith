
// Question 1 goes here
const express = require('express');
const mysql = require('mysql');
require('dotenv').config(); // To access the .env file

const app = express();
const port = 3000;

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Retrieve all patients
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Question 2 goes here
// Retrieve all providers
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  

// Question 3 goes here
// Retrieve patients by first name
app.get('/patients/search', (req, res) => {
    const { first_name } = req.query; // Get first_name from query parameters
  
    if (!first_name) {
      return res.status(400).json({ error: "Please provide a first name." });
    }
  
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    db.query(query, [first_name], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      // If no patients are found, return a message
      if (results.length === 0) {
        return res.status(404).json({ message: "No patients found with that first name." });
      }
  
      res.json(results);
    });
  });
  

// Question 4 goes here

// Retrieve providers by specialty
app.get('/providers/search', (req, res) => {
    const { provider_specialty } = req.query; // Get provider_specialty from query parameters
  
    if (!provider_specialty) {
      return res.status(400).json({ error: "Please provide a specialty." });
    }
  
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    db.query(query, [provider_specialty], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      // If no providers are found, return a message
      if (results.length === 0) {
        return res.status(404).json({ message: "No providers found with that specialty." });
      }
  
      res.json(results);
    });
  });
  

// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})