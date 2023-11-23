const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const ejs = require("ejs");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))

const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static('public'));

const dbUrl = "mongodb+srv://Kgotso:yJz22T3GvMhUHQp9@cluster0.wrt4clu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
};

//connect to our mongooseDB
mongoose.set("strictQuery", false);
mongoose.connect(dbUrl, connectionParams)
.then(() => {
    console.info("Connected to the DB");
})
.catch((e) => {
    console.log("Error: ", e);
});

//create the scheama
const contractsSchema = {
    clientName: String,
    startDate: Date,
    endDate: Date,
    serviceCost: Number,
    serviceDescription: String
}

const Contracts = mongoose.model("Contracts", contractsSchema);


//sends the index.html file to our browers
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})


//send input from user to our mongoDB
app.post("/", function(req, res){

    //create our contracts node
    let newContracts = new Contracts({
        clientName: req.body.clientName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        serviceCost: req.body.serviceCost,
        serviceDescription: req.body.serviceDescription
    });

    //save the file
    newContracts.save();
    res.redirect('/');
})


//verifies the port we are using
app.listen(PORT, () => {
    console.log(`Listerning on port ${PORT}`);
});