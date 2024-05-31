import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow All Origins with default of CORS(*)
//app.use(cors())
// Option 2: Allow custom origins
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (request, response) => {
  console.log(request);

  return response.status(234).send("Welcome to MERN stack tutorial!!");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to DB");

    app.listen(PORT, () => {
      console.log(`port is ready and this is port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
