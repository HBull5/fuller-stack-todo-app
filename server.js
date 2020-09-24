const express = require('express');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "todo_app"
});

connection.connect((err) => {
    if (err) throw err;
    console.log('DB connected...')
});

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    connection.query('SELECT * FROM todos', (err, results) => {
        res.render('todos', {results});
    })
})


// http://locahost:3000/api/new-todo/:${input.value}
app.post('/:newTodo', (req, res) => {
    connection.query(`INSERT INTO todos (todo_name) VALUES(?)`, [req.params.newTodo], (err, results) => {
        if (err) throw err;
    });
})

app.listen(3000, () => {
    console.log("Server running on port 3000...")
})