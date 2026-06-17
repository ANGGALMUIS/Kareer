import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.routes";
import companyRoutes from "./routes/company.routes";
import jobRoutes from "./routes/job.routes";
import applicationRoutes from "./routes/application.routes";
import profileRoutes from "./routes/profile.routes";
import uploadRoutes from "./routes/upload.routes";
import paymentRoutes from "./routes/payment.routes";
import adminPaymentRoutes from "./routes/admin-payment.routes";
import adminCompanyRoutes from "./routes/admin-company.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import savedJobRoutes from "./routes/saved-job.routes";
import notificationRoutes from "./routes/notification.routes";
import companyPublicRoutes from "./routes/company-public.routes";
import adminAnalyticsRoutes from "./routes/admin-analytics.routes";
import activityLogRoutes from "./routes/activity-log.routes";
import applicantRoutes from "./routes/applicant.routes";
import interviewRoutes from "./routes/interview.routes";
import companyRequestRoute from "./routes/company-request.routes";
import applicantSubscriptionRoutes from "./routes/applicant-subscription.routes";
import applicantDashboardRoutes from "./routes/applicant-dashboard.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Kareer API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminPaymentRoutes);
app.use("/api/admin/companies", adminCompanyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/saved-jobs", savedJobRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/public/companies", companyPublicRoutes);
app.use("/api/admin/activity-logs", activityLogRoutes);
app.use("/api/admin/analytics", adminAnalyticsRoutes);
app.use("/api/applicant", applicantRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/company-request", companyRequestRoute);
app.use("/api/applicant-subscriptions", applicantSubscriptionRoutes);
app.use("/api/applicant-dashboard", applicantDashboardRoutes);

export default app;
