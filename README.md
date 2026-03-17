# 📚 RESTful API - Ví dụ Hoàn Chỉnh

Đây là một ví dụ thực tế về **RESTful API** sử dụng **Node.js** và **Express.js** để quản lý danh sách sản phẩm.

---

## 🎯 Nguyên Tắc RESTful Architecture

### 1. **Resource-Oriented Design** (Định hướng Tài nguyên)
- Sử dụng **danh từ** để đặt tên endpoint, KHÔNG dùng động từ
- ❌ Sai: `/api/getProducts`, `/api/deleteProduct`
- ✅ Đúng: `/api/products`, `/api/products/:id`

### 2. **HTTP Methods** (Phương Thức HTTP)
| Method | Tác Dụng | Mã Trạng Thái |
|--------|---------|--------------|
| **GET** | Lấy dữ liệu | 200 OK |
| **POST** | Tạo dữ liệu mới | 201 Created |
| **PUT** | Cập nhật hoàn toàn | 200 OK |
| **PATCH** | Cập nhật một phần | 200 OK |
| **DELETE** | Xóa dữ liệu | 200 OK / 204 No Content |

### 3. **Stateless** (Không trạng thái)
- Mỗi request được xử lý độc lập
- Server không lưu trữ thông tin về client
- Dễ scale horizontally

### 4. **JSON Format**
- Request và Response đều sử dụng JSON
- Đơn giản, nhẹ, dễ parse

### 5. **HTTP Status Codes** (Mã Trạng Thái)
```
2xx - Thành công
  ✅ 200 OK - Yêu cầu thành công
  ✅ 201 Created - Tạo resource thành công
  ✅ 204 No Content - Thành công nhưng không có dữ liệu trả về

4xx - Lỗi phía Client
  ❌ 400 Bad Request - Dữ liệu không hợp lệ
  ❌ 401 Unauthorized - Chưa xác thực
  ❌ 403 Forbidden - Không có quyền truy cập
  ❌ 404 Not Found - Resource không tồn tại

5xx - Lỗi phía Server
  ❌ 500 Internal Server Error - Lỗi server
  ❌ 503 Service Unavailable - Server tạm thời không khả dụng
```

---

## 📦 Cài Đặt & Chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy server
```bash
npm start
```

Hoặc chế độ development với auto-reload:
```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:3000`

---

## 🔌 API Endpoints

### 1. GET - Lấy tất cả sản phẩm
```
GET /api/products?skip=0&limit=10
```

**Phản hồi:**
```json
{
  "success": true,
  "message": "Lấy danh sách sản phẩm thành công",
  "data": [
    {
      "id": "1",
      "name": "Laptop",
      "price": 15000000,
      "description": "Máy tính xách tay hiệu năng cao",
      "stock": 10
    }
  ],
  "total": 3,
  "skip": 0,
  "limit": 10
}
```

---

### 2. GET - Lấy một sản phẩm
```
GET /api/products/1
```

**Phản hồi:**
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

### 3. POST - Tạo sản phẩm mới
```
POST /api/products
Content-Type: application/json

{
  "name": "Máy ảnh",
  "price": 12000000,
  "description": "Máy ảnh DSLR chuyên nghiệp",
  "stock": 5
}
```

**Phản hồi (201 Created):**
```json
{
  "success": true,
  "message": "Tạo sản phẩm thành công",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Máy ảnh",
    "price": 12000000,
    "description": "Máy ảnh DSLR chuyên nghiệp",
    "stock": 5,
    "createdAt": "2026-03-17T10:30:00.000Z"
  }
}
```

---

### 4. PUT - Cập nhật toàn bộ sản phẩm
```
PUT /api/products/1
Content-Type: application/json

{
  "name": "Laptop Gaming",
  "price": 18000000,
  "description": "Laptop gaming hiệu năng cao",
  "stock": 8
}
```

**Phản hồi:**
```json
{
  "success": true,
  "message": "Cập nhật sản phẩm thành công",
  "data": {
    "id": "1",
    "name": "Laptop Gaming",
    "price": 18000000,
    "description": "Laptop gaming hiệu năng cao",
    "stock": 8,
    "updatedAt": "2026-03-17T10:35:00.000Z"
  }
}
```

---

### 5. PATCH - Cập nhật một phần sản phẩm
```
PATCH /api/products/1
Content-Type: application/json

{
  "stock": 12
}
```

**Phản hồi:**
```json
{
  "success": true,
  "message": "Cập nhật sản phẩm thành công",
  "data": {
    "id": "1",
    "name": "Laptop",
    "price": 15000000,
    "description": "Máy tính xách tay hiệu năng cao",
    "stock": 12,
    "updatedAt": "2026-03-17T10:40:00.000Z"
  }
}
```

---

### 6. DELETE - Xóa sản phẩm
```
DELETE /api/products/1
```

**Phản hồi:**
```json
{
  "success": true,
  "message": "Xóa sản phẩm thành công",
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

## 🧪 Kiểm Tra API bằng cURL

Mở Terminal hoặc PowerShell và chạy các lệnh sau:

### Lấy tất cả sản phẩm
```bash
curl http://localhost:3000/api/products
```

### Lấy một sản phẩm
```bash
curl http://localhost:3000/api/products/1
```

### Tạo sản phẩm mới
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Tablet\",\"price\":5000000,\"description\":\"Tablet 10 inch\",\"stock\":20}"
```

### Cập nhật sản phẩm
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Laptop Pro\",\"price\":20000000}"
```

### Cập nhật một phần
```bash
curl -X PATCH http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d "{\"stock\":50}"
```

### Xóa sản phẩm
```bash
curl -X DELETE http://localhost:3000/api/products/1
```

---

## 📱 Kiểm Tra với Postman

1. **Tải Postman**: https://www.postman.com/downloads/
2. **Tạo Collection mới**
3. **Thêm requests** như trên
4. **Nhấn Send** để kiểm tra

---

## 🏗️ Kiến Trúc RESTful

```
┌─────────────────────────────────────────┐
│           Client (Browser/App)          │
└──────────────┬──────────────────────────┘
               │ HTTP Request (GET/POST/PUT/DELETE)
               ▼
┌─────────────────────────────────────────┐
│        RESTful API Server (Express)     │
│  ┌─────────────────────────────────┐   │
│  │   Route Handler                 │   │
│  │  ├─ GET /api/products           │   │
│  │  ├─ POST /api/products          │   │
│  │  ├─ PUT /api/products/:id       │   │
│  │  ├─ DELETE /api/products/:id    │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │  Business Logic & Validation    │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │   Data Management               │   │
│  │  (In-memory array / Database)   │   │
│  └─────────────────────────────────┘   │
└──────────────┬──────────────────────────┘
               │ HTTP Response (JSON + Status Code)
               ▼
┌─────────────────────────────────────────┐
│           Client receives data          │
└─────────────────────────────────────────┘
```

---

## 💡 Điểm Chính

1. **Resources** được đặt tên bằng danh từ (products, users, posts)
2. **HTTP Methods** cho biết hành động (GET=lấy, POST=tạo, PUT/PATCH=sửa, DELETE=xóa)
3. **Status Codes** cho biết kết quả yêu cầu
4. **JSON Format** dễ làm việc với nhiều ngôn ngữ
5. **Stateless** - scalable và đơn giản

---

## 🚀 Tiếp Theo

- Thêm **Database** (MongoDB, PostgreSQL)
- Thêm **Authentication & Authorization**
- Thêm **Error Handling** nâng cao
- Thêm **Validation** chi tiết
- Thêm **API Documentation** (Swagger/OpenAPI)
- Thêm **Rate Limiting**
- Thêm **Caching**

---

## 📖 Tài Liệu Tham Khảo

- [REST API Best Practices](https://restfulapi.net/)
- [Express.js Documentation](https://expressjs.com/)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)
- [JSON API Specification](https://jsonapi.org/)

