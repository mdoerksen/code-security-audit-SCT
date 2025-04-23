import express, { Request, Response, Express } from "express";
import morgan from "morgan";
import setupSwagger from "../config/swagger";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

const app: Express = express();
// Use Morgan for HTTP request logging
app.use(morgan("combined"));
app.use(express.json());

// Route handler
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

setupSwagger(app);

app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

export default app;
