const admin = require("firebase-admin"); // Import the Firebase Admin SDK
const serviceAccount = require("./test-project.json"); // Path to the downloaded key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Authenticate using the key
});

// Access Firestore
const db = admin.firestore(); // Initialize Firestore instance

// Export the admin SDK and Firestore instance for use in other parts of your project
module.exports = { admin, db };
