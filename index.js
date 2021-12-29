const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require('./routes/routes')
const cors = require('cors')
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser:true,
    useUnifiedTopology:true
},() =>
    console.log("Database Connected"))
// require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors())
app.use('/app', routesUrls)

app.listen(8000, () => {
    console.log(`Server Running at port no.8000`)
})