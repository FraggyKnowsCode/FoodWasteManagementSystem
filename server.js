const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'food_waste_management'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL Connected...');
});

// Route to handle root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Food Waste Management API');
});

// Example route to get users
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Failed to fetch users' });
            return;
        }
        res.json(results);
    });
});

// Endpoint to add a new user
app.post('/api/users', (req, res) => {
    const { username, email, password_hash, first_name, last_name, date_of_birth, phone_number, address, account_created, role } = req.body;
    console.log('Received new user data:', req.body);
    const query = 'INSERT INTO users (username, email, password_hash, first_name, last_name, date_of_birth, phone_number, address, account_created, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [username, email, password_hash, first_name, last_name, date_of_birth, phone_number, address, account_created, role], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).json({ error: 'Failed to add user' });
            return;
        }
        res.status(201).json({ message: 'User added successfully' });
    });
});



// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});