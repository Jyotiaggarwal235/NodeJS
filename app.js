 const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnection = require("./config/mongodbconfig");
const authenticate = require("./routes/auth");


//middlewares
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

try{
	//mongoose connections
	dbConnection.dbConfig();

	//middleware to access the api 
	app.use("/api/authenticate", authenticate);
}
catch(error){
    console.log(error);
}

app.listen(3000, () => {
  console.log("listening to 3000");
});
 



 
 
