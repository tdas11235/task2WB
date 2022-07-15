const express= require('express');
const app= express();
const dotenv= require('dotenv');
dotenv.config();

require('./Config/mongoConnection');

const port= process.env.PORT;
app.listen(port, ()=> {
    console.log("the server is listening on the port "+port);
});