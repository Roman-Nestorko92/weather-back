// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config(); // Завантаження змінних середовища з .env файлу

const app = express();
const PORT = process.env.PORT || 3001;
const apiKey = process.env.OPENWEATHERMAP_API_KEY;
app.use(cors());

app.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    const city = data.name;
    const country = data.sys.country;
    const location = `${city}, ${country}`;

    res.json({
      ...data,
      location: location,
    });
  } catch (error) {
    console.error("Помилка отримання погоди:", error);
    res.status(500).json({ error: "Помилка отримання погоди" });
  }
});

app.get("/weather/city", async (req, res) => {
  const { q } = req.query;

  try {
    // Виконати запит до погодового API за допомогою параметра 'q' (місто)
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${apiKey}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Отримати інформацію про місто і країну з отриманих даних
    const city = data.name;
    const country = data.sys.country;
    const location = `${city}, ${country}`;

    // Відправити відформатовані дані на клієнт
    res.json({
      ...data,
      location: location,
    });
  } catch (error) {
    console.error("Помилка отримання погоди:", error);
    res.status(500).json({ error: "Помилка отримання погоди" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
