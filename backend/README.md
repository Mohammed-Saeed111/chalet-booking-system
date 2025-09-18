# Chalet Booking System - Backend

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/chalets

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration (optional)
CORS_ORIGIN=http://localhost:3000
```

## Installation

```bash
npm install
```

## Running the Server

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Chalets
- `GET /api/chalets` - Get all chalets
- `GET /api/chalets/:id` - Get chalet by ID

### User Management
- `GET /api/me` - Get current user info
- `GET /api/admin/*` - Admin routes (protected)

## Database Backup

### Local MongoDB
```bash
npm run backup
```

### MongoDB Atlas
Enable automated backups through the Atlas GUI:
1. Go to your cluster in MongoDB Atlas
2. Click "Backup" in the left sidebar
3. Enable "Cloud Provider Snapshots"
4. Configure backup frequency and retention

## Testing Authentication

1. Start the server: `npm run dev`
2. Test registration:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

3. Test login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```