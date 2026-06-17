import { Request, Response } from "express";

import jobService from "../services/job.service";

import { createJobSchema } from "../validations/job.schema";

class JobController {
  async create(req: Request, res: Response) {
    try {
      if (req.body.skills) {
        req.body.skills = JSON.parse(req.body.skills);
      }

      if (req.body.benefits) {
        req.body.benefits = JSON.parse(req.body.benefits);
      }

      if (req.body.salaryMin) {
        req.body.salaryMin = Number(req.body.salaryMin);
      }

      if (req.body.salaryMax) {
        req.body.salaryMax = Number(req.body.salaryMax);
      }

      const validatedData = createJobSchema.parse(req.body);

      const assessmentFile = (req as any).file;

      const job = await jobService.createJob(
        req.user!.userId,
        validatedData,
        assessmentFile,
      );

      return res.status(201).json({
        success: true,
        data: job,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const data = await jobService.getJobs({
        keyword: req.query.keyword as string,

        location: req.query.location as string,

        salaryMin: req.query.salaryMin
          ? Number(req.query.salaryMin)
          : undefined,

        salaryMax: req.query.salaryMax
          ? Number(req.query.salaryMax)
          : undefined,

        employmentType: req.query.employmentType as string,

        workMode: req.query.workMode as string,

        experienceLevel: req.query.experienceLevel as string,

        industry: req.query.industry as string,

        page: req.query.page ? Number(req.query.page) : 1,

        limit: req.query.limit ? Number(req.query.limit) : 10,
      });

      return res.status(200).json({
        success: true,
        ...data,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const job = await jobService.getJobById(id);

      return res.status(200).json({
        success: true,
        data: job,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async myJobs(req: Request, res: Response) {
    try {
      const page = Number(req.query.page || 1);

      const limit = Number(req.query.limit || 10);

      const result = await jobService.getMyJobs(
        req.user!.userId,
        page,
        limit,
        req.query.keyword as string,
      );

      return res.json({
        success: true,
        ...result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const data = await jobService.updateJob(
        req.user!.userId,
        req.params.id as string,
        req.body,
      );

      return res.json({
        success: true,
        data,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await jobService.deleteJob(req.user!.userId, req.params.id as string);

      return res.json({
        success: true,
        message: "Lowongan berhasil dihapus",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new JobController();
