-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'CLIENT',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "phone" TEXT,
    "company" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "keywords" JSONB NOT NULL,
    "content" JSONB,
    "features" JSONB NOT NULL,
    "duration" TEXT,
    "price" REAL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "imageUrl" TEXT,
    "iconUrl" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "consultations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookingReference" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "clientCompany" TEXT,
    "serviceId" TEXT NOT NULL,
    "scheduledDate" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 60,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "adminNotes" TEXT,
    "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "amount" REAL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "paymentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT,
    CONSTRAINT "consultations_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "consultations_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "keywords" JSONB NOT NULL,
    "canonicalUrl" TEXT,
    "featuredImage" TEXT,
    "bannerImage" TEXT,
    "showInNavigation" BOOLEAN NOT NULL DEFAULT false,
    "navigationOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT
);

-- CreateTable
CREATE TABLE "seo_metadata" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageType" TEXT NOT NULL,
    "pageId" TEXT,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" JSONB NOT NULL,
    "canonical" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "ogType" TEXT NOT NULL DEFAULT 'website',
    "twitterCard" TEXT NOT NULL DEFAULT 'summary_large_image',
    "twitterSite" TEXT,
    "structuredData" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "system_config" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "details" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "consultations_bookingReference_key" ON "consultations"("bookingReference");

-- CreateIndex
CREATE UNIQUE INDEX "pages_slug_key" ON "pages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "seo_metadata_url_key" ON "seo_metadata"("url");

-- CreateIndex
CREATE UNIQUE INDEX "system_config_key_key" ON "system_config"("key");
