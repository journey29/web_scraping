import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONDODB_URI!);
  } catch (error) {
    console.log(error);
  }
};
