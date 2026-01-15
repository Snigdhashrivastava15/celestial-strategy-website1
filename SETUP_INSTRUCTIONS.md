# Planet Nakshatra - Backend & Frontend Setup Instructions

## Overview
This project consists of:
- **Backend**: NestJS + TypeScript + Prisma (SQLite) - Runs on port 5000
- **Frontend**: Vite + React + TypeScript - Runs on port 5173

## Backend Setup & Changes

### Fixed Issues:
1. ✅ **PrismaService Configuration**: Added PrismaService as a global provider in AppModule
2. ✅ **Health Endpoint**: Available at `http://localhost:5000/api/health`
3. ✅ **CORS Configuration**: Enabled for `http://localhost:5173`
4. ✅ **Global API Prefix**: All routes now prefixed with `/api`
5. ✅ **Package Scripts**: Added `dev` script alias for convenience
6. ✅ **Environment Configuration**: DATABASE_URL configured in `.env` file

### New Demo Endpoints Created:
- `GET /api/health` - Health check endpoint
- `GET /api/booking/astrologer` - Get demo astrologer profile
- `GET /api/booking/slots?date=YYYY-MM-DD` - Get available time slots
- `POST /api/booking` - Create a booking (DEMO-ONLY, in-memory)
- `GET /api/services/demo` - Get demo services list
- `GET /api/testimonials` - Get testimonials (DEMO-ONLY, in-memory)
- `POST /api/contact/inquiry` - Submit contact inquiry

### Key Files Modified:
- `planet-nakshatra-backend/src/app.module.ts` - Added PrismaService as global provider
- `planet-nakshatra-backend/src/main.ts` - Added global API prefix `/api` and improved CORS
- `planet-nakshatra-backend/src/app.controller.ts` - Health endpoint route fixed
- `planet-nakshatra-backend/package.json` - Added `dev` script
- `planet-nakshatra-backend/.env` - DATABASE_URL configured

### New Files Created:
- `planet-nakshatra-backend/src/testimonials/` - Testimonials module (demo endpoints)
- Updated `planet-nakshatra-backend/src/services/services.service.ts` - Added `getDemoServices()` method

## Frontend Setup & Changes

### Components Updated:
1. ✅ **BookingModal.tsx** - Already functional, API endpoints updated to use `/api` prefix
2. ✅ **ContactSection.tsx** - Already functional, API endpoint updated
3. ✅ **ServicesSection.tsx** - Now fetches from API with static fallback
4. ✅ **TestimonialsSection.tsx** - Now fetches from API with static fallback

### Key Changes:
- All API calls updated to use `http://localhost:5000/api/*` prefix
- Services and Testimonials now fetch from backend with graceful fallback
- All buttons wired and functional

## Running the Application

### Backend (Terminal 1):
```bash
cd planet-nakshatra-backend
npm install  # If not already done
npm run dev  # or npm run start:dev
```

**Expected Output:**
```
Backend server running on http://localhost:5000
Health check: http://localhost:5000/api/health
```

### Frontend (Terminal 2):
```bash
# From project root
npm install  # If not already done
npm run dev
```

**Expected Output:**
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

## Testing the Setup

### 1. Health Check
```bash
curl http://localhost:5000/api/health
# Expected: {"status":"ok","timestamp":"...","service":"planet-nakshatra-backend"}
```

Or visit in browser: `http://localhost:5000/api/health`

### 2. Test Booking Flow
1. Open `http://localhost:5173`
2. Click "Begin Your Journey" button
3. Fill in booking form:
   - Name: Test User
   - Email: test@example.com
   - Date: Select a future date
   - Time: Select from available slots
4. Submit - Should see confirmation screen

### 3. Test Contact Form
1. Scroll to Contact section
2. Fill in the inquiry form
3. Submit - Should see success toast

### 4. Verify Dynamic Content
- Services section should load from API (check browser console)
- Testimonials section should load from API (check browser console)

## Demo Data

### Astrologer Profile (DEMO-ONLY):
- **Name**: Astrologer Sameer
- **Expertise**: Vedic Astrology, Career Guidance, Marriage Compatibility
- **Experience**: 15+ years
- **Consultation Fee**: ₹1999 (INR)
- **Rating**: 4.9
- **Total Consultations**: 2500+

### Available Time Slots (DEMO-ONLY):
- 9:00 AM, 10:00 AM, 11:00 AM, 2:00 PM, 3:00 PM, 4:00 PM, 5:00 PM

### Services (DEMO-ONLY):
11 premium services including:
- The Celestial Strategy™
- The Destiny Architecture™
- The Maharaja Protocol™
- Cosmic Capital Advisory™
- And 7 more...

### Testimonials (DEMO-ONLY):
3 testimonials from:
- Fortune 500 Conglomerate Chairman
- Private Equity Firm Managing Director
- Industrial Dynasty Patriarch

## Important Notes

⚠️ **DEMO-ONLY Features:**
- All booking data is stored in-memory (lost on server restart)
- No real payment processing
- No authentication required
- Mock data used for services and testimonials
- No database persistence for bookings

✅ **Production-Ready Features:**
- Contact inquiries saved to database (Prisma/SQLite)
- Proper error handling
- CORS configured
- TypeScript throughout
- Clean architecture with NestJS modules
- Health check endpoint for monitoring

## Database

- **Type**: SQLite
- **Location**: `planet-nakshatra-backend/dev.db`
- **Migrations**: Already applied
- **Prisma Client**: Already generated

To regenerate Prisma client (if needed):
```bash
cd planet-nakshatra-backend
npm run prisma:generate
```

To open Prisma Studio (database GUI):
```bash
cd planet-nakshatra-backend
npm run prisma:studio
```

## Troubleshooting

### Backend won't start:
1. Check if port 5000 is available
2. Verify `.env` file exists with `DATABASE_URL="file:./dev.db"`
3. Run `npm install` in `planet-nakshatra-backend`
4. Ensure Prisma client is generated: `npm run prisma:generate`

### Frontend can't connect to backend:
1. Verify backend is running on port 5000
2. Check CORS configuration in `main.ts`
3. Check browser console for errors
4. Verify API URLs include `/api` prefix

### Health endpoint returns 404:
- Ensure you're accessing `/api/health` (not `/health`)
- Check that global prefix is set in `main.ts`

## Architecture Notes

### Backend Structure:
```
planet-nakshatra-backend/
├── src/
│   ├── app.module.ts          # Main app module (global PrismaService)
│   ├── main.ts                # Bootstrap (CORS, global prefix)
│   ├── booking/               # Booking demo endpoints
│   ├── contact/               # Contact inquiry endpoints (DB-backed)
│   ├── services/              # Services endpoints (DB-ready, demo fallback)
│   ├── testimonials/          # Testimonials demo endpoints
│   └── common/
│       └── prisma.service.ts  # Global Prisma service
├── prisma/
│   └── schema.prisma          # Database schema
└── .env                       # Environment variables
```

### Frontend Structure:
```
src/
├── components/
│   ├── BookingModal.tsx       # Booking form & confirmation
│   ├── ContactSection.tsx     # Contact inquiry form
│   ├── ServicesSection.tsx    # Services display (API-driven)
│   └── TestimonialsSection.tsx # Testimonials display (API-driven)
└── contexts/
    └── BookingContext.tsx     # Booking modal state management
```

## Next Steps (Production)

To make this production-ready:
1. Replace in-memory booking storage with database persistence
2. Add authentication and authorization
3. Integrate real payment gateway
4. Add email notifications
5. Set up proper environment variables for production
6. Add rate limiting and security headers
7. Set up proper logging and monitoring
8. Add comprehensive error handling
9. Write unit and integration tests
10. Set up CI/CD pipeline
