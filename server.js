const express = require("express");
const cors = require('cors')

require('dotenv').config();
const cookieParser = require('cookie-parser'); // server can understand cookies(info)

const app = express();
const port = 8000;

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
// Change the app.use(cors()) to the one below
//this should be on the top

//server will know that about the database.
require("./server/config/mongoose.config");
require("./server/routes/user.routes")(app); //routes will know about the app.
require("./server/routes/expense.routes")(app);




app.listen( port, () => console.log(`Listening on port: ${port}`) );