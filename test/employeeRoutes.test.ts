import request from "supertest";
import express from "express";
import routes from "../src/api/v1/routes/employeeRoutes";
import * as employeeController from "../src/api/v1/controllers/employeeController";

// Mock the entire controller
jest.mock("../src/api/v1/controllers/employeeController", () => ({
  getAllEmployees: jest.fn((req, res) => res.status(200).send()),
  createEmployee: jest.fn((req, res) => res.status(201).send()),
  getEmployeeById: jest.fn((req, res) => res.status(200).send()),
  updateEmployee: jest.fn((req, res) => res.status(200).send()),
  deleteEmployee: jest.fn((req, res) => res.status(200).send()),
}));

const app = express();
app.use(express.json());
app.use("/api/v1/employees", routes);

describe("Employee Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/employees", () => {
    it("should call getAllEmployees controller", async () => {
      await request(app).get("/api/v1/employees");
      expect(employeeController.getAllEmployees).toHaveBeenCalled();
    });
  });

  describe("POST /api/v1/employees", () => {
    it("should call createEmployee controller", async () => {
      const mockEmployee = {
        name: "Test Employee",
        position: "Developer",
        department: "Engineering",
        email: "test@example.com",
        phone: "123-456-7890",
        branchId: 1,
      };

      await request(app).post("/api/v1/employees").send(mockEmployee);
      expect(employeeController.createEmployee).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/employees/:id", () => {
    it("should call getEmployeeById controller", async () => {
      const mockId = "1";

      await request(app).get(`/api/v1/employees/${mockId}`);
      expect(employeeController.getEmployeeById).toHaveBeenCalled();
    });
  });

  describe("PUT /api/v1/employees/:id", () => {
    it("should call updateEmployee controller", async () => {
      const mockId = "1";
      const mockUpdatedEmployee = {
        name: "Updated Employee",
        position: "Senior Developer",
        department: "Engineering",
        email: "updated@example.com",
        phone: "987-654-3210",
        branchId: 1,
      };

      await request(app)
        .put(`/api/v1/employees/${mockId}`)
        .send(mockUpdatedEmployee);
      expect(employeeController.updateEmployee).toHaveBeenCalled();
    });
  });

  describe("DELETE /api/v1/employees/:id", () => {
    it("should call deleteEmployee controller", async () => {
      const mockId = "1";

      await request(app).delete(`/api/v1/employees/${mockId}`);
      expect(employeeController.deleteEmployee).toHaveBeenCalled();
    });
  });
});
