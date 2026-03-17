# 🔧 FIX LỖI GIT - Hướng Dẫn Chi Tiết

Lỗi: **"fatal: not a git repository"**

---

## ❌ NGUYÊN NHÂN

`d:\demo` chưa được:
1. ✗ Init git
2. ✗ Kết nối với GitHub repo

---

## ✅ CÁCH FIX

### Bước 1: Mở PowerShell

```powershell
cd d:\demo
```

### Bước 2: Xóa Git Cũ (Nếu Có)

```powershell
# Xóa thư mục .git cũ (nếu tồn tại)
rm -r .git -Force
```

### Bước 3: Init Git Mới

```powershell
# Khởi tạo git repository
git init
```

**Output:**
```
Initialized empty Git repository in d:\demo\.git\
```

### Bước 4: Cấu Hình Git

```powershell
# Set tên người dùng
git config user.name "hphuong010905"

# Set email
git config user.email "your-email@gmail.com"
```

### Bước 5: Add Tất Cả File

```powershell
git add .
```

### Bước 6: Commit

```powershell
git commit -m "Initial commit"
```

**Output:**
```
[main (root-commit) abc1234] Initial commit
 5 files changed, 234 insertions(+)
 create mode 100644 server.js
 create mode 100644 package.json
 create mode 100644 README.md
 ...
```

### Bước 7: Add Remote GitHub

```powershell
# Thay URL thành repo của bạn
git remote add origin https://github.com/hphuong010905/restful-api-demo.git
```

### Bước 8: Rename Branch Thành main (Nếu Cần)

```powershell
git branch -M main
```

### Bước 9: Push Lên GitHub

```powershell
git push -u origin main
```

**Chờ khoảng 10-30 giây...**

**Output:**
```
Enumerating objects: 8, done.
Counting objects: 100% (8/8), done.
Delta compression using up to 8 threads.
Compressing objects: 100% (7/7), done.
Writing objects: 100% (8/8), ...
remote: 
remote: Create a pull request for 'main' on GitHub by visiting:
remote:   https://github.com/hphuong010905/restful-api-demo/pull/new/main
remote:
To https://github.com/hphuong010905/restful-api-demo.git
 * [new branch]      main -> main
```

✅ **Thành công!**

---

## ✔️ VERIFY - KIỂM TRA

### Check Local

```powershell
# Xem status
git status
# Output: On branch main - nothing to commit

# Xem remote
git remote -v
# Output: origin  https://github.com/hphuong010905/restful-api-demo.git (fetch)
#         origin  https://github.com/hphuong010905/restful-api-demo.git (push)

# Xem log
git log --oneline
# Output: abc1234 Initial commit
```

### Check GitHub

Vào: https://github.com/hphuong010905/restful-api-demo

Sẽ thấy files:
- ✅ server.js
- ✅ package.json
- ✅ README.md
- ✅ .gitignore

---

## 📝 FULL COMMANDS - COPY PASTE

**Dán toàn bộ vào PowerShell:**

```powershell
cd d:\demo
rm -r .git -Force
git init
git config user.name "hphuong010905"
git config user.email "your-email@gmail.com"
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/hphuong010905/restful-api-demo.git
git branch -M main
git push -u origin main
```

**Sau khi chạy xong, kiểm tra:**
```powershell
git status
git remote -v
```

---

## 🆘 LỖI KHÁC CÓ THỂ GẶP

### ❓ "Permission denied (publickey)"

**Nguyên nhân:** SSH key không được set

**Giải pháp:** Dùng HTTPS thay SSH
```powershell
git remote set-url origin https://github.com/hphuong010905/restful-api-demo.git
git push -u origin main
```

Postman sẽ hỏi username/password GitHub.

---

### ❓ "fatal: Could not read from remote repository"

**Nguyên nhân:** URL sai

**Giải pháp:** Check URL
```powershell
# Xem current URL
git remote -v

# Thay URL đúng
git remote set-url origin https://github.com/hphuong010905/restful-api-demo.git
```

---

### ❓ "branch 'main' set up to track 'origin/main'"

**Điều này tốt!** Nghĩa là push thành công.

---

## 🎯 RECAP - LÀM THỬ

```
1. cd d:\demo
   ↓
2. rm -r .git -Force
   ↓
3. git init
   ↓
4. git config user.name "hphuong010905"
   ↓
5. git config user.email "your-email@example.com"
   ↓
6. git add .
   ↓
7. git commit -m "Initial commit"
   ↓
8. git remote add origin https://github.com/hphuong010905/restful-api-demo.git
   ↓
9. git branch -M main
   ↓
10. git push -u origin main
   ↓
✅ DONE!
```

---

## ✅ SAU KHI FIX

Bây giờ bạn có thể:

1. Chỉnh `server.js`
2. Push lên GitHub
3. Deploy Render

```powershell
# Chỉnh file
# ... sửa server.js ...

# Sau đó:
git add server.js
git commit -m "Fix PORT for Render"
git push
```

---

**Chạy commands trên & báo cho mình know kết quả? 🚀**

