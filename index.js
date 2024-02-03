const bodyparser = require('body-parser')
const express = require("express")
const app=express();
const path = require('path')
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shivamply');

// app.use('/static', express.static('static'))
app.use('/static', express.static('static'))

const kittyscema = new mongoose.Schema({
    email: String
})
const emailid=mongoose.model('emailid',kittyscema);


let PORT = process.env.port || 3000

app.set("views", path.join(__dirname))
app.set("view engine", "ejs")

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.get("/", function (req, res) {
	res.render("./views/project")
});

app.post('/contect', (req, res) => {
    var myData=new emailid(req.body)
    myData.save().then(()=>{
        console.log("Using Body-parser:", req.body)
    })
})

app.listen(PORT, function (error) {
	console.log("Server created Successfully on http://localhost:3000/")
	if (error) throw error
})










