// Create web server
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Set up body parser for POST requests
app.use(bodyParser.json());

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Set up comments array
let comments = [];

// GET /comments
app.get('/comments', (req, res) => {
    // Read comments from file
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments');
        } else {
            comments = JSON.parse(data);
            res.json(comments);
        }
    });
});

// POST /comments
app.post('/comments', (req, res) => {
    // Create new comment object
    let newComment = {
        id: uuidv4(),
        name: req.body.name,
        comment: req.body.comment
    };

    // Add new comment to comments array
    comments.push(newComment);

    // Write comments to file
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).send('Error writing comments');
        } else {
            res.json(newComment);
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

// Path: public/index.html
<!DOCTYPE html>
<html>
<head>
    <title>Comments</title>
</head>
<body>
    <h1>Comments</h1>
    <ul id="comment-list"></ul>
    <form id="comment-form">
        <input type="text" id="name" placeholder="Name" required>
        <textarea id="comment" placeholder="Comment" required></textarea>
        <button type="submit">Submit</button>
    </form>
    <script src="app.js"></script>
</body>
</html>

// Path: public/app.js
document.addEventListener('DOMContentLoaded', () => {
    // Get comment list element
    const commentList = document.getElementById('comment-list');

    // Load comments from server
    fetch('/comments')
        .then(response => response.json())
        .then(comments

