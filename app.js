// Add web server app that has html form contains the button to trigger the POST request to /generate endpoint and display repsonse in div with id 'output'.
// 
// You can use the following code as a starting point:
// 
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.static('public'));

let comments = [];

app.get('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments');
        } else {
            comments = JSON.parse(data);
            res.json(comments);
        }
    });
});

app.post('/comments', (req, res) => {
    let newComment = {
        id: uuidv4(),
        name: req.body.name,
        comment: req.body.comment
    };

    comments.push(newComment);

    console.log('requ', req.body)

    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).send('Error writing comments');
        } else {
            res.json(newComment);
        }
    });
});

app.post('/generate', (req, res) => {
    let newComment = {
        id: uuidv4(),
        name: req.body.name,
        comment: req.body.comment
    };

    comments.push(newComment);

    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).send('Error writing comments');
        } else {
            res.json(newComment);
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
