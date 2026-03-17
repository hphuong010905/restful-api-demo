# 📖 RESTful API - Giải Thích Chi Tiết

## 🎯 RESTful API là gì?

**REST** = **Representational State Transfer**

RESTful API là một kiến trúc/cách thiết kế API dựa trên HTTP protocol, sử dụng các nguyên tắc chuẩn để làm cho API dễ hiểu, dễ sử dụng, và dễ bảo trì.

---

## 🏛️ 6 Nguyên Tắc RESTful

### 1. **Client-Server Architecture**
- Client (browser, mobile app) tách biệt với Server
- Họ giao tiếp qua HTTP
- Mỗi bên có thể phát triển độc lập

```
┌──────────────┐                    ┌──────────────┐
│  Client      │ ← HTTP Request →   │   Server     │
│  (Desktop)   │ ← HTTP Response ←  │  (API)       │
│  (Mobile)    │                    │              │
└──────────────┘                    └──────────────┘
```

### 2. **Statelessness** (Không Trạng Thái)
- Server không lưu thông tin về client
- Mỗi request chứa đầy đủ thông tin cần thiết
- Dễ scaling horizontal

❌ **Sai** - Lưu state:
```javascript
let isAuthenticated = false; // Toàn cục
app.get('/dashboard', (req, res) => {
  if (isAuthenticated) { // Phụ thuộc state toàn cục
    res.send('Dashboard');
  }
});
```

✅ **Đúng** - Không lưu state:
```javascript
app.get('/dashboard', (req, res) => {
  // Token gửi trong mỗi request
  const token = req.headers.authorization;
  if (verifyToken(token)) {
    res.send('Dashboard');
  }
});
```

### 3. **Uniform Interface** (Giao Diện Thống Nhất)
- Sử dụng HTTP methods chuẩn
- URL/URI rõ ràng và có nghĩa
- HATEOAS (liên kết tài nguyên)

| Resource | CREATE | READ | UPDATE | DELETE |
|----------|--------|------|--------|--------|
| Products | POST   | GET  | PUT    | DELETE |
| Users    | POST   | GET  | PUT    | DELETE |
| Orders   | POST   | GET  | PUT    | DELETE |

### 4. **Resource-Oriented** (Định Hướng Tài Nguyên)
- API tổ chức quanh **resources** (danh từ), không **actions** (động từ)
- Resources được xác định bằng URI

❌ **SAI - RPC Style (Động từ trong URL)**
```
/api/getProducts           → Tên là action
/api/createProduct
/api/updateProduct
/api/deleteProduct
```

✅ **ĐÚNG - RESTful Style (Danh từ trong URL)**
```
GET    /api/products           → Lấy tất cả
POST   /api/products           → Tạo mới
GET    /api/products/1         → Lấy một
PUT    /api/products/1         → Cập nhật
DELETE /api/products/1         → Xóa
```

### 5. **Cacheability** (Khả Năng Lưu Vào Cache)
- Responses nên được cache khi thích hợp
- Sử dụng HTTP cache headers
- Giảm tải server

```javascript
// Cache GET requests
app.get('/api/products', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600'); // 1 giờ
  res.json(products);
});
```

### 6. **Layered System** (Hệ Thống Phân Lớp)
- Có thể có nhiều lớp: API Gateway, Load Balancer, Cache, Database
- Client không biết trực tiếp nó kết nối với layer nào

```
┌─────────┐
│ Client  │
└────┬────┘
     │ HTTP Request
     ▼
┌─────────────────────┐
│  API Gateway        │
│  (Authentication)   │
└────┬────────────────┘
     │
     ▼
┌──────────────┐
│ Load Balancer│───┐
└──────────────┘   │
                   ├→ Server 1
                   ├→ Server 2
                   ├→ Server 3
```

---

## 🔄 HTTP Methods - CRUD Operations

### CREATE - Tạo Dữ Liệu
```
POST /api/products
{
  "name": "Laptop",
  "price": 15000000
}

Response: 201 Created
```

### READ - Đọc Dữ Liệu
```
GET /api/products           → Lấy tất cả
GET /api/products/1         → Lấy một
GET /api/products?page=1    → Lấy với filter

Response: 200 OK
```

### UPDATE - Sửa Dữ Liệu
```
PUT /api/products/1         → Cập nhật hoàn toàn
{
  "name": "Laptop Pro",
  "price": 20000000
}

PATCH /api/products/1       → Cập nhật một phần
{
  "price": 20000000
}

Response: 200 OK
```

### DELETE - Xóa Dữ Liệu
```
DELETE /api/products/1

Response: 200 OK hoặc 204 No Content
```

---

## 📊 HTTP Status Codes

### 2xx - Thành Công ✅

| Code | Tên | Ý Nghĩa |
|------|-----|---------|
| 200 | OK | Yêu cầu thành công, có dữ liệu trả về |
| 201 | Created | Resource mới được tạo (thường với POST) |
| 204 | No Content | Thành công nhưng không có body trả về |

### 4xx - Lỗi Client ❌

| Code | Tên | Ý Nghĩa | Ví Dụ |
|------|-----|---------|-------|
| 400 | Bad Request | Dữ liệu gửi không hợp lệ | Thiếu field, sai format |
| 401 | Unauthorized | Không xác thực (chưa login) | Quên gửi token |
| 403 | Forbidden | Xác thực rồi nhưng không có quyền | User không quyền xóa |
| 404 | Not Found | Resource không tồn tại | ID sản phẩm không có |
| 409 | Conflict | Xung đột dữ liệu | Tên sản phẩm đã tồn tại |

### 5xx - Lỗi Server ❌

| Code | Tên | Ý Nghĩa |
|------|-----|---------|
| 500 | Internal Server Error | Lỗi server chung |
| 503 | Service Unavailable | Server tạm thời không khả dụng |

---

## 🔐 Request/Response Structure

### Request
```javascript
{
  method: "POST",                    // HTTP method
  url: "/api/products",              // Endpoint
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer token"
  },
  body: {                           // Payload
    "name": "Laptop",
    "price": 15000000
  }
}
```

### Response
```javascript
{
  status: 201,                      // HTTP status
  headers: {
    "Content-Type": "application/json"
  },
  body: {
    "success": true,
    "message": "Tạo sản phẩm thành công",
    "data": {
      "id": "550e8400-e29b-41d4",
      "name": "Laptop",
      "price": 15000000,
      "createdAt": "2026-03-17T10:30:00Z"
    }
  }
}
```

---

## 🎯 Best Practices

### ✅ DO (NÊN LÀM)

```javascript
// 1. Sử dụng danh từ cho endpoints
GET /api/products              // ✅
GET /api/users/123/orders      // ✅

// 2. Sử dụng số nhiều
GET /api/products              // ✅
// KHÔNG dùng: GET /api/product

// 3. Sử dụng sub-resources hợp lý
GET /api/users/123/posts       // Lấy posts của user 123
GET /api/users/123/posts/456   // Lấy post 456 của user 123

// 4. Versioning API
GET /api/v1/products           // ✅ Version 1
GET /api/v2/products           // ✅ Version 2

// 5. Sử dụng query parameters cho filtering, sorting
GET /api/products?category=laptop&sort=price&order=asc

// 6. Trả về status codes phù hợp
app.post('/api/products', (req, res) => {
  // ... create product
  res.status(201).json(newProduct);  // ✅ 201 Created
});

// 7. Sử dụng consistent response format
{
  "success": true,
  "message": "...",
  "data": { /* actual data */ },
  "error": null
}
```

### ❌ DON'T (KHÔNG NÊN LÀM)

```javascript
// 1. Sử dụng động từ trong URL
GET /api/getProducts            // ❌
POST /api/createProduct         // ❌
PUT /api/updateProduct          // ❌

// 2. Sử dụng số ít
GET /api/product                // ❌

// 3. Lấy tất cả dữ liệu 1 lần (nếu có hàng triệu records)
GET /api/products               // ❌ Không pagination
// NÊN: GET /api/products?page=1&limit=10

// 4. Trả về status code sai
app.post('/api/products', (req, res) => {
  // ... create product
  res.status(200).json(newProduct);  // ❌ Nên 201
});

// 5. Response format không nhất quán
// Request 1: { data: [] }
// Request 2: { results: [] }
// Request 3: []  
// ❌ Không nhất quán

// 6. Sensitive data trong URL
GET /api/users/123/password     // ❌ Password không được lấy qua API
```

---

## 🔗 URL Structure Tốt

```
┌─────────────────────────────────────────────┐
│  BASE_URL / VERSION / RESOURCE / ID / ACTION │
│     ↓          ↓         ↓        ↓    ↓     │
│  http://api.example.com/v1/products/123/reviews
│                             └────┬────┘ └──┬──┘
│                           Resource   Sub-resource
```

**Ví dụ thực tế:**
```
GET    /api/v1/users                 # Lấy tất cả users
POST   /api/v1/users                 # Tạo user mới
GET    /api/v1/users/123             # Lấy user 123
PUT    /api/v1/users/123             # Cập nhật user 123
DELETE /api/v1/users/123             # Xóa user 123

GET    /api/v1/users/123/posts       # Lấy posts của user 123
POST   /api/v1/users/123/posts       # Tạo post mới cho user 123
GET    /api/v1/users/123/posts/456   # Lấy post 456 của user 123
```

---

## 🧠 Ví Dụ Thực Tế: Social Media API

```javascript
// USERS
POST   /api/v1/users                 // Đăng ký
GET    /api/v1/users/me              // Lấy info hiện tại
PUT    /api/v1/users/me              // Cập nhật profile
DELETE /api/v1/users/me              // Xóa account

// POSTS
GET    /api/v1/posts                 // Feed
POST   /api/v1/posts                 // Tạo post
GET    /api/v1/posts/123             // Chi tiết post
PUT    /api/v1/posts/123             // Sửa post
DELETE /api/v1/posts/123             // Xóa post

// COMMENTS
GET    /api/v1/posts/123/comments    // Comments của post
POST   /api/v1/posts/123/comments    // Bình luận
DELETE /api/v1/posts/123/comments/456 // Xóa comment

// LIKES
POST   /api/v1/posts/123/likes       // Like post
DELETE /api/v1/posts/123/likes       // Unlike post

// FOLLOWERS
GET    /api/v1/users/123/followers   // Danh sách followers
POST   /api/v1/users/123/follow      // Follow user
DELETE /api/v1/users/123/follow      // Unfollow user
```

---

## 📈 Comparison: RPC vs REST

### RPC Style (❌ Cũ)
```
GET  /api/getUsers
POST /api/createUser
POST /api/updateUser
POST /api/deleteUser
GET  /api/getUserById
```

### RESTful Style (✅ Mới)
```
GET    /api/users        // Lấy tất cả
POST   /api/users        // Tạo
GET    /api/users/:id    // Lấy một
PUT    /api/users/:id    // Cập nhật
DELETE /api/users/:id    // Xóa
```

**Lợi ích của RESTful:**
- ✅ Nhất quán
- ✅ Dễ nhớ
- ✅ Dễ test
- ✅ Dễ maintain
- ✅ Chuẩn quốc tế

---

## 🚀 Tiếp Theo

1. **Authentication** - Thêm login/token
2. **Authorization** - Kiểm tra quyền hạn
3. **Database** - Lưu dữ liệu thật
4. **Validation** - Kiểm tra input
5. **Documentation** - Viết docs (Swagger)
6. **Testing** - Viết unit test
7. **Error Handling** - Xử lý lỗi toàn diện
8. **Pagination** - Phân trang dữ liệu
9. **Rate Limiting** - Giới hạn request
10. **Caching** - Tối ưu performance

---

**Bạn đã hiểu nguyên tắc RESTful API rồi! 🎉**

