import express from "express";
import Router from "./routes/Routes.js";
import connectdb from "./db/dbconfig.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.text()) 
app.use(cors({
   origin: "http://localhost:5173",
  credentials: true
}));

const PORT = 5000;

app.use(morgan("dev"));

app.use(cookieParser());
app.use("/api/users", Router);

app.get("/", (req, res) => res.send("APP is running"));

const start = async () => {
  await connectdb();
  app.listen(PORT, () => {
    console.log(`App is listening to port:${PORT} `);
  });
};

start().catch((err) => {
  console.log(err);
  process.exit(1);
});
