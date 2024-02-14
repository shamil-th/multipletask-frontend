const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const bodyparser = require('body-parser');
const connectDB =require('./server/database/connect')

const app = express();

dotenv.config()
const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(cors());

app.use(morgan('tiny'));

connectDB();

app.use(bodyparser.urlencoded({extended:true}))


app.use('/', require('./server/router/routes'));


app.listen (PORT, ()=>{
    console.log(`app is running on port http://localhost:${PORT}`);
})