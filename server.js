const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Telegram Booking Backend is running 🚀");
});

app.post("/book", (req, res) => {
  const { name, date } = req.body;

  if (!name || !date) {
    return res.status(400).json({ error: "name and date are required" });
  }

  res.json({
    success: true,
    message: `Бронирование создано для ${name} на ${date}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
