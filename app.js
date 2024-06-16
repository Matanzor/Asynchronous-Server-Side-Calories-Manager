const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');  // Ensure this path is correct

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoUri = 'mongodb+srv://admin:admin123123@cluster0.xrhcmq8.mongodb.net/caloriesDB?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoUri)
    .then(() => {
        console.log('MongoDB is connected');
    })
    .catch((err) => {
        console.log('MongoDB connection error: ', err);
    });

// Default route
app.get('/', (req, res) => {
    res.send('Calories Manager RESTful Web Services');
});

// Use API routes without the /api prefix
app.use('/', apiRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
