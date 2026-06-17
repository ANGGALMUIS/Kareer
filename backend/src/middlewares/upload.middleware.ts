import multer from "multer";
import path from "path";

import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary";

const cvStorage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "kareer/cv",

    resource_type: "raw",

    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

export const uploadCV = multer({
  storage: cvStorage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".doc", ".docx"];

    const ext = path.extname(file.originalname);

    if (!allowed.includes(ext.toLowerCase())) {
      return cb(new Error("Format file tidak didukung"));
    }

    cb(null, true);
  },
});

const assessmentStorage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "kareer/assessment",

    resource_type: "raw",

    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

export const uploadAssessment = multer({
  storage: assessmentStorage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowed = [
      ".pdf",
      ".doc",
      ".docx",
      ".zip",
      ".rar",
      ".ppt",
      ".pptx",
      ".xlsx",
      ".xls",
    ];

    const ext = path.extname(file.originalname);

    if (!allowed.includes(ext.toLowerCase())) {
      return cb(new Error("Format assessment tidak didukung"));
    }

    cb(null, true);
  },
});

const assessmentAnswerStorage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "kareer/assessment-answer",

    resource_type: "raw",

    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

export const uploadAssessmentAnswer = multer({
  storage: assessmentAnswerStorage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowed = [
      ".pdf",
      ".doc",
      ".docx",
      ".zip",
      ".ppt",
      ".pptx",
      ".xls",
      ".xlsx",
    ];

    const ext = path.extname(file.originalname);

    if (!allowed.includes(ext.toLowerCase())) {
      return cb(new Error("Format jawaban assessment tidak didukung"));
    }

    cb(null, true);
  },
});

const proposalStorage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "kareer/company-proposal",

    resource_type: "raw",

    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

export const uploadProposal = multer({
  storage: proposalStorage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".doc", ".docx"];

    const ext = path.extname(file.originalname);

    if (!allowed.includes(ext.toLowerCase())) {
      return cb(new Error("Format proposal tidak didukung"));
    }

    cb(null, true);
  },
});

const logoStorage = new CloudinaryStorage({
  cloudinary,

  params: async () => ({
    folder: "kareer/company-logo",
  }),
});

export const uploadCompanyLogo = multer({
  storage: logoStorage,

  limits: {
    fileSize: 2 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowed = [".png", ".jpg", ".jpeg", ".webp"];

    const ext = path.extname(file.originalname);

    if (!allowed.includes(ext.toLowerCase())) {
      return cb(new Error("Format gambar tidak didukung"));
    }

    cb(null, true);
  },
});
