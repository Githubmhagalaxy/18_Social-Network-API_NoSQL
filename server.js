require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;

const {Thought} = require('./models');



(async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => {
            console.log(`API server listening on port ${PORT}!`);
        });
    } catch (e) {
        console.log('could not connect to db in some reasons');
        console.error(e.message);
    }
})()