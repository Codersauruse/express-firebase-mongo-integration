const { db } = require("../config/firebase.js");
const Cars = require("../models/Cars.js");
const Car = require("../models/Cars.js");

// const addDataToMongo = async () => {
//   try {
//     const carsRef = db.collection("Vehicles").doc("Car");
//     const doc = await carsRef.get();

//     if (!doc.exists) {
//       console.log("No such document!");
//       return;
//     }

//     const carsData = doc.data().cars; // Assuming cars is an array of car objects
//     console.log("Document data:", carsData);

//     for (const car of carsData) {
//       // Corrected loop
//       const newCar = new Car(car); // Create a new instance of the Car model
//       await newCar.save(); // Save the document to MongoDB
//       console.log(`Car added to MongoDB: ${car.name}`); // Log the car name
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

const addDataToMongo = async (collectionName, documentName, DataModel) => {
  try {
    // Reference the Firestore document
    const docRef = db.collection(collectionName).doc(documentName);
    const doc = await docRef.get();

    if (!doc.exists) {
      console.log("No such document!");
      return;
    }

    // Retrieve and assign the data based on documentName
    let data;
    switch (documentName) {
      case "Car":
        data = doc.data().cars; // Assuming Firestore has "cars" array in this document
        break;
      case "motocycles":
        data = doc.data().motorcycles; // Assuming Firestore has "motorcycles" array in this document
        break;
      default:
        console.log(`No matching handler for document: ${documentName}`);
        return;
    }

    // console.log(`Document data from ${documentName}:`, data);

    // Save each vehicle to MongoDB
    for (const vehicle of data) {
      const newModelInstance = new DataModel(vehicle); // Create a new instance of the DataModel
      await newModelInstance.save(); // Save the document to MongoDB
      console.log(`${vehicle.name} added to MongoDB`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = addDataToMongo;
