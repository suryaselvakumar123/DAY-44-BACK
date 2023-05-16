import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";
import { generateShortURLRoute, totalClicksRoute, originalUrlRoute } from "./routes/url.js";
import { loginRoute, signupRoute, forgotPasswordRoute, passwordResetRoute } from "./routes/auth.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 10000;
const MONGO_URL = process.env.MONGO_URL; // Retrieve the MongoDB connection URL from the environment variables

app.use(express.json());
app.use(cors());

// Connecting mongoose
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose is connected"))
  .catch((err) => console.log(err));

// Setting routes
app.use("/generateShortURL", generateShortURLRoute);
app.use("/", totalClicksRoute);
app.use("/url", originalUrlRoute);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/forgotPassword", forgotPasswordRoute);
app.use("/passwordReset", passwordResetRoute);

// Setting the port
app.listen(PORT, () => console.log("Server started at the port", PORT));

app.get("/", (req, res) => {
  res.send("welcome here to my page ");
});
