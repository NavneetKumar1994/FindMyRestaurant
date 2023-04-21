const express= require('express');
const app= express();
const bodyPareser= require('body-parser');
const mongoose= require('mongoose');
const portConfig = require('./configs/port.config');
const dbConfig= require('./configs/mongodb.config');

app.use(bodyPareser.json());
app.use(bodyPareser.urlencoded({extended:true}));

mongoose.connect(dbConfig.DB_URL);
const db= mongoose.connection;

db.once("open",()=>{
    console.log("Successfully connected to mongodb");
})
db.on('error',()=>{
    console.log("Error while connecting to mongodb");
    process.exit();
})

require('./routes/restaurant.route')(app);


app.listen(portConfig.PORT,()=>{
       console.log(`Server is up and running on port: ${portConfig.PORT}` )
})




