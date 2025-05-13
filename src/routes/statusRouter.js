import express from "express";

const statusRouter = express.Router();

statusRouter.get("/status", (req, res) => {
  console.log("✅ /api/status route was accessed!");
  res.json({ message: "API is working!" });
});

export default statusRouter;