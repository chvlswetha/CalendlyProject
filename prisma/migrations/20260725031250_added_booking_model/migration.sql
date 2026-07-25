-- AlterTable
ALTER TABLE "availability_exceptions" ALTER COLUMN "date" SET DATA TYPE DATE;

-- CreateTable
CREATE TABLE "slots" (
    "id" SERIAL NOT NULL,
    "hostId" INTEGER NOT NULL,
    "eventTypeId" INTEGER NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "hostId" INTEGER NOT NULL,
    "eventTypeId" INTEGER NOT NULL,
    "slotId" INTEGER NOT NULL,
    "inviteeEmail" TEXT NOT NULL,
    "inviteeNotes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "meetlink" TEXT,
    "calendarEventId" TEXT,
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "slots_hostId_startAt_idx" ON "slots"("hostId", "startAt");

-- CreateIndex
CREATE INDEX "slots_eventTypeId_startAt_endAt_idx" ON "slots"("eventTypeId", "startAt", "endAt");

-- CreateIndex
CREATE UNIQUE INDEX "slots_eventTypeId_startAt_endAt_key" ON "slots"("eventTypeId", "startAt", "endAt");

-- CreateIndex
CREATE INDEX "bookings_status_idx" ON "bookings"("status");

-- CreateIndex
CREATE INDEX "bookings_hostId_createdAt_idx" ON "bookings"("hostId", "createdAt");

-- CreateIndex
CREATE INDEX "bookings_inviteeEmail_idx" ON "bookings"("inviteeEmail");

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "event_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "event_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "slots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
