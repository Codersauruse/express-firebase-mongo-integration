const admin = require("firebase-admin"); // Import the Firebase Admin SDK
const serviceAccount = require("./test-project.json"); // Path to the downloaded key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Or use admin.credential.cert(serviceAccount) if you have a custom service account
  // Add databaseURL if needed: databaseURL: "https://your-database-url.firebaseio.com"
});

// Access Firestore
//onst db = admin.firestore(); // Initialize Firestore instance

// Export the admin SDK and Firestore instance for use in other parts of your project
module.exports = admin;
