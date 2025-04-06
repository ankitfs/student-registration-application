const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

const db = new sqlite3.Database('./students.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the students database.');
});

app.use(express.json());
app.use(cors());

//GET all students
app.get('/students/all', (req, res) => {
    db.all('SELECT * FROM students', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        }
        res.send(rows);
    });

});

//GET student by id
app.get('/students/:id', (req, res) => {

    const{ id } = req.params;
    db.get('SELECT * FROM students WHERE id = ?', [id] , (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        }
        if (row) {
            res.send(row);
        } else {
            res.status(404).send('Not Found');
        }
    });
});

//POST a new student
app.post('/student', (req, res) => {
    const { studentName, studentEmail, studentPhone } = req.body;
    var dateTime = new Date();
    db.run('INSERT INTO students (name, email, phone, created_at) VALUES (?, ?, ?, ?)',
         [studentName, studentEmail, studentPhone, dateTime], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            const id = this.lastID;
            res.status(201).send({id, studentName, studentEmail, studentPhone, created_at: dateTime});
        }
    });
});

//PUT updated student by id
app.put('/students/:id', (req, res) => {

    const { name, email, phone } = req.body;
    const { id } = req.params;
    var dateTime = new Date();
    db.run('UPDATE students SET name = ?, email = ?, phone = ?, updated_at = ? WHERE id = ?',
        [name, email, phone, dateTime, id], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send({id, name, email, phone, updated_at: dateTime});
        }
    });
});

//DELETE student by id
app.delete('/students/:id', (req, res) => {

    const { id } = req.params;
    db.run('DELETE FROM students WHERE id = ?', [id], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(204).send();
        }
    });
});

app.listen(port, () => {    
    console.log(`Server started on http://localhost:${port}`);
});
