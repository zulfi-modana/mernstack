import express from "express";
import dns from "dns";
import cors from "cors";
import path from "path";

import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
const __dirname = path.resolve();


//middleware
if(process.env.NODE_ENV !== "production") {
app.use(cors({
  origin: "http://localhost:5173", // Replace
}));
}


app.use(express.json()); // parse json body : req.body
/* app.use((req, res, next) => { //simple middleware to log the request url and method
  console.log(`request is made from ${req.url} and method is ${req.method}`);
  next();                 
}); */
app.use(rateLimiter);

console.log("PORT :" + process.env.PORT);
const PORT = process.env.PORT || 5001;

app.use("/api/notes", noteRoutes);

if(process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
})
}


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
  });
});