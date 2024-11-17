const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Cấu hình CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Tạo endpoint proxy
app.get('/proxy', async (req, res) => {
  try {
    const response = await fetch('https://chatgpt.com/g/g-XjFgvsZIA-tro-ly-toan-hoc-thay-trung');
    const data = await response.text();
    res.send(data);
  } catch (error) {
    res.status(500).send('Lỗi proxy: ' + error.message);
  }
});

// Export app cho Vercel
module.exports = app;

// Chạy server local
if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => console.log('Server Node.js chạy trên cổng 3000'));
}
