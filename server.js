const express = require('express');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

//body-parser middleware
app.use(bodyParser.json());

//DB key
dotenv.config({path:'config.env'});
const db = process.env.MONGO_URI;

//connect to mongoose
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//use routes
app.use('/api/items', require('./routes/api/item'));

//serve static assets when in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

