const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Jenkins CI/CD Pipeline!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}