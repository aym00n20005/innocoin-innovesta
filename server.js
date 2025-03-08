const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Initialize Firebase Admin
const serviceAccount = require("./serviceAccountKey.json"); // Download from Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.use(cors());
app.use(bodyParser.json());

// Middleware to check admin (Replace with actual authentication later)
const checkAdmin = (req, res, next) => {
  const { adminKey } = req.headers;
  if (adminKey !== "YOUR_SECRET_ADMIN_KEY") {
    return res.status(403).send("Access Denied");
  }
  next();
};

// **API: Add InnoCoins (Admin Only)**
app.post("/add-coins", checkAdmin, async (req, res) => {
  const { username, amount } = req.body;

  if (!username || !amount) {
    return res.status(400).send("Missing parameters");
  }

  const userRef = db.collection("users").doc(username);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    return res.status(404).send("User not found");
  }

  await userRef.update({
    balance: admin.firestore.FieldValue.increment(amount),
  });

  res.send(`Added ${amount} InnoCoins to ${username}`);
});

app.listen(port, () => {
  console.log(`Admin Server running at http://localhost:${port}`);
});
