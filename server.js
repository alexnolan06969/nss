const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const users = [
  { username: 'guest', password: 'guest123', role: 'low' },
  { username: 'admin', password: 'Adm!nS3cur3#99', role: 'admin' }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, role: user.role });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});