# 🚀 DEPLOY LÊN RENDER - HƯỚNG DẪN CHI TIẾT

Repo của bạn: `https://github.com/hphuong010905/restful-api-demo`

---

## ✅ BƯỚC 1: ĐẨY CODE LÊN GITHUB

### Nếu chưa push code:

```powershell
# 1. Mở PowerShell trong thư mục d:\demo
cd d:\demo

# 2. Git init & push (nếu chưa)
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/hphuong010905/restful-api-demo.git
git branch -M main
git push -u origin main
```

### ✅ Check xem code đã lên GitHub chưa:
Vào: https://github.com/hphuong010905/restful-api-demo

Nên thấy các file:
- server.js
- package.json
- README.md
- .gitignore

---

## 🎯 BƯỚC 2: CHỈNH SERVER.JS (QUAN TRỌNG!)

Mở `server.js` và tìm dòng:
```javascript
const PORT = 3000;
```

**Thay thành:**
```javascript
const PORT = process.env.PORT || 3000;
```

**Giải thích:** Render sẽ set PORT tự động, code này cho phép nhận PORT từ môi trường hoặc dùng 3000 nếu không có.

**Push lại GitHub:**
```powershell
git add server.js
git commit -m "Fix PORT for Render deployment"
git push
```

---

## 🌐 BƯỚC 3: ĐĂNG KÝ RENDER

1. Vào: https://render.com
2. Click **"Sign up"** (hoặc **"Sign in with GitHub"**)
3. Chọn **"I'll create an account with my email"** hoặc dùng GitHub
4. Điền email, password
5. Nhấn **"Create account"**

✅ Bạn sẽ vào dashboard

---

## 🚀 BƯỚC 4: DEPLOY SERVICE

### Step 1: Tạo Web Service Mới

1. Nhấn **"New +"** (góc trên phải)
2. Chọn **"Web Service"**

![Step 1](https://via.placeholder.com/600x300?text=Click+New+Web+Service)

### Step 2: Kết Nối GitHub

1. Nhấn **"Connect repository"**
2. Nhấn **"Connect GitHub"**
3. Authorize Render truy cập GitHub (nhấn "Authorize")
4. Chọn repo: **`restful-api-demo`**

![Step 2](https://via.placeholder.com/600x300?text=Select+Repository)

### Step 3: Cấu Hình Deploy

Điền các thông tin sau:

```
┌─────────────────────────────────────────┐
│ Name: restful-api-demo                  │
├─────────────────────────────────────────┤
│ Environment: Node                       │
├─────────────────────────────────────────┤
│ Build Command: npm install              │
├─────────────────────────────────────────┤
│ Start Command: npm start                │
├─────────────────────────────────────────┤
│ Instance Type: Free                     │
└─────────────────────────────────────────┘
```

**Hình ảnh:**

```
┌─ Name ──────────────────────────────────┐
│ restful-api-demo                        │
└─────────────────────────────────────────┘

┌─ Environment ───────────────────────────┐
│ [Node ▼]                                │
└─────────────────────────────────────────┘

┌─ Build Command ─────────────────────────┐
│ npm install                             │
└─────────────────────────────────────────┘

┌─ Start Command ─────────────────────────┐
│ npm start                               │
└─────────────────────────────────────────┘

┌─ Instance Type ─────────────────────────┐
│ Free (with auto-shutdown)               │
└─────────────────────────────────────────┘
```

### Step 4: Deploy

1. Nhấn **"Create Web Service"** (góc dưới cùng)
2. **Chờ 2-3 phút...**

Render sẽ:
- ✅ Build lại code (`npm install`)
- ✅ Chạy server (`npm start`)
- ✅ Tạo URL công cộng

---

## 📍 BƯỚC 5: LẤY URL ONLINE

Khi deploy xong, bạn sẽ thấy screen như này:

```
┌──────────────────────────────────┐
│ ✅ Live                          │
│                                  │
│ Service URL:                     │
│ https://restful-api-demo.       │
│ onrender.com                     │
│                                  │
│ Logs:                            │
│ Server listening on port 3000    │
└──────────────────────────────────┘
```

**Copy URL:** `https://restful-api-demo.onrender.com`

✅ **API của bạn đã online!** 🎉

---

## 🧪 BƯỚC 6: TEST BẰNG POSTMAN

### Test 1: GET - Lấy Tất Cả

```
Method: GET
URL: https://restful-api-demo.onrender.com/api/products
```

Nhấn **Send**

**Response:**
```json
{
  "success": true,
  "message": "Lấy danh sách sản phẩm thành công",
  "data": [
    {"id": "1", "name": "Laptop", "price": 15000000, ...},
    {"id": "2", "name": "Điện thoại", "price": 8000000, ...}
  ]
}
```

✅ **HTTP 200 OK**

---

### Test 2: POST - Tạo Sản Phẩm

```
Method: POST
URL: https://restful-api-demo.onrender.com/api/products
Headers: Content-Type: application/json
Body:
{
  "name": "Chuột gaming",
  "price": 1000000,
  "stock": 100
}
```

Nhấn **Send** → **HTTP 201 Created**

---

### Test 3: PUT - Cập Nhật

```
Method: PUT
URL: https://restful-api-demo.onrender.com/api/products/1
Headers: Content-Type: application/json
Body:
{
  "name": "Laptop Gaming Pro",
  "price": 25000000
}
```

Nhấn **Send** → **HTTP 200 OK**

---

### Test 4: DELETE - Xóa

```
Method: DELETE
URL: https://restful-api-demo.onrender.com/api/products/1
```

Nhấn **Send** → **HTTP 200 OK**

---

## 📊 SUMMARY - HOÀN THÀNH

| Bước | Việc Làm | Status |
|------|---------|--------|
| 1 | Push code lên GitHub | ✅ |
| 2 | Chỉnh PORT trong server.js | ⏳ TODO |
| 3 | Đăng ký Render | ⏳ TODO |
| 4 | Deploy Web Service | ⏳ TODO |
| 5 | Lấy URL | ⏳ TODO |
| 6 | Test Postman | ⏳ TODO |

---

## ⚡ QUICK CHECKLIST

- [ ] FILE server.js LÀM HỎI **PORT = process.env.PORT || 3000**?
- [ ] Push lên GitHub?
- [ ] Đăng ký Render?
- [ ] Deploy Web Service?
- [ ] Lấy URL online?
- [ ] Test bằng Postman?

---

## 🆘 TROUBLESHOOTING

### ❓ "Deployment failed"

**Nguyên nhân: package.json không có**

**Giải pháp:**
```powershell
git add package.json
git commit -m "Add package.json"
git push
# Render sẽ deploy lại tự động
```

---

### ❓ "Application failed to start"

**Nguyên nhân: PORT không được set đúng**

**Giải pháp:** Chỉnh `server.js`:
```javascript
const PORT = process.env.PORT || 3000;
```

Push lên GitHub, Render deploy lại.

---

### ❓ "Cannot find module 'express'"

**Nguyên nhân: package.json bị lỗi**

**Giải pháp:** Check `package.json` có `"express"` trong dependencies?

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "uuid": "^9.0.0"
  }
}
```

---

### ❓ Render database sleep (15 phút không dùng)

Render Free tier auto-sleep. Giải pháp:
- Upgrade tier ($7/tháng)
- Hoặc dùng Railway ($5/tháng tài khoản)

---

## 📞 LIÊN HỆ

Nếu cần help:
1. Check Render dashboard → **"Logs"**
2. Xem error message
3. Thủ lại các bước

---

## 🎉 TIẾP THEO?

API của bạn đang online! Còn:

✅ Chia sẻ URL cho bạn bè test  
✅ Thêm database (MongoDB)  
✅ Thêm authentication  
✅ Add CORS headers  
✅ Custom domain  

---

**Bạn sẵn sàng deploy chưa? 🚀**

