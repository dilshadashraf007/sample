require('dotenv').config();
const { MongoClient } = require('mongodb');


const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    throw new Error('MONGO_URI is required in the .env file');
}


const client = new MongoClient(mongoUri);

(async () => {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        // Optional: Access a database and collection
        const db = client.db("emp"); // Replace with your database name
        const collection = db.collection("emp"); // Replace with your collection name

        console.log("Database and collection selected successfully");

        // Example: Fetch all documents from a collection
        const documents = await collection.find({}).toArray();
        console.log("Documents in collection:", documents);

        // Close the connection
        await client.close();
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
})();
