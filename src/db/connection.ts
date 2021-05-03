import { connect, connection } from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

connect(
  process.env.MONGODB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", () => console.log("we are connected!"));
