# 🏗️ RESTful API Architecture Overview

## 1️⃣ Kiến Trúc Cơ Bản

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
│  ┌─────────────┐  ┌──────────┐  ┌─────────────────┐   │
│  │  Web App    │  │ Mobile   │  │  Desktop        │   │
│  │  (Browser)  │  │  (iOS)   │  │  (Windows)      │   │
│  └──────┬──────┘  └────┬─────┘  └────────┬────────┘   │
│         │              │                 │             │
│         └──────────────┬─────────────────┘             │
│                        │ HTTP Request                   │
│                        ▼                               │
└─────────────────────────────────────────────────────────┘
                         │
                ┌────────┴────────┐
                │ Internet/Network │
                └────────┬────────┘
                         │ HTTP Response
                         ▼
┌─────────────────────────────────────────────────────────┐
│               API SERVER LAYER (Express)                │
│  ┌──────────────────────────────────────────────────┐  │
│  │  REQUEST HANDLING                                │  │
│  │  ├─ Parse URL & Method (GET, POST, etc)        │  │
│  │  ├─ Parse Headers (authorization, etc)         │  │
│  │  └─ Parse Body (JSON data)                      │  │
│  └──────────────┬───────────────────────────────────┘  │
│                 │                                       │
│  ┌──────────────▼───────────────────────────────────┐  │
│  │  ROUTING                                         │  │
│  │  GET    /api/products   ─────→ Handler 1        │  │
│  │  POST   /api/products   ─────→ Handler 2        │  │
│  │  PUT    /api/products/:id ───→ Handler 3        │  │
│  │  DELETE /api/products/:id ───→ Handler 4        │  │
│  └──────────────┬───────────────────────────────────┘  │
│                 │                                       │
│  ┌──────────────▼───────────────────────────────────┐  │
│  │  MIDDLEWARE & VALIDATION                         │  │
│  │  ├─ JSON Parser                                  │  │
│  │  ├─ Authentication Check                        │  │
│  │  ├─ Data Validation                             │  │
│  │  └─ Error Handling                              │  │
│  └──────────────┬───────────────────────────────────┘  │
│                 │                                       │
│  ┌──────────────▼───────────────────────────────────┐  │
│  │  BUSINESS LOGIC                                  │  │
│  │  ├─ Create Product                              │  │
│  │  ├─ Find Product                                │  │
│  │  ├─ Update Product                              │  │
│  │  └─ Delete Product                              │  │
│  └──────────────┬───────────────────────────────────┘  │
│                 │                                       │
│  ┌──────────────▼───────────────────────────────────┐  │
│  │  RESPONSE GENERATION                            │  │
│  │  ├─ Status Code (200, 201, 404, etc)            │  │
│  │  ├─ Headers (Content-Type, etc)                 │  │
│  │  └─ JSON Body                                   │  │
│  └──────────────┬───────────────────────────────────┘  │
└─────────────────┼─────────────────────────────────────┘
                  │
┌─────────────────┴─────────────────────────────────────┐
│            DATA LAYER                                 │
│  ┌─────────────────────────────────────────────────┐ │
│  │  In-Memory Data (hay Database/File)              │ │
│  │  ┌─────────────┐  ┌──────────┐  ┌────────────┐ │ │
│  │  │ Products[]  │  │ Users[]  │  │ Orders[]   │ │ │
│  │  └─────────────┘  └──────────┘  └────────────┘ │ │
│  └─────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────┘
```

---

## 2️⃣ Request/Response Flow (Chi Tiết)

### GET Request - Lấy Tất Cả Sản Phẩm

```
┌─────────────────────────────────────────────────────────┐
│ STEP 1: CLIENT SENDS REQUEST                            │
├─────────────────────────────────────────────────────────┤
│ GET /api/products HTTP/1.1                              │
│ Host: localhost:3000                                    │
│ Accept: application/json                                │
│                                                          │
│ (No body cho GET request)                               │
└─┬───────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 2: SERVER RECEIVES REQUEST                         │
├─────────────────────────────────────────────────────────┤
│ ✅ Parse URL ➜ /api/products                           │
│ ✅ Identify Method ➜ GET                               │
│ ✅ Match Route ➜ app.get('/api/products', ...)         │
└─┬───────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 3: EXECUTE HANDLER                                 │
├─────────────────────────────────────────────────────────┤
│ app.get('/api/products', (req, res) => {                │
│   const products = [                                    │
│     { id: '1', name: 'Laptop', ... }                   │
│   ];                                                     │
│   res.status(200).json({                                │
│     success: true,                                      │
│     data: products                                      │
│   });                                                    │
│ });                                                      │
└─┬───────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 4: SERVER SENDS RESPONSE                           │
├─────────────────────────────────────────────────────────┤
│ HTTP/1.1 200 OK                                         │
│ Content-Type: application/json                          │
│                                                          │
│ {                                                        │
│   "success": true,                                      │
│   "data": [                                             │
│     { "id": "1", "name": "Laptop", ... }               │
│   ]                                                      │
│ }                                                        │
└─┬───────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 5: CLIENT RECEIVES RESPONSE                        │
├─────────────────────────────────────────────────────────┤
│ ✅ Status: 200 OK                                       │
│ ✅ Parse JSON                                           │
│ ✅ Update UI with data                                  │
│ ✅ Display products to user                             │
└─────────────────────────────────────────────────────────┘
```

### POST Request - Tạo Sản Phẩm Mới

```
┌─────────────────────────────────────────────────────────┐
│ STEP 1: CLIENT SENDS REQUEST                            │
├─────────────────────────────────────────────────────────┤
│ POST /api/products HTTP/1.1                             │
│ Host: localhost:3000                                    │
│ Content-Type: application/json                          │
│                                                          │
│ {                                                        │
│   "name": "Máy ảnh",                                    │
│   "price": 12000000,                                    │
│   "stock": 5                                            │
│ }                                                        │
└─┬───────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 2: SERVER RECEIVES & VALIDATES                     │
├─────────────────────────────────────────────────────────┤
│ ✅ Parse URL ➜ /api/products                           │
│ ✅ Identify Method ➜ POST                              │
│ ✅ Parse JSON body                                      │
│ ✅ Validate data:                                       │
│    - name exists? ✅                                    │
│    - price is positive? ✅                              │
│    - price is number? ✅                                │
└─┬───────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 3: PROCESS REQUEST                                 │
├─────────────────────────────────────────────────────────┤
│ ✅ Generate new ID (UUID)                               │
│ ✅ Create product object                                │
│ ✅ Add to products array                                │
│ const newProduct = {                                    │
│   id: '550e8400-e29b-41d4...',                         │
│   name: 'Máy ảnh',                                      │
│   price: 12000000,                                      │
│   stock: 5,                                             │
│   createdAt: '2026-03-17T...'                          │
│ };                                                       │
│ products.push(newProduct);                              │
└─┬───────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 4: SEND RESPONSE                                   │
├─────────────────────────────────────────────────────────┤
│ HTTP/1.1 201 Created                                    │
│ Content-Type: application/json                          │
│                                                          │
│ {                                                        │
│   "success": true,                                      │
│   "message": "Tạo sản phẩm thành công",                │
│   "data": {                                             │
│     "id": "550e8400-e29b-41d4...",                     │
│     "name": "Máy ảnh",                                  │
│     "price": 12000000,                                  │
│     "createdAt": "2026-03-17T..."                      │
│   }                                                      │
│ }                                                        │
└─┬───────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 5: CLIENT PROCESSES RESPONSE                       │
├─────────────────────────────────────────────────────────┤
│ ✅ Status 201? Yes, successfully created               │
│ ✅ Parse response JSON                                  │
│ ✅ Get new product ID                                   │
│ ✅ Add to UI, show success message                      │
└─────────────────────────────────────────────────────────┘
```

---

## 3️⃣ Ví Dụ Code Flow

### GET /api/products

```javascript
// Client gửi request
GET http://localhost:3000/api/products

// Server nhận
app.get('/api/products', (req, res) => {
  // 1. Validate (không cần, GET đơn giản)
  
  // 2. Get data
  const products = [
    { id: '1', name: 'Laptop', price: 15000000, ... }
  ];
  
  // 3. Set status code
  res.status(200);
  
  // 4. Return JSON
  res.json({
    success: true,
    message: 'Lấy danh sách sản phẩm thành công',
    data: products,
    total: products.length
  });
});

// Client nhận response
{
  "success": true,
  "message": "Lấy danh sách sản phẩm thành công",
  "data": [{ id: '1', name: 'Laptop', ... }],
  "total": 1
}
```

### POST /api/products

```javascript
// Client gửi request
POST http://localhost:3000/api/products
{
  "name": "Điện thoại",
  "price": 8000000
}

// Server nhận
app.post('/api/products', (req, res) => {
  const { name, price, description, stock } = req.body;
  
  // 1. Validate data
  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: 'Thiếu thông tin bắt buộc'
    });
  }
  
  if (price <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Giá phải là số dương'
    });
  }
  
  // 2. Create product
  const newProduct = {
    id: uuidv4(),
    name,
    price,
    description: description || '',
    stock: stock || 0,
    createdAt: new Date().toISOString()
  };
  
  // 3. Save to array (hay database)
  products.push(newProduct);
  
  // 4. Set status & return
  res.status(201).json({
    success: true,
    message: 'Tạo sản phẩm thành công',
    data: newProduct
  });
});

// Client nhận response (201)
{
  "success": true,
  "message": "Tạo sản phẩm thành công",
  "data": {
    "id": "550e8400...",
    "name": "Điện thoại",
    "price": 8000000,
    "createdAt": "2026-03-17T..."
  }
}
```

---

## 4️⃣ Error Handling Flow

```
┌─────────────────────────────────────┐
│ Client Request                      │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Server Validates                    │
├─────────────────────────────────────┤
│ ✅ Data valid?                      │
│ ├─ YES ──→ Process                 │
│ └─ NO  ──→ Return 400 Error        │
└──────┬──────────────────────────────┘
       │
       ├─ YES (Valid)
       │       ▼
       │   ┌────────────────────────┐
       │   │ Process Request        │
       │   │ ✅ Create/Read/Update  │
       │   │ ✅ Return 200/201      │
       │   └────────────────────────┘
       │
       └─ NO (Invalid)
               ▼
           ┌────────────────────────┐
           │ Return Error           │
           │ ❌ 400 Bad Request    │
           │ ❌ 404 Not Found      │
           │ ❌ 409 Conflict       │
           └────────────────────────┘
```

---

## 5️⃣ Database Integration (Tương Lai)

```
┌──────────────────────────────────────┐
│ Current: In-Memory Array             │
├──────────────────────────────────────┤
│ let products = [ {...}, {...} ]      │
│ Data mất khi server restart          │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ With Database: Persistent Storage    │
├──────────────────────────────────────┤
│ Server                               │
│   ├─ Route Handler                  │
│   ├─ Business Logic                 │
│   └─ Database Query                 │
│        ▼                             │
│   Database (MongoDB/PostgreSQL)      │
│   ├─ Products Collection/Table       │
│   ├─ Users Collection/Table          │
│   └─ Orders Collection/Table         │
│        ▼                             │
│   Persistent Storage (Disk)          │
│   Data tồn tại sau khi restart       │
└──────────────────────────────────────┘
```

---

## 🎯 Summary

**RESTful API hoạt động theo quy trình:**

1. **Client** gửi HTTP request (GET/POST/PUT/DELETE)
2. **Server** nhận và parse request
3. **Validation** kiểm tra dữ liệu
4. **Business Logic** xử lý yêu cầu
5. **Data Layer** lưu/lấy dữ liệu
6. **Response** trả về kết quả (JSON + Status Code)
7. **Client** nhận response và cập nhật UI

**Key Points:**
- Stateless (mỗi request độc lập)
- Resource-oriented (danh từ cho endpoints)
- HTTP methods rõ ràng (GET/POST/PUT/DELETE)
- Proper status codes (200/201/400/404/500)
- JSON format cho request/response

