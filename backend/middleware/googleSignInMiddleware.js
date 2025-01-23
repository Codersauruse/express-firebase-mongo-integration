const admin = require("../config/firebase.js");

const googleSignInMiddleWare = async (req, res, next) => {
  console.log("yello");
  try {
    // Check for Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: Token missing or invalid format",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];
    console.log("Received Token:", token);

    // Verify token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token verification failed" });
    }

    console.log("Decoded Token:", decodedToken);

    // Attach only necessary user data to the request object
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || null, // Optional: Include name if present
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in googleSignInMiddleWare:", error);

    // Handle Firebase-specific errors
    if (error.code === "auth/id-token-expired") {
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    } else if (error.code === "auth/argument-error") {
      return res
        .status(400)
        .json({ message: "Invalid token. Please log in again." });
    }

    // Send generic error response for other cases
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = googleSignInMiddleWare;
