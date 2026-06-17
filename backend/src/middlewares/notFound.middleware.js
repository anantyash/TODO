export function notFound(req, res) {
  // Your code here
  return res.status(404).json({ error: { message: "Route not found" } });
}
