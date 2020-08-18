const express = require('express');
// const routes = require('./routes/app');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set express app
const app = express();

// connect to mongoDb
mongoose.connect('mongodb://localhost/ninjago', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
});
// mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

// express static middleware for sever static files like css, image, etc
app.use(express.static('public'));

// making use of middleware
app.use(bodyParser.json());

// Initialize routes
// app.use('/api', routes);
app.use('/api', require('./routes/app'));

// error handling middleware
app.use( (err, req, res, next) => {
    console.log(err);
    res.status(422).send({ error: err.message });
});

/* app.get('/', (req, res) => {
    console.log('Get request');
    res.end();
}); */

// listen for request
app.listen(process.env.port || 4000, () => {
    console.log("now listening to requests");
});
