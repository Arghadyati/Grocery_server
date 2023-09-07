const exp=require("express")  //npm install express
const cors=require("cors")
const bodyParser=require('body-parser')
const fu=require("express-fileupload")
const app=exp();
app.use(exp.static('public'))
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(fu());

const mongoose = require('mongoose');  //npm install mongoose
// mongoose.connect('mongodb+srv://Arghadyati:argha1234@cluster0.j0qnw2f.mongodb.net/gmitdb?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://arghadyati:A12345@cluster0.helmloj.mongodb.net/test?retryWrites=true&w=majority');

const cr=require("./routes/Category.js");
const pr=require("./routes/Product");
const ar=require("./routes/auth");

app.get("/",(req,res)=>{

    res.send("Hello express");
});

app.use("/pro",pr);

app.use("/cat",cr);
app.use("/auth",ar);

app.listen(2000);