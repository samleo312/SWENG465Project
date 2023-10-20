const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://admin:password1234@sweng465project.vun5rev.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function QueryDB(db, collection, queryFilter, callback){
    var cursor = await client.db(db).collection(collection).find(queryFilter);
    let returnedEntries = await cursor.toArray()

    callback(returnedEntries)
}

async function InsertDB(db, collection, document, callback){
    result = await client.db(db).collection(collection).insertOne(document)
    callback(result);
}

async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch(e){
      return e; 
    }
}
run().catch(console.dir);

module.exports = {
  QueryDB, 
  InsertDB
}