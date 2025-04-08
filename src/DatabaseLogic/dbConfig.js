const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
let db;

async function connectDb() {
    try {
        await client.connect();
        db = client.db();
        console.log("Successfully connected to database!");
    } catch (error) {
        // Ensures that the client will close when you finish/error
        console.log("Failed to connect to database", error);
        process.exit(1);
    }
}
async function getDb() {
    if (!db) throw new Error("Database not connected");
    return db;
}


module.exports = { connectDb, getDb }

