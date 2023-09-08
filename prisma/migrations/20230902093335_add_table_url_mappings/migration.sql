-- CreateTable
CREATE TABLE "urlMappings" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortenedUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "urlMappings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urlMappings_originalUrl_key" ON "urlMappings"("originalUrl");

-- CreateIndex
CREATE UNIQUE INDEX "urlMappings_shortenedUrl_key" ON "urlMappings"("shortenedUrl");

-- CreateIndex
CREATE INDEX "urlMappings_originalUrl_idx" ON "urlMappings" USING HASH ("originalUrl");

-- CreateIndex
CREATE INDEX "urlMappings_shortenedUrl_idx" ON "urlMappings" USING HASH ("shortenedUrl");
