const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// MongoDB URI
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        await client.connect();
        console.log("MongoDB Connected Successfully");

        const db = client.db("property_rental");

        // Collections
        const usersCollection = db.collection("users");
        const propertiesCollection = db.collection("properties");
        const favoritesCollection = db.collection("favorites");
        const bookingsCollection = db.collection("bookings");
        const transactionsCollection = db.collection("transactions");

        // ==========================

        // server.js এ এটি যুক্ত করুন
        // app.get("/users/:email", async (req, res) => {
        //     const email = req.params.email;
        //     const query = { email: email };
        //     const result = await usersCollection.findOne(query);
        //     res.send(result);
        // });
        // // USERS API
        // ==========================
        app.get("/users", async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        });

        app.post("/users", async (req, res) => {
            const user = req.body;
            const existingUser = await usersCollection.findOne({ email: user.email });
            if (existingUser) return res.send({ message: "User already exists" });
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        // ==========================
        // PROPERTIES API
        // ==========================
        // Add Property
        app.post("/properties", async (req, res) => {
            const newProperty = req.body;
            newProperty.status = "Pending";
            const result = await propertiesCollection.insertOne(newProperty);
            res.send(result);
        });

        // Get All Properties
        app.get("/properties", async (req, res) => {
            const result = await propertiesCollection.find().toArray();
            res.send(result);
        });

        // Get My Properties
        app.get("/properties/owner/:email", async (req, res) => {
            const email = req.params.email;
            const result = await propertiesCollection.find({ ownerEmail: email }).toArray();
            res.send(result);
        });

        // Get Single Property
        app.get("/properties/:id", async (req, res) => {
            const id = req.params.id;
            const result = await propertiesCollection.findOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        // Update Property
        app.patch("/properties/:id", async (req, res) => {
            const id = req.params.id;
            const updateData = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = { $set: updateData };
            const result = await propertiesCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        // Delete Property
        app.delete("/properties/:id", async (req, res) => {
            const id = req.params.id;
            const result = await propertiesCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        // ==========================
        // FAVORITES API
        // ==========================
        app.post("/favorites", async (req, res) => {
            const fav = req.body;
            const result = await favoritesCollection.insertOne(fav);
            res.send(result);
        });

        // ==========================
        // BOOKINGS API
        // ==========================
        app.post("/bookings", async (req, res) => {
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        });

        app.get("/bookings/owner/:email", async (req, res) => {
            const email = req.params.email;
            const result = await bookingsCollection.find({ ownerEmail: email }).toArray();
            res.send(result);
        });

        app.patch("/bookings/:id", async (req, res) => {
            const id = req.params.id;
            const { status } = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = { $set: { status: status } };
            const result = await bookingsCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        // ==========================
        // TRANSACTIONS API
        // ==========================
        app.post("/transactions", async (req, res) => {
            const transaction = req.body;
            const result = await transactionsCollection.insertOne(transaction);
            res.send(result);
        });

        app.get("/transactions", async (req, res) => {
            const result = await transactionsCollection.find().toArray();
            res.send(result);
        });

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error(error);
    }
}

run();

app.get("/", (req, res) => {
    res.send("Property Rental Server is Running smoothly!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});