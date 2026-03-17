# 🚀 Hướng Dẫn Nhanh - RESTful API

Bắt đầu với RESTful API chỉ trong 5 phút!

---

## ⚡ Bước 1: Cài Đặt Node.js

Tải Node.js từ https://nodejs.org (phiên bản LTS)

Kiểm tra:
```bash
node --version
npm --version
```

---

## 🔧 Bước 2: Cài Đặt Dependencies

Mở PowerShell/Terminal trong thư mục dự án:

```bash
npm install
```

Điều này sẽ cài:
- `express` - Framework web
- `uuid` - Tạo ID duy nhất
- `nodemon` - (dev) Auto-reload khi code thay đổi

---

## 🎯 Bước 3: Chạy Server

```bash
npm start
```

Hoặc (tự động reload):
```bash
npm run dev
```

**Output:**
```
╔════════════════════════════════════════╗
║   RESTful API Server Running! 🚀       ║
║   Truy cập: http://localhost:3000      ║
║   Dùng Postman hoặc curl để test       ║
╚════════════════════════════════════════╝
```

---

## 📱 Bước 4: Kiểm Tra API

### Option A: Dùng Browser

Mở browser, truy cập:
```
http://localhost:3000/api/products
```

Sẽ thấy danh sách sản phẩm JSON.

### Option B: Dùng Postman

1. Tải Postman: https://www.postman.com/downloads/
2. Tạo request mới
3. Chọn Method (GET, POST, PUT, DELETE)
4. Điền URL: `http://localhost:3000/api/products`
5. Nhấn Send

### Option C: Dùng cURL (Terminal/PowerShell)

```bash
# Lấy tất cả sản phẩm
curl http://localhost:3000/api/products

# Lấy một sản phẩm
curl http://localhost:3000/api/products/1

# Tạo sản phẩm mới
curl -X POST http://localhost:3000/api/products ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Máy ảnh\",\"price\":12000000}"

# Cập nhật sản phẩm
curl -X PUT http://localhost:3000/api/products/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Laptop Pro\",\"price\":20000000}"

# Xóa sản phẩm
curl -X DELETE http://localhost:3000/api/products/1
```

---

## 📚 Tài Liệu

| File | Mô Tả |
|------|-------|
| [README.md](README.md) | Giải thích chi tiết nguyên tắc REST |
| [server.js](server.js) | Code chính - RESTful API |
| [REST_API_DETAILS.md](REST_API_DETAILS.md) | Hướng dẫn nâng cao |
| [CURL_EXAMPLES.md](CURL_EXAMPLES.md) | Ví dụ sử dụng cURL |

---

## 🔍 Test Các Endpoints

### GET /api/products - Lấy Tất Cả
```bash
curl http://localhost:3000/api/products
```

**Response:**
```json
{
  "success": true,
  "message": "Lấy danh sách sản phẩm thành công",
  "data": [
    {"id": "1", "name": "Laptop", "price": 15000000, ...},
    {"id": "2", "name": "Điện thoại", "price": 8000000, ...}
  ],
  "total": 3
}
```

---

### GET /api/products/1 - Lấy Một Sản Phẩm
```bash
curl http://localhost:3000/api/products/1
```

**Response:**
```json
{
  "success": true,
  "message": "Lấy sản phẩm thành công",
  "data": {
    "id": "1",
    "name": "Laptop",
    "price": 15000000,
    "description": "Máy tính xách tay hiệu năng cao",
    "stock": 10
  }
}
```

---

### POST /api/products - Tạo Sản Phẩm Mới

**PowerShell:**
```powershell
$body = @{
    name = "Chuột không dây"
    price = 500000
    description = "Chuột logitech"
    stock = 50
} | ConvertTo-Json

curl -X POST http://localhost:3000/api/products `
  -H "Content-Type: application/json" `
  -Body $body
```

**Bash/Linux:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Chuột không dây","price":500000,"stock":50}'
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Tạo sản phẩm thành công",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Chuột không dây",
    "price": 500000,
    "stock": 50,
    "createdAt": "2026-03-17T10:30:00.000Z"
  }
}
```

---

### PUT /api/products/1 - Cập Nhật Sản Phẩm

```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Laptop Gaming\",\"price\":18000000,\"stock\":8}"
```

---

### DELETE /api/products/1 - Xóa Sản Phẩm

```bash
curl -X DELETE http://localhost:3000/api/products/1
```

---

## 🎨 Cấu Trúc API

```
┌─────────────────────────────────────┐
│   http://localhost:3000             │ <- Base URL
│          │                          │
│          ├─ /api/products           │ <- Resource endpoint
│          │  ├─ [GET] Lấy tất cả    │
│          │  ├─ [POST] Tạo mới      │
│          │  │                      │
│          │  └─ /{id}              │ <- Specific resource
│          │     ├─ [GET] Chi tiết   │
│          │     ├─ [PUT] Cập nhật   │
│          │     ├─ [PATCH] Sửa phần │
│          │     └─ [DELETE] Xóa    │
│          │                        │
│          └─ /api/* (endpoint khác) │
│                                    │
└─────────────────────────────────────┘
```

---

## 🐛 Khắc Phục Lỗi

### Port 3000 đã được sử dụng?

```bash
# Tìm process sử dụng port 3000
netstat -ano | findstr :3000

# Kill process (Windows)
taskkill /PID <PID> /F
```

### Module không found?

```bash
# Xóa node_modules và cài lại
rm -r node_modules
npm install
```

### Server không respond?

```bash
# Check xem server có chạy
curl http://localhost:3000/api/products

# Check console có lỗi
# Nhấn Ctrl+C để dừng, rồi npm start lại
```

---

## 📊 HTTP Status Codes Cần Biết

```
✅ 200 OK - Thành công
✅ 201 Created - Tạo resource thành công
❌ 400 Bad Request - Dữ liệu sai
❌ 404 Not Found - Không tìm thấy
❌ 500 Error - Lỗi server
```

---

## 🎓 Concepts Chính

| Concept | Ý Nghĩa |
|---------|---------|
| **REST** | Kiến trúc API sử dụng HTTP |
| **Resource** | Tài nguyên được quản lý (products, users) |
| **Endpoint** | Địa chỉ API (GET/api/products) |
| **Method** | HTTP verb (GET, POST, PUT, DELETE) |
| **Status Code** | Kết quả của request (200, 404, 500) |
| **JSON** | Format dữ liệu (request/response) |
| **Stateless** | Mỗi request độc lập |

---

## 📝 Bây Giờ Hãy:

1. ✅ Chạy `npm install`
2. ✅ Chạy `npm start`
3. ✅ Test tất cả endpoints
4. ✅ Đọc code trong `server.js` để hiểu
5. ✅ Thử modify code và test lại
6. ✅ Đọc `REST_API_DETAILS.md` để hiểu sâu hơn

---

## 🎉 Chúc Mừng!

Bạn vừa tạo một RESTful API đầu tiên!

**Tiếp theo:** Thêm database, authentication, validation, deployment...

Happy coding! 🚀

