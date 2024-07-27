-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "due_date" DATETIME NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_debit" BOOLEAN NOT NULL DEFAULT true,
    "is_deposit" BOOLEAN NOT NULL DEFAULT true
);
