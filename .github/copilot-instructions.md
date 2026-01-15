# Celestial Strategy - AI Coding Guidelines

## Project Overview
**Celestial Strategy** is a premium Vedic astrology consultation platform with a React frontend and NestJS backend. The platform serves high-value clients including executives, industrialists, and public figures, offering specialized services like "The Celestial Strategy™" and "Cosmic Capital Advisory™".

## Architecture

### Frontend (React + Vite)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with hot reload
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables (slate base color)
- **State Management**: TanStack Query for server state
- **Routing**: React Router v6
- **SEO**: React Helmet Async for meta tags
- **Animations**: Framer Motion

**Key Directories**:
- `src/components/ui/` - shadcn/ui components (accordion, dialog, form, etc.)
- `src/components/` - Page sections (HeroSection, ServicesSection, etc.)
- `src/pages/` - Route components (Index, NotFound)
- `src/lib/utils.ts` - Utility functions (cn() for class merging)

### Backend (NestJS + Prisma)
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport.js
- **Validation**: class-validator + class-transformer
- **Security**: Helmet, CORS, bcryptjs for passwords

**Key Directories**:
- `planet-nakshatra-backend/src/` - Main source
- `planet-nakshatra-backend/prisma/schema.prisma` - Database schema
- `planet-nakshatra-backend/src/common/prisma.service.ts` - Database service
- `planet-nakshatra-backend/src/*/dto/` - Validation DTOs

## Development Workflows

### Frontend Development
```bash
# Install dependencies
npm install

# Start dev server (runs on http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Backend Development
```bash
cd planet-nakshatra-backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start dev server with watch mode (runs on http://localhost:3000)
npm run start:dev

# Run tests
npm run test

# Format code
npm run format

# Lint and fix
npm run lint
```

## Code Patterns & Conventions

### Frontend Patterns
- **Component Structure**: Functional components with TypeScript
- **Styling**: Tailwind utility classes, avoid custom CSS unless necessary
- **Forms**: React Hook Form with @hookform/resolvers for validation
- **Icons**: Lucide React icons
- **SEO**: Always include Helmet meta tags in page components
- **Responsive Design**: Mobile-first with Tailwind responsive prefixes

**Example Component Structure**:
```tsx
// src/components/HeroSection.tsx
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold">Title</h1>
        <Button>CTA Button</Button>
      </motion.div>
    </section>
  );
}
```

### Backend Patterns
- **Module Structure**: Feature-based modules (auth, services, bookings, cms, users)
- **DTOs**: Always use class-validator decorators for input validation
- **Database**: Use Prisma client through PrismaService
- **Error Handling**: Use NestJS built-in exceptions (NotFoundException, ConflictException)
- **Authentication**: Protect routes with @UseGuards(JwtAuthGuard)

**Example Service Method**:
```typescript
// planet-nakshatra-backend/src/services/services.service.ts
@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const { title, slug, ...data } = createServiceDto;
    const finalSlug = slug || this.generateSlug(title);

    const existingService = await this.prisma.service.findUnique({
      where: { slug: finalSlug },
    });

    if (existingService) {
      throw new ConflictException('Service with this slug already exists');
    }

    return this.prisma.service.create({
      data: { ...data, title, slug: finalSlug },
    });
  }
}
```

**Example DTO**:
```typescript
// planet-nakshatra-backend/src/services/dto/service.dto.ts
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ServiceCategory } from '@prisma/client';

export class CreateServiceDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsEnum(ServiceCategory)
  category: ServiceCategory;
}
```

### Database Schema Patterns
- **Enums**: Use Prisma enums for status fields (UserRole, ServiceStatus, etc.)
- **Relations**: Define bidirectional relations with proper foreign keys
- **Naming**: Use camelCase for fields, PascalCase for models
- **Defaults**: Set sensible defaults for status and timestamp fields
- **Indexing**: Add @unique for fields that need uniqueness constraints

## Key Integration Points

### API Communication
- Frontend calls backend APIs using TanStack Query
- Backend endpoints follow REST conventions
- Authentication via JWT tokens stored in localStorage/cookies

### Environment Variables
**Frontend (.env)**:
- `VITE_API_URL` - Backend API URL

**Backend (.env)**:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `PORT` - Server port (default 3000)

## Common Tasks

### Adding a New Service
1. Update `ServiceCategory` enum in `prisma/schema.prisma`
2. Run `npx prisma migrate dev` to update database
3. Create DTOs in `src/services/dto/`
4. Add methods to `ServicesService`
5. Add routes to `ServicesController`

### Adding a New UI Component
1. Use `npx shadcn-ui@latest add [component-name]` for shadcn/ui components
2. Place custom components in `src/components/`
3. Follow existing naming conventions (PascalCase)
4. Use Tailwind for styling, Framer Motion for animations

### Database Changes
1. Modify `prisma/schema.prisma`
2. Run `npx prisma migrate dev` to create migration
3. Run `npx prisma generate` to update client
4. Update TypeScript types in services/DTOs

## Quality Standards
- **TypeScript**: Strict typing throughout, no `any` types
- **Validation**: All API inputs validated with class-validator
- **Error Handling**: Proper HTTP status codes and error messages
- **SEO**: Meta tags for all public pages
- **Accessibility**: Use semantic HTML and ARIA attributes where needed
- **Performance**: Lazy load components, optimize images, use React.memo for expensive components

## Testing
- **Backend**: Jest for unit tests, e2e tests in `test/`
- **Frontend**: No specific testing framework configured yet
- Run `npm run test` in backend directory

## Deployment
- **Frontend**: Static site deployable to any CDN/hosting
- **Backend**: Node.js application, requires PostgreSQL database
- Environment variables required for production deployment