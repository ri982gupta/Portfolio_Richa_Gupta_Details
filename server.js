const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the static HTML file
app.use(express.static(path.join(__dirname)));

// Handle form submission
app.post('/submit_form', (req, res) => {
    const newData = req.body;

    const filePath = path.join(__dirname, 'contactForm.json');

    // Read the existing data
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code === 'ENOENT') {
            // File does not exist, create a new one
            const jsonData = [newData];
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return res.status(500).send('Server error');
                }
                res.send('Data sent successfully');
            });
        } else if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Server error');
        } else {
            // File exists, append the new data
            const jsonData = JSON.parse(data);
            jsonData.push(newData);
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return res.status(500).send('Server error');
                }
                res.send('Data sent successfully');
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



// run using node server.js
