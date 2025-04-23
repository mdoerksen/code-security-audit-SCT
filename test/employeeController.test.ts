import { Request, Response } from "express";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import * as employeeService from "../src/api/v1/services/employeeService";

// Mock the service module
jest.mock("../src/api/v1/services/employeeService");

describe("Employee Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = {
      params: {}, // Ensure params is initialized as an empty object
      body: {},
      query: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  describe("getAllEmployees", () => {
    it("should handle successful operation", async () => {
      const mockServiceResponse = [
        {
          id: 1,
          name: "John Doe",
          position: "Developer",
          department: "IT",
          email: "john@example.com",
          phone: "1234567890",
          branchId: 1,
        },
      ];
      (employeeService.fetchAllEmployees as jest.Mock).mockResolvedValue(
        mockServiceResponse
      );

      await employeeController.getAllEmployees(
        mockReq as Request,
        mockRes as Response
      );

      expect(employeeService.fetchAllEmployees).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employees retrieved",
        data: mockServiceResponse,
      });
    });

    it("should handle errors", async () => {
      const mockError = new Error("Test error");
      (employeeService.fetchAllEmployees as jest.Mock).mockRejectedValue(
        mockError
      );

      await employeeController.getAllEmployees(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });
  });

  describe("createEmployee", () => {
    it("should handle successful operation", async () => {
      const newEmployee = {
        name: "Jane Doe",
        position: "Manager",
        department: "HR",
        email: "jane@example.com",
        phone: "0987654321",
        branchId: 1,
      };
      const createdEmployee = { id: 1, ...newEmployee };
      mockReq.body = newEmployee;
      (employeeService.addEmployee as jest.Mock).mockResolvedValue(
        createdEmployee
      );

      await employeeController.createEmployee(
        mockReq as Request,
        mockRes as Response
      );

      expect(employeeService.addEmployee).toHaveBeenCalledWith(newEmployee);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee created",
        data: createdEmployee,
      });
    });

    it("should handle errors", async () => {
      const mockError = new Error("Test error");
      mockReq.body = { name: "Jane Doe" }; // Missing required fields
      (employeeService.addEmployee as jest.Mock).mockRejectedValue(mockError);

      await employeeController.createEmployee(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Bad Request" });
    });
  });

  describe("getEmployeeById", () => {
    it("should handle successful operation", async () => {
      const employeeId = "1";
      const employee = {
        id: 1,
        name: "John Doe",
        position: "Developer",
        department: "IT",
        email: "john@example.com",
        phone: "1234567890",
        branchId: 1,
      };
      mockReq.params = { id: employeeId }; // Initialize params with id
      (employeeService.fetchEmployeeById as jest.Mock).mockResolvedValue(
        employee
      );

      await employeeController.getEmployeeById(
        mockReq as Request,
        mockRes as Response
      );

      expect(employeeService.fetchEmployeeById).toHaveBeenCalledWith(
        employeeId
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee found",
        data: employee,
      });
    });

    it("should handle employee not found", async () => {
      const employeeId = "1";
      mockReq.params = { id: employeeId }; // Initialize params with id
      (employeeService.fetchEmployeeById as jest.Mock).mockResolvedValue(
        undefined
      );

      await employeeController.getEmployeeById(
        mockReq as Request,
        mockRes as Response
      );

      expect(employeeService.fetchEmployeeById).toHaveBeenCalledWith(
        employeeId
      );
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee not found",
      });
    });

    it("should handle errors", async () => {
      const mockError = new Error("Test error");
      mockReq.params = { id: "1" }; // Initialize params with id
      (employeeService.fetchEmployeeById as jest.Mock).mockRejectedValue(
        mockError
      );

      await employeeController.getEmployeeById(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });
  });

  describe("updateEmployee", () => {
    it("should handle successful operation", async () => {
      const employeeId = "1";
      const updatedData = { name: "John Smith" };
      const updatedEmployee = { id: 1, ...updatedData };
      mockReq.params = { id: employeeId }; // Initialize params with id
      mockReq.body = updatedData;
      (employeeService.modifyEmployee as jest.Mock).mockResolvedValue(
        updatedEmployee
      );

      await employeeController.updateEmployee(
        mockReq as Request,
        mockRes as Response
      );

      expect(employeeService.modifyEmployee).toHaveBeenCalledWith(
        employeeId,
        updatedData
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee updated",
        data: updatedEmployee,
      });
    });

    it("should handle employee not found", async () => {
      const employeeId = "1";
      const updatedData = { name: "John Smith" };
      mockReq.params = { id: employeeId }; // Initialize params with id
      mockReq.body = updatedData;
      (employeeService.modifyEmployee as jest.Mock).mockResolvedValue(
        undefined
      );

      await employeeController.updateEmployee(
        mockReq as Request,
        mockRes as Response
      );

      expect(employeeService.modifyEmployee).toHaveBeenCalledWith(
        employeeId,
        updatedData
      );
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee not found",
      });
    });

    it("should handle errors", async () => {
      const mockError = new Error("Test error");
      mockReq.params = { id: "1" }; // Initialize params with id
      mockReq.body = { name: "John Smith" };
      (employeeService.modifyEmployee as jest.Mock).mockRejectedValue(
        mockError
      );

      await employeeController.updateEmployee(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Bad Request" });
    });
  });

  describe("deleteEmployee", () => {
    it("should handle successful operation", async () => {
      const employeeId = "1";
      mockReq.params = { id: employeeId }; // Initialize params with id
      (employeeService.removeEmployee as jest.Mock).mockResolvedValue(true);

      await employeeController.deleteEmployee(
        mockReq as Request,
        mockRes as Response
      );

      expect(employeeService.removeEmployee).toHaveBeenCalledWith(employeeId);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee deleted",
      });
    });

    it("should handle employee not found", async () => {
      const employeeId = "1";
      mockReq.params = { id: employeeId }; // Initialize params with id
      (employeeService.removeEmployee as jest.Mock).mockResolvedValue(false);

      await employeeController.deleteEmployee(
        mockReq as Request,
        mockRes as Response
      );

      expect(employeeService.removeEmployee).toHaveBeenCalledWith(employeeId);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee not found",
      });
    });

    it("should handle errors", async () => {
      const mockError = new Error("Test error");
      mockReq.params = { id: "1" }; // Initialize params with id
      (employeeService.removeEmployee as jest.Mock).mockRejectedValue(
        mockError
      );

      await employeeController.deleteEmployee(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });
  });
});
