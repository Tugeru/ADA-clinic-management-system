-- AlterTable
ALTER TABLE "students" ADD COLUMN     "contact_name" TEXT,
ADD COLUMN     "contact_number" TEXT,
ADD COLUMN     "contact_relationship" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "patient_type" TEXT NOT NULL DEFAULT 'Student',
ADD COLUMN     "position" TEXT;
