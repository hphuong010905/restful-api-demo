# 🧪 CURL Examples - Kiểm Tra RESTful API

Hướng dẫn chi tiết các câu lệnh curl để kiểm tra API. 

**Lưu ý**: Mở PowerShell hoặc Command Prompt, chắc chắn server đang chạy tại `http://localhost:3000`

---

## 📋 Danh Sách Các Ví Dụ

### 1️⃣ GET - Lấy tất cả sản phẩm (READ ALL)

```bash
curl http://localhost:3000/api/products
```

**Giải thích:**
- **Method**: GET
- **URL**: /api/products  
- **Kỳ vọng**: HTTP 200 OK, trả về danh sách tất cả sản phẩm
- **Usecase**: Hiển thị danh sách sản phẩm trên trang chủ

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
    },
    {
      "id": "2",
      "name": "Điện thoại",
      "price": 8000000,
      "description": "Smartphone cao cấp",
      "stock": 25
    },
    {
      "id": "3",
      "name": "Đồng hồ thông minh",
      "price": 3000000,
      "description": "Smartwatch Android",
      "stock": 15
    }
  ],
  "total": 3,
  "skip": 0,
  "limit": 10
}
```

---

### 2️⃣ GET với Pagination - Lấy sản phẩm có phân trang

```bash
curl "http://localhost:3000/api/products?skip=0&limit=2"
```

**Giải thích:**
- **Query Parameters**: `skip=0&limit=2`
  - `skip`: bỏ qua 0 sản phẩm
  - `limit`: lấy 2 sản phẩm
- **Usecase**: Hiển thị danh sách sản phẩm theo trang

---

### 3️⃣ GET - Lấy một sản phẩm theo ID (READ ONE)

```bash
curl http://localhost:3000/api/products/1
```

**Giải thích:**
- **Method**: GET
- **URL**: /api/products/1 (ID = 1)
- **Kỳ vọng**: HTTP 200 OK, trả về chi tiết sản phẩm

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

### 4️⃣ GET - Lấy sản phẩm không tồn tại (ERROR 404)

```bash
curl http://localhost:3000/api/products/999
```

**Kỳ vọng**: HTTP 404 Not Found

**Phản hồi:**
```json
{
  "success": false,
  "message": "Sản phẩm không tồn tại",
  "error": "NOT_FOUND"
}
```

---

### 5️⃣ POST - Tạo sản phẩm mới (CREATE)

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Máy ảnh\",\"price\":12000000,\"description\":\"Máy ảnh DSLR chuyên nghiệp\",\"stock\":5}"
```

**Hoặc dùng tệp JSON:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d @product.json
```

**Giải thích:**
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body**: JSON object chứa dữ liệu sản phẩm mới
- **Kỳ vọng**: HTTP 201 Created, trả về sản phẩm vừa tạo với ID mới

**Phản hồi:**
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

### 6️⃣ POST - Tạo sản phẩm với dữ liệu không hợp lệ (ERROR 400)

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Sản phẩm\",\"price\":-5000}"
```

**Kỳ vọng**: HTTP 400 Bad Request - Giá phải là số dương

**Phản hồi:**
```json
{
  "success": false,
  "message": "Giá phải là số dương",
  "error": "INVALID_PRICE"
}
```

---

### 7️⃣ POST - Tạo sản phẩm thiếu trường bắt buộc

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Sản phẩm\"}"
```

**Kỳ vọng**: HTTP 400 Bad Request - Thiếu field price

---

### 8️⃣ PUT - Cập nhật toàn bộ sản phẩm (UPDATE)

```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Laptop Gaming\",\"price\":18000000,\"description\":\"Laptop gaming hiệu năng cao\",\"stock\":8}"
```

**Giải thích:**
- **Method**: PUT
- **URL**: /api/products/1 (sửa sản phẩm ID = 1)
- **Body**: Dữ liệu mới đầy đủ
- **Kỳ vọng**: HTTP 200 OK, trả về sản phẩm đã cập nhật

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

### 9️⃣ PATCH - Cập nhật một phần sản phẩm (PARTIAL UPDATE)

```bash
curl -X PATCH http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d "{\"stock\":12}"
```

**Giải thích:**
- **Method**: PATCH (khác với PUT)
- **Body**: Chỉ gửi trường cần cập nhật
- **Kỳ vọng**: HTTP 200 OK, chỉ cập nhật field stock

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

**PUT vs PATCH:**
| PUT | PATCH |
|-----|-------|
| Cập nhật TOÀN BỘ resource | Cập nhật MỘT PHẦN |
| Phải gửi đầy đủ dữ liệu | Chỉ gửi field cần sửa |
| Thường dùng cho form hoàn chỉnh | Dùng cho cập nhật nhỏ |

---

### 🔟 DELETE - Xóa sản phẩm (DELETE)

```bash
curl -X DELETE http://localhost:3000/api/products/1
```

**Giải thích:**
- **Method**: DELETE
- **URL**: /api/products/1 (xóa sản phẩm ID = 1)
- **Kỳ vọng**: HTTP 200 OK, trả về sản phẩm đã xóa

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

### 1️⃣1️⃣ DELETE - Xóa sản phẩm không tồn tại

```bash
curl -X DELETE http://localhost:3000/api/products/999
```

**Kỳ vọng**: HTTP 404 Not Found - Sản phẩm không tồn tại

---

## 🔗 Sơ Đồ Luồng Hoạt Động

```
┌─────────────── REST API Request/Response ──────────────┐
│                                                         │
│  Client Request              Server Processing         │
│  ─────────────────────────── ─────────────────────    │
│                                                        │
│  GET /products/1      →      Find product(1)          │
│                              ↓ Found                  │
│                             Return product           │
│  ← HTTP 200 + JSON                                    │
│                                                        │
│  POST /products       →      Validate data           │
│  (name, price, ...)         ↓ Valid                  │
│                             Create & Save            │
│  ← HTTP 201 + JSON                                    │
│                                                        │
│  PUT /products/1      →      Find & Validate         │
│  (new data)                 ↓ Found & Valid          │
│                             Update                   │
│  ← HTTP 200 + JSON                                    │
│                                                        │
│  DELETE /products/1   →      Find & Delete           │
│                             ↓ Found                  │
│                             Remove                   │
│  ← HTTP 200 + JSON                                    │
│                                                        │
└─────────────────────────────────────────────────────┘
```

---

## 💾 Tạo Tệp product.json

Tạo file `product.json` để dùng với curl:

```json
{
  "name": "Bàn phím cơ học",
  "price": 2500000,
  "description": "Bàn phím gaming RGB",
  "stock": 30
}
```

Rồi chạy:
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d @product.json
```

---

## 📊 HTTP Status Codes Sử Dụng

| Code | Tên | Ý Nghĩa | Ví Dụ |
|------|-----|---------|-------|
| 200 | OK | Yêu cầu thành công | GET sản phẩm thành công |
| 201 | Created | Resource được tạo | POST tạo sản phẩm mới |
| 400 | Bad Request | Dữ liệu không hợp lệ | Giá là số âm |
| 404 | Not Found | Resource không tồn tại | Xóa ID không tồn tại |
| 500 | Server Error | Lỗi server | Crash database |

---

## 🎓 Bài Học Từ Ví Dụ Này

✅ **Stateless**: Mỗi request độc lập, không phụ thuộc request trước  
✅ **Resource-oriented**: Sử dụng danh từ (products), không dùng động từ  
✅ **HTTP Methods**: GET/POST/PUT/PATCH/DELETE rõ ràng  
✅ **Status Codes**: Cho biết kết quả yêu cầu  
✅ **JSON Format**: Dễ parse và quốc tế hóa  
✅ **Validation**: Kiểm tra dữ liệu trước xử lý  
✅ **Error Handling**: Trả về lỗi chi tiết  

---

**Happy Learning! 🚀**

