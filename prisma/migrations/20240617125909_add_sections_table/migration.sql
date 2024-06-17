-- CreateTable
CREATE TABLE "sections" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "activated" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "last_response" TEXT NOT NULL,
    "question_number" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sections_key_key" ON "sections"("key");
