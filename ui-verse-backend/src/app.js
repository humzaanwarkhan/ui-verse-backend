const express = require("express");
const cors = require("cors");
const auth = require("./middleware/auth");
const adminOnly = require("./middleware/adminOnly");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/events", require("./routes/event.routes"));
app.use("/api/registrations", require("./routes/registration.routes"));
app.use("/api/announcements", require("./routes/announcement.routes"));


app.get("/", (req, res) => {
  res.send("UI-verse backend is alive 🚀");
});

app.get("/me", auth, (req, res) => {
  res.json(req.user);
});

app.get("/admin-test", auth, adminOnly, (req, res) => {
  res.send("You are admin");
});

module.exports = app;
