const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let bookings = [];

// Создание записи
app.post('/book', (req, res) => {
  const { telegramId, name, phone, service, date, time, note } = req.body;
  if (!telegramId) return res.json({ success: false, message: 'Нет Telegram ID' });

  // Проверка, записан ли пользователь
  const exists = bookings.find(b => b.telegramId === telegramId);
  if (exists) return res.json({ success: false, message: 'Вы уже записались' });

  bookings.push({ telegramId, name, phone, service, date, time, note });
  res.json({ success: true });
});

// Получение всех записей для администратора
app.get('/admin/bookings', (req, res) => {
  if (req.query.key !== 'SECRET_KEY') return res.status(403).send('Доступ запрещен');
  res.json(bookings);
});

app.listen(3000, () => console.log('Booking Backend running 🚀'));
