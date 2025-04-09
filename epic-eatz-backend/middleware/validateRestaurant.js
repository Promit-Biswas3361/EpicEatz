const validateRestaurantPayload = (req, res, next) => {
  const errors = [];

  // Check required fields
  if (!req.body.restaurantName) errors.push("Restaurant name is required");
  if (!req.body.openTime || !req.body.closeTime) errors.push("Opening/closing time is required");

  // Validate openDays (must have at least 1 day)
  const openDays = req.body["openDays[]"];
  if (!openDays || (Array.isArray(openDays) && openDays.length === 0)) {
    errors.push("Select at least one open day");
  }

  // Validate file uploads
  if (!req.files?.fssai?.[0]) errors.push("FSSAI certificate is required");
  if (!req.files?.gst?.[0]) errors.push("GST certificate is required");

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next(); // Proceed if validation passes
};

module.exports = validateRestaurantPayload;