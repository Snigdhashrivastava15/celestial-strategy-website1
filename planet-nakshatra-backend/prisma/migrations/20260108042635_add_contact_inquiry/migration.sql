-- CreateTable
CREATE TABLE "contact_inquiries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reference" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "source" TEXT NOT NULL DEFAULT 'WEBSITE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "respondedAt" DATETIME,
    "respondedBy" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "contact_inquiries_reference_key" ON "contact_inquiries"("reference");
