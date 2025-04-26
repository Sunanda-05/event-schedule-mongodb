const errorHandler = (err, req, res, next) => {
  // Handle invalid JSON
  if (err instanceof SyntaxError && "body" in err) {
    console.log("Invalid JSON received");
    return res.status(400).json({ error: "Invalid JSON format" });
  }

  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || "Internal Server Error",
  });
};

export default errorHandler;
