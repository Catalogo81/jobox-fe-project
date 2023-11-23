const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const ejs = require("ejs");

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 4000;

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

//gets our input from the mongoDB and and puts the data on to our index.ejs file
app.get("/", (req, res) => {
    Contracts.find({}, function(err, contracts){
        res.render('index', {
            contractsList: contracts
        });
    })
})

//verifies the port we are using
app.listen(PORT, () => {
    console.log(`Listerning on port ${PORT}`);
});
