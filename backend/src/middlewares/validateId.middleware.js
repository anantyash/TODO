import mongoose from "mongoose";

export function validateId(req, res, next) {
  // Your code here
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: { message: "Invalid id" } });
  }
  next();
}
