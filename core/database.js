const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://jupabass89:qeNxX4dZpDzKLjzv@my-commerce-test-app.ommwn.mongodb.net/?retryWrites=true&w=majority&appName=my-commerce-test-app";
let _db;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    _db = client.db("mydatabase");
    console.log("✅ MongoDB connected successfully!");
    return _db;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

function getDb() {
  if (_db) {
    return _db;
  }
  throw "No db found!";
}

exports.connectDB = connectDB;
exports.getDb = getDb;
