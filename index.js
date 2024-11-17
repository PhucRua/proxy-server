const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Cấu hình CORS để WordPress có thể gọi API
app.use((req, res, next) => {
  // Thay your-wordpress-domain.com bằng domain WordPress của bạn
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Route chuyển tiếp request tới ChatGPT
app.get('/chat', async (req, res) => {
  try {
    const chatGPTUrl = 'https://chatgpt.com/g/g-XjFgvsZIA-tro-ly-toan-hoc-thay-trung';
    const response = await fetch(chatGPTUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).send({
      error: true,
      message: 'Failed to fetch from ChatGPT',
      details: error.message
    });
  }
});

// Homepage với hướng dẫn sử dụng
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ChatGPT Proxy Server</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            pre {
                background: #f4f4f4;
                padding: 15px;
                border-radius: 5px;
            }
            code {
                background: #eee;
                padding: 2px 5px;
                border-radius: 3px;
            }
        </style>
    </head>
    <body>
        <h1>ChatGPT Proxy Server</h1>
        <p>Endpoint: <code>/chat</code></p>
        
        <h2>Cách sử dụng trong WordPress:</h2>
        <pre>
&lt;script&gt;
async function loadChatGPT() {
    try {
        const response = await fetch('${req.protocol}://${req.get('host')}/chat');
        const data = await response.text();
        document.getElementById('chatgpt-container').innerHTML = data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Load ChatGPT khi trang được load
document.addEventListener('DOMContentLoaded', loadChatGPT);
&lt;/script&gt;

&lt;div id="chatgpt-container"&gt;Loading ChatGPT...&lt;/div&gt;
        </pre>
    </body>
    </html>
  `);
});

module.exports = app;

// Chỉ chạy server trong môi trường development
if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => console.log('Server running on port 3000'));
}
