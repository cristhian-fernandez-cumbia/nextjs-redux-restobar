-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatet" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tables" (
    "idTable" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Tables_pkey" PRIMARY KEY ("idTable")
);

-- CreateTable
CREATE TABLE "Categories" (
    "idCategory" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "urlImagen" TEXT,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("idCategory")
);

-- CreateTable
CREATE TABLE "Dishes" (
    "idDish" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "urlImagen" TEXT,
    "idCategory" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Dishes_pkey" PRIMARY KEY ("idDish")
);

-- CreateTable
CREATE TABLE "Orders" (
    "idOrder" SERIAL NOT NULL,
    "idTable" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3),
    "total" DOUBLE PRECISION,
    "numPersons" INTEGER NOT NULL,
    "paymentType" TEXT,
    "orderType" TEXT,
    "status" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("idOrder")
);

-- CreateTable
CREATE TABLE "OrdersDishes" (
    "idOrderDish" SERIAL NOT NULL,
    "idOrder" INTEGER NOT NULL,
    "idDish" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "comment" TEXT,

    CONSTRAINT "OrdersDishes_pkey" PRIMARY KEY ("idOrderDish")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Dishes" ADD CONSTRAINT "Dishes_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Categories"("idCategory") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersDishes" ADD CONSTRAINT "OrdersDishes_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "Orders"("idOrder") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersDishes" ADD CONSTRAINT "OrdersDishes_idDish_fkey" FOREIGN KEY ("idDish") REFERENCES "Dishes"("idDish") ON DELETE RESTRICT ON UPDATE CASCADE;
