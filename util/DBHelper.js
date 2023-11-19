const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const url = process.env.MONGO_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function QueryDB(db, collection, queryFilter, callback){
    console.log('waiting for QUERIES...');
    var cursor = await client.db(db).collection(collection).find(queryFilter);
    let returnedEntries = await cursor.toArray();
    console.log('QUERY Ran');
    callback(returnedEntries)
}

async function InsertDB(db, collection, document, callback){
    console.log('waiting for INSERT...');
    result = await client.db(db).collection(collection).insertOne(document);
    console.log('INSERT Ran');
    callback(result);
}

async function DeleteDBText(entryId, callback){
    console.log('waiting for DELETE...');
    result = await client.db('Entries').collection('text').deleteOne({_id: new ObjectId(entryId)})
    console.log('DELETE Ran')
    callback(result)
}

async function DeleteDBImage(entryId, callback){
  console.log('waiting for DELETE...');
  result = await client.db('Entries').collection('images').deleteOne({entryId: entryId})
  console.log('DELETE Ran')
  callback(result)
}

async function DeleteUserDB(db, collection, user, callback){
  console.log('waiting for DELETE...');
  result = await client.db(db).collection(collection).deleteOne(user);
  console.log('DELETE Ran');
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
  InsertDB,
  DeleteDBText,
  DeleteDBImage,
  DeleteUserDB
}