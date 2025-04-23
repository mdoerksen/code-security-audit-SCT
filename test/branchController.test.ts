import { Request, Response } from "express";
import * as branchController from "../src/api/v1/controllers/branchController";
import * as branchService from "../src/api/v1/services/branchService";

// Mock the service module
jest.mock("../src/api/v1/services/branchService");

describe("Branch Controller", () => {
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

  describe("getAllBranches", () => {
    it("should handle successful operation", async () => {
      const mockServiceResponse = [
        { id: 1, name: "Branch 1", address: "Address 1", phone: "1234567890" },
      ];
      (branchService.fetchAllBranches as jest.Mock).mockResolvedValue(
        mockServiceResponse
      );

      await branchController.getAllBranches(
        mockReq as Request,
        mockRes as Response
      );

      expect(branchService.fetchAllBranches).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branches retrieved",
        data: mockServiceResponse,
      });
    });

    it("should handle errors", async () => {
      const mockError = new Error("Test error");
      (branchService.fetchAllBranches as jest.Mock).mockRejectedValue(
        mockError
      );

      await branchController.getAllBranches(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });
  });

  describe("createBranch", () => {
    it("should handle successful operation", async () => {
      const newBranch = {
        name: "Branch 1",
        address: "Address 1",
        phone: "1234567890",
      };
      const createdBranch = { id: 1, ...newBranch };
      mockReq.body = newBranch;
      (branchService.addBranch as jest.Mock).mockResolvedValue(createdBranch);

      await branchController.createBranch(
        mockReq as Request,
        mockRes as Response
      );

      expect(branchService.addBranch).toHaveBeenCalledWith(newBranch);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch created",
        data: createdBranch,
      });
    });

    it("should handle errors", async () => {
      const mockError = new Error("Test error");
      mockReq.body = { name: "Branch 1" }; // Missing required fields
      (branchService.addBranch as jest.Mock).mockRejectedValue(mockError);

      await branchController.createBranch(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Bad Request" });
    });
  });

  describe("getBranchById", () => {
    it("should handle successful operation", async () => {
      const branchId = "1";
      const branch = {
        id: 1,
        name: "Branch 1",
        address: "Address 1",
        phone: "1234567890",
      };
      mockReq.params = { id: branchId }; // Initialize params with id
      (branchService.fetchBranchById as jest.Mock).mockResolvedValue(branch);

      await branchController.getBranchById(
        mockReq as Request,
        mockRes as Response
      );

      expect(branchService.fetchBranchById).toHaveBeenCalledWith(branchId);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch found",
        data: branch,
      });
    });

    it("should handle branch not found", async () => {
      const branchId = "1";
      mockReq.params = { id: branchId }; // Initialize params with id
      (branchService.fetchBranchById as jest.Mock).mockResolvedValue(undefined);

      await branchController.getBranchById(
        mockReq as Request,
        mockRes as Response
      );

      expect(branchService.fetchBranchById).toHaveBeenCalledWith(branchId);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch not found",
      });
    });

    it("should handle errors", async () => {
      const mockError = new Error("Test error");
      mockReq.params = { id: "1" }; // Initialize params with id
      (branchService.fetchBranchById as jest.Mock).mockRejectedValue(mockError);

      await branchController.getBranchById(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });
  });

  describe("updateBranch", () => {
    it("should handle successful operation", async () => {
      const branchId = "1";
      const updatedData = { name: "Updated Branch" };
      const updatedBranch = { id: 1, ...updatedData };
      mockReq.params = { id: branchId }; // Initialize params with id
      mockReq.body = updatedData;
      (branchService.modifyBranch as jest.Mock).mockResolvedValue(
        updatedBranch
      );

      await branchController.updateBranch(
        mockReq as Request,
        mockRes as Response
      );

      expect(branchService.modifyBranch).toHaveBeenCalledWith(
        branchId,
        updatedData
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch updated",
        data: updatedBranch,
      });
    });

    it("should handle branch not found", async () => {
      const branchId = "1";
      const updatedData = { name: "Updated Branch" };
      mockReq.params = { id: branchId }; // Initialize params with id
      mockReq.body = updatedData;
      (branchService.modifyBranch as jest.Mock).mockResolvedValue(undefined);

      await branchController.updateBranch(
        mockReq as Request,
        mockRes as Response
      );

      expect(branchService.modifyBranch).toHaveBeenCalledWith(
        branchId,
        updatedData
      );
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch not found",
      });
    });

    it("should handle errors", async () => {
      const mockError = new Error("Test error");
      mockReq.params = { id: "1" }; // Initialize params with id
      mockReq.body = { name: "Updated Branch" };
      (branchService.modifyBranch as jest.Mock).mockRejectedValue(mockError);

      await branchController.updateBranch(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Bad Request" });
    });
  });

  describe("deleteBranch", () => {
    it("should handle successful operation", async () => {
      const branchId = "1";
      mockReq.params = { id: branchId }; // Initialize params with id
      (branchService.removeBranch as jest.Mock).mockResolvedValue(true);

      await branchController.deleteBranch(
        mockReq as Request,
        mockRes as Response
      );

      expect(branchService.removeBranch).toHaveBeenCalledWith(branchId);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Branch deleted" });
    });

    it("should handle branch not found", async () => {
      const branchId = "1";
      mockReq.params = { id: branchId }; // Initialize params with id
      (branchService.removeBranch as jest.Mock).mockResolvedValue(false);

      await branchController.deleteBranch(
        mockReq as Request,
        mockRes as Response
      );

      expect(branchService.removeBranch).toHaveBeenCalledWith(branchId);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch not found",
      });
    });

    it("should handle errors", async () => {
      const mockError = new Error("Test error");
      mockReq.params = { id: "1" }; // Initialize params with id
      (branchService.removeBranch as jest.Mock).mockRejectedValue(mockError);

      await branchController.deleteBranch(
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
