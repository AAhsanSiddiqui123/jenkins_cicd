const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let storedNames = ["this is v2"]; // Renamed to indicate it's an array

// GET endpoint to retrieve the stored names
app.get('/name', (req, res) => {
    res.json({ names: storedNames.length > 0 ? storedNames : ["No name set"] })
    
});

// POST endpoint to store a name
app.post('/name', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    storedNames.push(name); // Corrected method
    res.json({ message: "Name stored successfully", names: storedNames });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
