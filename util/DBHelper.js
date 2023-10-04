//const { MongoClient, ServerApiVersion } = require("mongodb");
//const uri = "mongodb+srv://admin:password1234@sweng465project.vun5rev.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
//const client = new MongoClient(uri, {
//  serverApi: {
//    version: ServerApiVersion.v1,
//    strict: true,
//    deprecationErrors: true,
//  }
//});

//let connection = client.connect();

//client.db("admin").command({ ping: 1 });
//console.log("Pinged your deployment. You successfully connected to MongoDB!");


// I believe once the connection is established, can now create utility functions to interact with it
// which as long as those functions are included in the export below, can be required and used in other files.
//module.exports = connection;

