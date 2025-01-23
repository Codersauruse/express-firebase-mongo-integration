const { db } = require("../config/firebase.js");
const cars = require("./carDetails.js");
const motorcycles = require("./motocycles.js");

const addData = async () => {
  // Connect to the "Vehicles" collection, "Car" document
  const carsDoc = db.collection("Vehicles").doc("Car");
    const cycleDoc = db.collection("Vehicles").doc("motocycles");
  try {
      await carsDoc.set({ cars }, { merge: true }); // Store the array of cars in a single document
      await cycleDoc.set({ motorcycles }, { merge: true });
    console.log("Cars and motocycles added successfully to a single document.");
  } catch (error) {
    console.error("Error adding cars: ", error);
  }
};

module.exports = addData;
