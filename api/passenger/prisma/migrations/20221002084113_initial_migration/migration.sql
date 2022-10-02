-- CreateTable
CREATE TABLE "Passenger" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "passengerId" TEXT,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripRequirement" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "tripTimingId" TEXT NOT NULL,

    CONSTRAINT "TripRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripTiming" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requestedTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TripTiming_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripPayment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "tripId" TEXT NOT NULL,

    CONSTRAINT "TripPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_email_key" ON "Passenger"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_phone_key" ON "Passenger"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "TripRequirement_tripId_key" ON "TripRequirement"("tripId");

-- CreateIndex
CREATE UNIQUE INDEX "TripRequirement_tripTimingId_key" ON "TripRequirement"("tripTimingId");

-- CreateIndex
CREATE UNIQUE INDEX "TripPayment_tripId_key" ON "TripPayment"("tripId");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passenger"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripRequirement" ADD CONSTRAINT "TripRequirement_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripRequirement" ADD CONSTRAINT "TripRequirement_tripTimingId_fkey" FOREIGN KEY ("tripTimingId") REFERENCES "TripTiming"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripPayment" ADD CONSTRAINT "TripPayment_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
