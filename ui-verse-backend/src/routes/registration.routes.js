const router = require("express").Router();
const Registration = require("../models/Registration");
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

// Participant registers for event
router.post("/:eventId", auth, async (req, res) => {
  const alreadyRegistered = await Registration.findOne({
    event: req.params.eventId,
    participant: req.user._id,
  });

  if (alreadyRegistered) {
    return res.status(400).json({ message: "Already registered" });
  }

  const registration = await Registration.create({
    event: req.params.eventId,
    participant: req.user._id,
  });

  res.json(registration);
});

// Participant views own registrations
router.get("/my", auth, async (req, res) => {
  const registrations = await Registration.find({
    participant: req.user._id,
  }).populate("event");

  res.json(registrations);
});

// Admin updates status
router.patch("/:id", auth, adminOnly, async (req, res) => {
  const { status } = req.body;

  const updated = await Registration.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;
