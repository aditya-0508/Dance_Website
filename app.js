const express = require("express");
const path = require("path");
const app = express();
const mongoose=require('mongoose')//importing mongoose
const bodyparser=require('body-parser')
mongoose.connect('mongodb://127.0.0.1:27017/contactDance',{useNewUrlParser:true})//used to connect with the mongoose
const port = 80;

//define mongoose schema
var contactSchema=new mongoose.Schema({
    Name:String,
    Phone:String,
    email:String,
    address:String,
    desc:String
});
var contact=mongoose.model('contact',contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{//this is majorly used to add the entered value into the database 
    var myData=new contact(req.body)//storing the value entered into a variable myData
    myData.save().then(()=>{//saving the data enetered into the database 
        res.send("This item has succesfully been saved ")
    }).catch(()=>{//due to any reason if the data doesn't get entered 
        res.status(400).send("Item was saved successfully")
    });
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});