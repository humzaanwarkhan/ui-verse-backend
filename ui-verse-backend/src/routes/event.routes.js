const router = require("express").Router();
const Event = require("../models/Event");
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

// Create event (admin)
router.post("/", auth, adminOnly, async (req, res) => {
  const event = await Event.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.json(event);
});

// Get all events
router.get("/", auth, async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  res.json(events);
});

module.exports = router;
