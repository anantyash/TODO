export function errorHandler(err, req, res, next) {
  // Your code here
  if (err.name === "ValidationError")
    return res.status(400).json({ error: { message: err.message } });
  else if (err.name === "CastError")
    return res.status(400).json({ error: { message: "Invalid id format" } });
  else
    return res
      .status(err.status || 500)
      .json({ error: { message: err.message } });
}
