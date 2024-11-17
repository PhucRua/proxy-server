# Proxy Server

Proxy server đơn giản sử dụng Express.js để chuyển tiếp requests tới ChatGPT API.

## Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy ở chế độ development
npm run dev

# Chạy ở chế độ production
npm start
```

## API Endpoints

- GET `/proxy` - Proxy endpoint để truy cập ChatGPT

## Deployment

Dự án được cấu hình để deploy lên Vercel. Để deploy:

1. Push code lên GitHub
2. Import project vào Vercel từ GitHub repository
3. Vercel sẽ tự động build và deploy

## Môi trường phát triển

- Node.js >= 14.0.0
- npm >= 6.0.0
