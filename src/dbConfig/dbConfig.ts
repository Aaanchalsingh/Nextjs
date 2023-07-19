import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongo Connected");
    });
    connection.on("erorr", (err) => {
      console.log("Mongo not connected");
      process.exit();
    });
  } catch (error) {
    console.log("something wrong");
    console.log(error);
  }
}
