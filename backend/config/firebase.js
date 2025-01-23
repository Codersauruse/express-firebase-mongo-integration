const admin = require("firebase-admin"); // Import the Firebase Admin SDK
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

const serviceAccount = require("./test-project.json"); // Path to the downloaded key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Or use admin.credential.cert(serviceAccount) if you have a custom service account
  // Add databaseURL if needed: databaseURL: "https://your-database-url.firebaseio.com"
});

const db = getFirestore();

// Export the admin SDK and Firestore instance for use in other parts of your project
module.exports = { admin, db };
