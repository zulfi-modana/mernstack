import express from "express";
import dns from "dns";
import cors from "cors";

import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

//middleware
app.use(cors({
  origin: "http://localhost:5173", // Replace
}));

app.use(express.json()); // parse json body : req.body
/* app.use((req, res, next) => { //simple middleware to log the request url and method
  console.log(`request is made from ${req.url} and method is ${req.method}`);
  next();                 
}); */
app.use(rateLimiter);

console.log("PORT :" + process.env.PORT);
const PORT = process.env.PORT || 5001;

app.use("/api/notes", noteRoutes);
/* app.use("/api/product",productRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/emails",emailRoutes); */

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
  });
});