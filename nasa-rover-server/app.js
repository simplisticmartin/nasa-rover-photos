const express = require('express')
const app = express()
const cors = require("cors");
const axios = require("axios");
//added temp
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

require("dotenv").config({ path: "./.env" });
const port = process.env.PORT;
const api_key = process.env.API_KEY;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//enable fileuploading                                                                                                       
app.use(fileUpload({
    createParentPath: true
}));


let image_obj = null;
app.get("/search", (req,res)=>{
    console.log(req.query.date);
    axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date="+req.query.date+"&api_key=" + api_key)
    .then((response)=>{
        res.send(response.data);
        image_obj = response.data;
    })
    .catch((error)=>{
        console.log(error);
        res.send("Error");
    })
    // res.send("tried searching");
})
app.get('/download', function(req, res){
    //const file = axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date="+req.query.date+"&api_key=" + api_key);

    //`${__dirname}/upload-folder/dramaticpenguin.MOV`;
    res.download("" + image_obj.photos[0].img_src); // Set disposition and send it.
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})