import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import leetcodeRouter from "./leetcode.js";
import spotifyRouter from "./spotify.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/spotify", spotifyRouter);

app.use("/api/leetcode", leetcodeRouter);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});