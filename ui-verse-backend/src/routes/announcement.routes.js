const router = require("express").Router();
const Announcement = require("../models/Announcement");
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

// Admin creates announcement
router.post("/", auth, adminOnly, async (req, res) => {
  const { message, event } = req.body;

  const announcement = await Announcement.create({
    message,
    event: event || null,
    createdBy: req.user._id,
  });

  res.json(announcement);
});

// Get announcements (participants & admins)
router.get("/", auth, async (req, res) => {
  const announcements = await Announcement.find()
    .populate("event", "title")
    .sort({ createdAt: -1 });

  res.json(announcements);
});

module.exports = router;
