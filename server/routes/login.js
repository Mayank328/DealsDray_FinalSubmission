import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb"; // Convert the id from string to ObjectId for the _id.

// Router for handling record-related routes is created here. 
const loginRouter = express.Router();

// Backend defines API endpoints at /record for CRUD operations (GET, GET by id, POST, PATCH, DELETE):

// Get a single record by username
loginRouter.post("/", async (req, res) => {
  try {
    const query = { f_userName: req.body.userName }; // Create a query object to find the record by its username
    console.log(JSON.stringify(req.body.userName))
    const collection = await db.collection("t_login"); // Get 'records' collection 
    const result = await collection.findOne(query); // Find one record matching the query
    console.log(JSON.stringify(result));
    if (!result) {
      res.status(404).send("Record not found");
    } else {
        console.log(result.f_Pwd +'==='+ req.body.Pwd)
      const pwdMatch = (result.f_Pwd === req.body.Pwd);
      if(pwdMatch){
        res.status(200).send("Success");
    }
    else{
        res.status(401).send("Incorrect Password");
    }
    }
  } catch (err) {
    console.error("Failed to fetch record:", err);
    res.status(500).send("User does not exist");
  }
});

export default loginRouter; // Export the router
