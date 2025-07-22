# BKM Global Backend API

This is the backend API for BKM Global's contact form management system.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   The `.env` file is already configured with:
   - MongoDB connection string
   - Admin credentials (hardcoded)
   - Server port

3. **Start the Server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

4. **API Endpoints**

   ### Contact Form
   - `POST /api/contact` - Submit contact form
   - `GET /api/contact` - Get all contacts (admin only)
   - `GET /api/contact/:id` - Get single contact
   - `PUT /api/contact/:id/status` - Update contact status

   ### Authentication
   - `POST /api/auth/login` - Admin login
   - `POST /api/auth/verify` - Verify admin token

5. **Admin Credentials**
   - Email: `admin@bkmglobal.in`
   - Password: `BKM@Admin123`

## Features

- ✅ Contact form submission from frontend
- ✅ MongoDB data storage
- ✅ Admin authentication (hardcoded)
- ✅ Contact status management
- ✅ Form source tracking (home-page vs contact-page)
- ✅ Input validation
- ✅ CORS enabled for frontend
- ✅ Rate limiting for security

## Database Schema

### Contact Model
```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  subject: String (required),
  service: String (optional),
  message: String (required),
  status: String (enum: 'new', 'in-progress', 'resolved', 'closed'),
  source: String (enum: 'contact-page', 'home-page', 'other'),
  ipAddress: String,
  userAgent: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Integration

The backend is connected to:
1. **Home Page Contact Form** (`/src/components/Home/ContactUs.jsx`)
2. **Contact Us Page** (`/src/app/contact-us/page.jsx`)
3. **Admin Dashboard** (`/src/app/admin-dashboard/`)

## Admin Dashboard Features

- 📊 Dashboard with contact statistics
- 📧 Contact form management
- 🔍 Search and filter contacts
- 📊 Export contacts to CSV
- 🔐 Secure login system
- 📱 Responsive design

## Security Features

- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- CORS protection
- Helmet security headers
- Simple token-based authentication

## Server Status

Check server health at: `GET /api/health`# bkm-backed
