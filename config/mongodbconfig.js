const mongoose = require("mongoose");


function dbConfig() {
mongoose
.connect('mongodb://localhost:27017/database',{
useNewUrlParser: true,
useUnifiedTopology:true
})
        .then(() => console.log("connected to MongoDb"))
        .catch(err => console.log("could not connect to mongodb" + err));

}

//exporting the connection and configuration
module.exports.dbConfig = dbConfig;