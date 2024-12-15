import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectToDB } from "./db/db.js";
import userRoutes from "./routes/user.routes.js";

connectToDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello World");
});

app.use("/users", userRoutes);

export default app;
