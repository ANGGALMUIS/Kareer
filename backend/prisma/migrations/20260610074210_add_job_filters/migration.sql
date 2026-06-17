-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACT', 'FREELANCE');

-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('ONSITE', 'HYBRID', 'REMOTE');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('FRESH_GRADUATE', 'JUNIOR', 'MID_LEVEL', 'SENIOR');

-- AlterTable
ALTER TABLE "job_listings" ADD COLUMN     "employmentType" "EmploymentType",
ADD COLUMN     "experienceLevel" "ExperienceLevel",
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "workMode" "WorkMode";
