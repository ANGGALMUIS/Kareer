-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "assessmentAnswerName" TEXT,
ADD COLUMN     "assessmentAnswerUrl" TEXT;

-- AlterTable
ALTER TABLE "job_listings" ADD COLUMN     "assessmentFileName" TEXT,
ADD COLUMN     "assessmentFileUrl" TEXT;
