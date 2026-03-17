const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// ============================================
// DỮ LIỆU MẪU - Trong thực tế sử dụng Database
// ============================================
let products = [
  {
    id: '1',
    name: 'Laptop',
    price: 15000000,
    description: 'Máy tính xách tay hiệu năng cao',
    stock: 10
  },
  {
    id: '2',
    name: 'Điện thoại',
    price: 8000000,
    description: 'Smartphone cao cấp',
    stock: 25
  },
  {
    id: '3',
    name: 'Đồng hồ thông minh',
    price: 3000000,
    description: 'Smartwatch Android',
    stock: 15
  }
];

// ============================================
// NGUYÊN TẮC RESTful API
// ============================================
// 1. Sử dụng danh từ (nouns) cho resources, không dùng động từ
// 2. Sử dụng HTTP methods: GET, POST, PUT, DELETE
// 3. Trả về mã trạng thái HTTP phù hợp
// 4. Request/Response dùng JSON format

// ============================================
// GET /api/products - Lấy tất cả sản phẩm
// ============================================
app.get('/api/products', (req, res) => {
  console.log('📥 GET: Lấy danh sách tất cả sản phẩm');
  
  // Có thể dùng query parameters để filter, sort, paginate
  const skip = req.query.skip ? parseInt(req.query.skip) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  
  const paginatedProducts = products.slice(skip, skip + limit);
  
  res.status(200).json({
    success: true,
    message: 'Lấy danh sách sản phẩm thành công',
    data: paginatedProducts,
    total: products.length,
    skip,
    limit
  });
});

// ============================================
// GET /api/products/:id - Lấy một sản phẩm theo ID
// ============================================
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  console.log(`📥 GET: Lấy sản phẩm có ID = ${id}`);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    // HTTP 404 - Not Found
    return res.status(404).json({
      success: false,
      message: 'Sản phẩm không tồn tại',
      error: 'NOT_FOUND'
    });
  }
  
  // HTTP 200 - OK
  res.status(200).json({
    success: true,
    message: 'Lấy sản phẩm thành công',
    data: product
  });
});

// ============================================
// POST /api/products - Tạo sản phẩm mới
// ============================================
app.post('/api/products', (req, res) => {
  console.log('📤 POST: Tạo sản phẩm mới');
  
  const { name, price, description, stock } = req.body;
  
  // Validation - Kiểm tra dữ liệu
  if (!name || !price) {
    // HTTP 400 - Bad Request
    return res.status(400).json({
      success: false,
      message: 'Thiếu thông tin bắt buộc',
      error: 'INVALID_INPUT',
      required: ['name', 'price']
    });
  }
  
  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Giá phải là số dương',
      error: 'INVALID_PRICE'
    });
  }
  
  // Tạo sản phẩm mới
  const newProduct = {
    id: uuidv4(),
    name,
    price,
    description: description || '',
    stock: stock || 0,
    createdAt: new Date().toISOString()
  };
  
  products.push(newProduct);
  
  // HTTP 201 - Created (thường dùng cho POST)
  res.status(201).json({
    success: true,
    message: 'Tạo sản phẩm thành công',
    data: newProduct
  });
});

// ============================================
// PUT /api/products/:id - Cập nhật sản phẩm
// ============================================
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, description, stock } = req.body;
  
  console.log(`📝 PUT: Cập nhật sản phẩm ID = ${id}`);
  
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Sản phẩm không tồn tại',
      error: 'NOT_FOUND'
    });
  }
  
  // Chỉ cập nhật những field được gửi
  if (name) products[productIndex].name = name;
  if (price) products[productIndex].price = price;
  if (description) products[productIndex].description = description;
  if (stock !== undefined) products[productIndex].stock = stock;
  
  products[productIndex].updatedAt = new Date().toISOString();
  
  res.status(200).json({
    success: true,
    message: 'Cập nhật sản phẩm thành công',
    data: products[productIndex]
  });
});

// ============================================
// DELETE /api/products/:id - Xóa sản phẩm
// ============================================
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  console.log(`🗑️ DELETE: Xóa sản phẩm ID = ${id}`);
  
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Sản phẩm không tồn tại',
      error: 'NOT_FOUND'
    });
  }
  
  const deletedProduct = products[productIndex];
  products.splice(productIndex, 1);
  
  // HTTP 200 OK hoặc HTTP 204 No Content
  res.status(200).json({
    success: true,
    message: 'Xóa sản phẩm thành công',
    data: deletedProduct
  });
});

// ============================================
// PATCH /api/products/:id - Cập nhật một phần
// ============================================
app.patch('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  console.log(`🔧 PATCH: Cập nhật một phần sản phẩm ID = ${id}`);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Sản phẩm không tồn tại',
      error: 'NOT_FOUND'
    });
  }
  
  // Cập nhật các trường được gửi đến
  Object.assign(product, updates);
  product.updatedAt = new Date().toISOString();
  
  res.status(200).json({
    success: true,
    message: 'Cập nhật sản phẩm thành công',
    data: product
  });
});

// ============================================
// Middleware xử lý Route không tồn tại
// ============================================
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint không tồn tại',
    method: req.method,
    path: req.path,
    error: 'NOT_FOUND'
  });
});

// ============================================
// Khởi động server
// ============================================
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   RESTful API Server Running! 🚀       ║
║   Truy cập: http://localhost:${PORT}    ║
║   Dùng Postman hoặc curl để test       ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
