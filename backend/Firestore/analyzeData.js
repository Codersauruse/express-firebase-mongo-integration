const Car = require("../models/Cars.js");
const Motorcycle = require("../models/motocycles.js");

const analyzeData = async () => {
  try {
    // Fetch all car documents into an array
    const carArray = await Car.find({});

    // Fetch all motorcycle documents into an array
    const motorcycleArray = await Motorcycle.find({});

    console.log("\n printing car array and motorcycle array \n");
    //console.log("Car Array:", carArray);
    //console.log("Motorcycle Array:", motorcycleArray);
     
    // Perform your analysis on the data here
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

module.exports = analyzeData;
