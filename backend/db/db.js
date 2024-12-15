import mongoose from "mongoose";

export const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO, console.log("DB Connected"))
    .catch((err) => console.log(err));
};