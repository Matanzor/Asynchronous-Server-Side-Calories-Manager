const mongoose = require('mongoose');
const User = require('./models/User');

// MongoDB connection
const mongoUri = 'mongodb+srv://admin:admin123123@cluster0.xrhcmq8.mongodb.net/caloriesDB?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected for seeding');
    return User.create({
        id: 123123,
        first_name: 'moshe',
        last_name: 'israeli',
        birthday: 'January, 10th, 1990'
    });
}).then(() => {
    console.log('User seeded successfully');
    mongoose.disconnect();
}).catch(err => {
    console.error('Error seeding user:', err);
    mongoose.disconnect();
});
