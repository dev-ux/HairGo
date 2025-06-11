const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for demo purposes
const users = [];
const hairdressers = [];
const reservations = [];

// Helper function to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// User routes
app.post('/users/register', (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  const newUser = { id: generateId(), name, email, password, role };
  users.push(newUser);
  res.status(201).json({ id: newUser.id, name, email, role });
});

app.post('/users/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

// Hairdresser routes
app.post('/hairdressers', (req, res) => {
  const { userId, specialties, location } = req.body;
  if (!userId || !specialties || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const user = users.find(u => u.id === userId && u.role === 'hairdresser');
  if (!user) {
    return res.status(404).json({ error: 'User not found or not a hairdresser' });
  }
  const newHairdresser = { id: generateId(), userId, specialties, location };
  hairdressers.push(newHairdresser);
  res.status(201).json(newHairdresser);
});

app.get('/hairdressers', (req, res) => {
  res.json(hairdressers);
});

// Reservation routes
app.post('/reservations', (req, res) => {
  const { clientId, hairdresserId, datetime, service } = req.body;
  if (!clientId || !hairdresserId || !datetime || !service) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const client = users.find(u => u.id === clientId && u.role === 'client');
  const hairdresser = hairdressers.find(h => h.id === hairdresserId);
  if (!client) {
    return res.status(404).json({ error: 'Client not found' });
  }
  if (!hairdresser) {
    return res.status(404).json({ error: 'Hairdresser not found' });
  }
  const newReservation = { id: generateId(), clientId, hairdresserId, datetime, service, status: 'pending' };
  reservations.push(newReservation);
  res.status(201).json(newReservation);
});

app.get('/reservations', (req, res) => {
  res.json(reservations);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
