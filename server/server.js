const path= require('path');
const express = require('express');


// console.log(__dirname+ "/../public");
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();


app.use(express.static(publicPath));

app.listen(port, ()=>{
    console.log(`Server is listening in port ${port}`);
});