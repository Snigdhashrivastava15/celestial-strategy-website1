-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_audit_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "details" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_audit_logs" ("action", "createdAt", "details", "entity", "entityId", "id", "ipAddress", "userAgent", "userId") SELECT "action", "createdAt", "details", "entity", "entityId", "id", "ipAddress", "userAgent", "userId" FROM "audit_logs";
DROP TABLE "audit_logs";
ALTER TABLE "new_audit_logs" RENAME TO "audit_logs";
CREATE TABLE "new_pages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "keywords" TEXT,
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
INSERT INTO "new_pages" ("bannerImage", "canonicalUrl", "content", "createdAt", "createdById", "featuredImage", "id", "keywords", "metaDescription", "metaTitle", "navigationOrder", "showInNavigation", "slug", "status", "title", "updatedAt", "updatedById") SELECT "bannerImage", "canonicalUrl", "content", "createdAt", "createdById", "featuredImage", "id", "keywords", "metaDescription", "metaTitle", "navigationOrder", "showInNavigation", "slug", "status", "title", "updatedAt", "updatedById" FROM "pages";
DROP TABLE "pages";
ALTER TABLE "new_pages" RENAME TO "pages";
CREATE UNIQUE INDEX "pages_slug_key" ON "pages"("slug");
CREATE TABLE "new_seo_metadata" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageType" TEXT NOT NULL,
    "pageId" TEXT,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" TEXT,
    "canonical" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "ogType" TEXT NOT NULL DEFAULT 'website',
    "twitterCard" TEXT NOT NULL DEFAULT 'summary_large_image',
    "twitterSite" TEXT,
    "structuredData" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_seo_metadata" ("canonical", "createdAt", "description", "id", "keywords", "ogDescription", "ogImage", "ogTitle", "ogType", "pageId", "pageType", "structuredData", "title", "twitterCard", "twitterSite", "updatedAt", "url") SELECT "canonical", "createdAt", "description", "id", "keywords", "ogDescription", "ogImage", "ogTitle", "ogType", "pageId", "pageType", "structuredData", "title", "twitterCard", "twitterSite", "updatedAt", "url" FROM "seo_metadata";
DROP TABLE "seo_metadata";
ALTER TABLE "new_seo_metadata" RENAME TO "seo_metadata";
CREATE UNIQUE INDEX "seo_metadata_url_key" ON "seo_metadata"("url");
CREATE TABLE "new_services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "keywords" TEXT,
    "content" TEXT,
    "features" TEXT,
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
INSERT INTO "new_services" ("category", "content", "createdAt", "currency", "description", "displayOrder", "duration", "featured", "features", "iconUrl", "id", "imageUrl", "keywords", "metaDescription", "metaTitle", "price", "shortDescription", "slug", "status", "title", "updatedAt") SELECT "category", "content", "createdAt", "currency", "description", "displayOrder", "duration", "featured", "features", "iconUrl", "id", "imageUrl", "keywords", "metaDescription", "metaTitle", "price", "shortDescription", "slug", "status", "title", "updatedAt" FROM "services";
DROP TABLE "services";
ALTER TABLE "new_services" RENAME TO "services";
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");
CREATE TABLE "new_system_config" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_system_config" ("createdAt", "id", "key", "updatedAt", "value") SELECT "createdAt", "id", "key", "updatedAt", "value" FROM "system_config";
DROP TABLE "system_config";
ALTER TABLE "new_system_config" RENAME TO "system_config";
CREATE UNIQUE INDEX "system_config_key_key" ON "system_config"("key");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
