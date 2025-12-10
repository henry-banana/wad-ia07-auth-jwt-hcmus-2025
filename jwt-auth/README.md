# JWT Authentication Project - HCMUS 2025

[![npm version](https://img.shields.io/badge/npm-v11.1.9-blue)](https://www.npmjs.com/) [![license](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![downloads](https://img.shields.io/badge/downloads-27M%2Fmonth-brightgreen)](https://www.npmjs.com/) [![build](https://img.shields.io/badge/build-passing-success)](https://github.com/henry-banana/wad-ia07-auth-jwt-hcmus-2025) [![discord](https://img.shields.io/badge/discord-online-5865F2)](https://discord.gg/) [![backers](https://img.shields.io/badge/backers-849-orange)](https://opencollective.com/) [![sponsors](https://img.shields.io/badge/sponsors-325-red)](https://opencollective.com/) [![PayPal](https://img.shields.io/badge/Donate-PayPal-blue)](https://www.paypal.com/) [![Open Collective](https://img.shields.io/badge/Support_us-Open_Collective-blue)](https://opencollective.com/) [![Follow](https://img.shields.io/twitter/follow/nestframework?style=social)](https://twitter.com/)

## 📦 Hướng Dẫn Cài Đặt

### Bước 1: Clone Repository

```bash
git clone https://github.com/henry-banana/wad-ia07-auth-jwt-hcmus-2025.git
cd wad-ia07-auth-jwt-hcmus-2025/jwt-auth
```

### Bước 2: Cài Đặt Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Tạo file .env từ .env.example
cp .env.example .env

# Cập nhật các giá trị trong .env theo môi trường của bạn
# ⚠️ CHÚ Ý: Đổi JWT_SECRET và JWT_REFRESH_SECRET trong production!
```

### Bước 3: Khởi Chạy Database

**Cách 1: Sử dụng Docker (Khuyến nghị)**

```bash
# Từ thư mục backend/
docker-compose up -d

# Kiểm tra container đang chạy
docker ps
```

**Cách 2: Sử dụng PostgreSQL Local**

1. Cài đặt PostgreSQL trên máy
2. Tạo database mới:

```sql
CREATE DATABASE jwt_auth_db;
```

3. Cập nhật `DATABASE_URL` trong file `.env`

### Bước 4: Chạy Prisma Migrations

```bash
# Từ thư mục backend/
npx prisma generate
npx prisma migrate dev --name init

# Xem database trong Prisma Studio (tùy chọn)
npx prisma studio
```

### Bước 5: Cài Đặt Frontend

```bash
# Di chuyển vào thư mục frontend
cd ../frontend

# Cài đặt dependencies
npm install

# Tạo file .env từ .env.example
cp .env.example .env

# Cập nhật VITE_API_URL nếu cần (mặc định đã đúng cho local dev)
```

## 🚀 Chạy Ứng Dụng

### Development Mode

**Terminal 1 - Backend:**

```bash
cd backend
npm run start:dev
```

Backend sẽ chạy tại: `http://localhost:3000`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

### Production Mode

**Backend:**

```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## 🌐 Truy Cập Ứng Dụng

### Local Development

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api
- **Prisma Studio**: http://localhost:5555 (port tùy vào sau khi chạy `npx prisma studio`)

### Các Trang Chính

1. **Home Page** (`/`)

   - Trang chủ giới thiệu
   - Có nút đăng nhập và đăng ký

2. **Register Page** (`/register`)

   - Form đăng ký tài khoản
   - Validate email, password strength
   - Tự động chuyển đến login sau khi đăng ký thành công

3. **Login Page** (`/login`)

   - Form đăng nhập
   - Lưu token vào localStorage
   - Redirect đến dashboard sau khi login

4. **Dashboard Page** (`/dashboard`)
   - Protected route (yêu cầu đăng nhập)
   - Hiển thị thông tin user
   - Có nút logout

## ⚙️ Cấu Hình Môi Trường

### 🔒 Quan Trọng Về Bảo Mật

- **KHÔNG** commit file `.env` vào Git
- Sử dụng file `.env.example` làm template
- Tạo `.env` từ `.env.example` và cập nhật giá trị thực tế
- **BẮT BUỘC** đổi `JWT_SECRET` và `JWT_REFRESH_SECRET` trong production

### Backend Environment Variables

**File: `backend/.env.example`** (dùng làm template)

```bash
# ==========================================
# DATABASE CONFIGURATION
# ==========================================
DATABASE_USER=postgres
DATABASE_PASSWORD=your_secure_password_here
DATABASE_NAME=jwt_auth_db
DATABASE_PORT=5433

# Connection URL for Prisma
DATABASE_URL="postgresql://postgres:your_secure_password_here@localhost:5433/jwt_auth_db"

# ==========================================
# JWT SECRETS (⚠️ GENERATE NEW IN PRODUCTION!)
# ==========================================
# Generate với: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_jwt_secret_here_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_here_min_32_chars

# ==========================================
# TOKEN EXPIRATION
# ==========================================
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# ==========================================
# SERVER CONFIGURATION
# ==========================================
PORT=3000
NODE_ENV=development

# ==========================================
# CORS CONFIGURATION
# ==========================================
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment Variables

**File: `frontend/.env.example`**

```bash
# Backend API URL
VITE_API_URL=http://localhost:3000/api
```

### 🔑 Tạo JWT Secrets An Toàn

```bash
# Tạo JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Tạo JWT_REFRESH_SECRET (chạy lại lệnh trên để có secret khác)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🐳 Docker Deployment

### Backend với Docker

**Build Image:**

```bash
cd backend
docker build -t jwt-auth-backend .
```

**Run Container:**

```bash
docker run -p 3000:3000 \
  --env-file .env \
  jwt-auth-backend
```

**Docker Compose (Full Stack):**

```bash
# Từ thư mục backend/
docker-compose up -d

# Stop containers
docker-compose down

# Stop và xóa volumes
docker-compose down -v
```

## 👥 Contributors

- Henry Banana ([@henry-banana](https://github.com/henry-banana))

## 📄 License

This project is part of HCMUS Web Application Development course - IA07 assignment.

## 🙏 Acknowledgments

- HCMUS - University of Science, VNUHCM
- Web Application Development Course - 2025

---

**Lưu ý:** Đây là project học tập. Trong môi trường production thực tế, cần thêm nhiều tầng bảo mật và optimization hơn.

**Made with ❤️ by HCMUS Students**
