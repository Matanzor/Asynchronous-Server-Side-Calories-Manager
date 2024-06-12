const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoUri = 'mongodb+srv://admin:admin123123@cluster0.xrhcmq8.mongodb.net/caloriesDB?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB is connected');
}).catch(err => {
    console.log('MongoDB connection error: ', err);
});

// Routes
app.use('/api', apiRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Calories Manager RESTful Web Services');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
