import request from "supertest";
import app from "../src/app";
import * as branchController from "../src/api/v1/controllers/branchController";

// Mock the entire controller
jest.mock("../src/api/v1/controllers/branchController", () => ({
  getAllBranches: jest.fn((req, res) => res.status(200).send()),
  createBranch: jest.fn((req, res) => res.status(201).send()),
  getBranchById: jest.fn((req, res) => res.status(200).send()),
  updateBranch: jest.fn((req, res) => res.status(200).send()),
  deleteBranch: jest.fn((req, res) => res.status(200).send()),
}));

describe("Branch Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/branches", () => {
    it("should call getAllBranches controller", async () => {
      await request(app).get("/api/v1/branches");
      expect(branchController.getAllBranches).toHaveBeenCalled();
    });
  });

  describe("POST /api/v1/branches", () => {
    it("should call createBranch controller", async () => {
      const mockBranch = {
        name: "Test Branch",
        address: "123 Test St",
        phone: "123-456-7890",
      };

      await request(app).post("/api/v1/branches").send(mockBranch);
      expect(branchController.createBranch).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/branches/:id", () => {
    it("should call getBranchById controller", async () => {
      const mockId = "1";

      await request(app).get(`/api/v1/branches/${mockId}`);
      expect(branchController.getBranchById).toHaveBeenCalled();
    });
  });

  describe("PUT /api/v1/branches/:id", () => {
    it("should call updateBranch controller", async () => {
      const mockId = "1";
      const mockUpdatedBranch = {
        name: "Updated Branch",
        address: "456 Updated St",
        phone: "987-654-3210",
      };

      await request(app)
        .put(`/api/v1/branches/${mockId}`)
        .send(mockUpdatedBranch);
      expect(branchController.updateBranch).toHaveBeenCalled();
    });
  });

  describe("DELETE /api/v1/branches/:id", () => {
    it("should call deleteBranch controller", async () => {
      const mockId = "1";

      await request(app).delete(`/api/v1/branches/${mockId}`);
      expect(branchController.deleteBranch).toHaveBeenCalled();
    });
  });
});
