import api from "@/lib/api";
import { Job } from "@/types/job";

interface JobsResponse {
  jobs: Job[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface GetJobsParams {
  keyword?: string;
  location?: string;

  employmentType?: string;
  workMode?: string;
  experienceLevel?: string;
  industry?: string;

  salaryMin?: number;
  salaryMax?: number;

  page?: number;
  limit?: number;
}

export interface CreateJobPayload {
  title: string;

  description: string;

  requirements: string;

  location?: string;

  salaryMin?: number;
  salaryMax?: number;

  employmentType?: string;

  workMode?: string;

  experienceLevel?: string;

  industry?: string;

  skills?: string[];

  benefits?: string[];
}

export const getJobs = async (params?: GetJobsParams) => {
  const response = await api.get<JobsResponse>("/jobs", {
    params,
  });

  return response.data;
};

export const getJobById = async (id: string) => {
  const response = await api.get(`/jobs/${id}`);

  return response.data;
};

export const createJob = async (payload: FormData) => {
  const response = await api.post("/jobs", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getMyJobs = async (page = 1, limit = 10, keyword = "") => {
  const response = await api.get(
    `/jobs/my?page=${page}&limit=${limit}&keyword=${keyword}`,
  );

  return response.data;
};

export const updateJob = async (id: string, payload: CreateJobPayload) => {
  const response = await api.put(`/jobs/${id}`, payload);

  return response.data;
};

export const deleteJob = async (id: string) => {
  const response = await api.delete(`/jobs/${id}`);

  return response.data;
};
