# 🎯 Hướng Dẫn Chi Tiết: Chạy Code & Sử Dụng Postman

## ✅ PHẦN 1: CHẠY CODE

### Step 1: Mở PowerShell/Terminal

1. Nhấn **Windows Key + R**
2. Gõ `powershell` và nhấn **Enter**
3. Hoặc mở **VS Code** → Nhấn **Ctrl + `** (backtick) để mở Terminal

### Step 2: Điều Hướng Đến Thư Mục

```powershell
cd d:\demo
```

**Output:**
```
PS D:\demo>
```

### Step 3: Kiểm Tra Node.js Đã Cài?

```powershell
node --version
npm --version
```

**Nếu không có:** Tải từ https://nodejs.org (phiên bản LTS)

### Step 4: Cài Đặt Dependencies

```powershell
npm install
```

**Output:**
```
added 64 packages in 3s
```

Điều này sẽ tạo thư mục `node_modules/` chứa Express, UUID, v.v.

### Step 5: Chạy Server

```powershell
npm start
```

**Output:**
```
┌════════════════════════════════════════┐
║   RESTful API Server Running! 🚀       ║
║   Truy cập: http://localhost:3000      ║
║   Dùng Postman hoặc curl để test       ║
╚════════════════════════════════════════╝
```

✅ **Server đang chạy!** Giữ Terminal này mở.

### Step 6: Dừng Server

Nhấn **Ctrl + C** trong Terminal

---

## 🎯 PHẦN 2: POSTMAN - HƯỚNG DẪN CỤ THỂ

### Bước 1: Tải & Cài Postman

1. Truy cập: https://www.postman.com/downloads/
2. Chọn **Windows**
3. Chạy file cài đặt
4. Mở Postman

### Bước 2: Tạo Workspace Mới

1. Mở Postman
2. Chọn **"File"** → **"New"** → **"Workspace"**
3. Đặt tên: `RESTful API Demo`
4. Nhấn **Create**

### Bước 3: Tạo Collection

1. Nhấn **"Collections"** (bên trái)
2. Nhấn **"+"** hoặc **"Create New Collection"**
3. Đặt tên: `Products API`
4. Nhấn **Create**

---

## 📝 TEST TỪNG API ENDPOINT

### ✅ TEST 1: GET - Lấy Tất Cả Sản Phẩm

**Step 1:** Tạo request mới
- Click **"+"** tab ở trên
- Hoặc **Ctrl + T**

**Step 2:** Chọn Method & URL
```
Method: GET
URL: http://localhost:3000/api/products
```

**Step 3:** Nhấn **Send** (hoặc Ctrl + Enter)

**Kết quả:**
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

✅ **HTTP 200 OK**

---

### ✅ TEST 2: GET - Lấy Một Sản Phẩm

**Step 1:** Tạo request mới
```
Method: GET
URL: http://localhost:3000/api/products/1
```

**Step 2:** Nhấn **Send**

**Kết quả:**
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

✅ **HTTP 200 OK**

---

### ✅ TEST 3: POST - Tạo Sản Phẩm Mới

**Step 1:** Tạo request mới
```
Method: POST
URL: http://localhost:3000/api/products
```

**Step 2:** Chọn tab **"Headers"**
- Thêm header:
  ```
  Key: Content-Type
  Value: application/json
  ```

**Step 3:** Chọn tab **"Body"**
- Click **"raw"**
- Chọn **"JSON"** từ dropdown
- Nhập JSON:
  ```json
  {
    "name": "Máy ảnh",
    "price": 12000000,
    "description": "Máy ảnh DSLR chuyên nghiệp",
    "stock": 5
  }
  ```

**Step 4:** Nhấn **Send**

**Kết quả:**
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

✅ **HTTP 201 Created**

---

### ✅ TEST 4: POST - Tạo Với Dữ Liệu Sai (Lỗi)

**Step 1:** Request mới
```
Method: POST
URL: http://localhost:3000/api/products
```

**Step 2:** Body:
```json
{
  "name": "Sản phẩm",
  "price": -5000
}
```

**Step 3:** Nhấn **Send**

**Kết quả (Lỗi):**
```json
{
  "success": false,
  "message": "Giá phải là số dương",
  "error": "INVALID_PRICE"
}
```

❌ **HTTP 400 Bad Request**

---

### ✅ TEST 5: PUT - Cập Nhật Sản Phẩm (Hoàn Chỉnh)

**Step 1:** Request mới
```
Method: PUT
URL: http://localhost:3000/api/products/1
```

**Step 2:** Headers: `Content-Type: application/json`

**Step 3:** Body:
```json
{
  "name": "Laptop Gaming",
  "price": 18000000,
  "description": "Laptop gaming hiệu năng cao",
  "stock": 8
}
```

**Step 4:** Nhấn **Send**

**Kết quả:**
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

✅ **HTTP 200 OK**

---

### ✅ TEST 6: PATCH - Cập Nhật Một Phần

**Step 1:** Request mới
```
Method: PATCH
URL: http://localhost:3000/api/products/1
```

**Step 2:** Headers: `Content-Type: application/json`

**Step 3:** Body (chỉ stock, không cần cả dữ liệu):
```json
{
  "stock": 20
}
```

**Step 4:** Nhấn **Send**

**Kết quả:**
```json
{
  "success": true,
  "message": "Cập nhật sản phẩm thành công",
  "data": {
    "id": "1",
    "name": "Laptop",
    "price": 15000000,
    "description": "Máy tính xách tay hiệu năng cao",
    "stock": 20,
    "updatedAt": "2026-03-17T10:40:00.000Z"
  }
}
```

✅ **HTTP 200 OK**

---

### ✅ TEST 7: DELETE - Xóa Sản Phẩm

**Step 1:** Request mới
```
Method: DELETE
URL: http://localhost:3000/api/products/1
```

**Step 2:** Không cần headers hoặc body

**Step 3:** Nhấn **Send**

**Kết quả:**
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

✅ **HTTP 200 OK**

---

### ✅ TEST 8: GET - Sản Phẩm Không Tồn Tại (Lỗi)

**Step 1:** Request mới
```
Method: GET
URL: http://localhost:3000/api/products/999
```

**Step 2:** Nhấn **Send**

**Kết quả (Lỗi):**
```json
{
  "success": false,
  "message": "Sản phẩm không tồn tại",
  "error": "NOT_FOUND"
}
```

❌ **HTTP 404 Not Found**

---

## 📊 BẢNG TỔNG HỢP

| Test | Method | URL | Body | Status | Kỳ Vọng |
|------|--------|-----|------|--------|---------|
| 1 | GET | /api/products | - | 200 | Danh sách 3 sản phẩm |
| 2 | GET | /api/products/1 | - | 200 | Chi tiết 1 sản phẩm |
| 3 | POST | /api/products | Dữ liệu mới | 201 | Tạo sản phẩm mới |
| 4 | POST | /api/products | Giá âm | 400 | Lỗi validation |
| 5 | PUT | /api/products/1 | Dữ liệu mới | 200 | Cập nhật đầy đủ |
| 6 | PATCH | /api/products/1 | stock: 20 | 200 | Cập nhật stock |
| 7 | DELETE | /api/products/1 | - | 200 | Xóa sản phẩm |
| 8 | GET | /api/products/999 | - | 404 | Không tìm thấy |

---

## 💾 TIPS POSTMAN

### ✨ Lưu Request Vào Collection

Khi đã tạo request, nhấn **Save** (Ctrl + S):
- Chọn **Products API** collection
- Đặt tên request (vd: "GET All Products")
- Click **Save**

Lần sau dùng lại mà không phải gõ lại!

### ✨ Dùng Variables

1. Vào **Collections** → **Products API** → **Variables**
2. Thêm variable:
   - **Name:** baseUrl
   - **Current Value:** http://localhost:3000
3. Sử dụng trong URL: `{{baseUrl}}/api/products`

### ✨ Pre-request Script

Để thêm timestamp tự động. Tab **Pre-request Script**:
```javascript
pm.environment.set("timestamp", Date.now());
```

### ✨ Tests (Kiểm Tra Tự Động)

Tab **Tests**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has success property", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.true;
});
```

---

## 🎓 Quy Trình Toàn Bộ

```
1️⃣  Mở PowerShell
    ↓
2️⃣  cd d:\demo
    ↓
3️⃣  npm install
    ↓
4️⃣  npm start (giữ mở)
    ↓
5️⃣  Mở Postman (Terminal khác)
    ↓
6️⃣  GET http://localhost:3000/api/products
    ↓
7️⃣  Nhấn Send
    ↓
8️⃣  Xem Result
    ✅ Thành công!
```

---

## 🐛 TROUBLESHOOTING

### ❓ "Port 3000 is already in use"

```powershell
# Tìm process chiếm port 3000
netstat -ano | findstr :3000

# Kill process (thay PID)
taskkill /PID 12345 /F
```

### ❓ "Cannot find module 'express'"

```powershell
# Cài lại
rm -r node_modules
npm install
```

### ❓ Server không respond

- Check xem server có **chạy** trong Terminal kia?
- Nhấn Ctrl+C và chạy lại `npm start`
- Check URL có đúng không (http://localhost:3000)

### ❓ POST không hoạt động

- Headers phải có: `Content-Type: application/json`
- Body phải là JSON hợp lệ (không quote quanh)
- Kiểm tra console nó báo gì

---

## ✅ XONG!

Bây giờ bạn biết:
✅ Cách chạy code
✅ Cách sử dụng Postman
✅ Cách test tất cả endpoints
✅ Cách xử lý lỗi

**Tiếp theo:** Thêm database, authentication, deployment... 🚀

