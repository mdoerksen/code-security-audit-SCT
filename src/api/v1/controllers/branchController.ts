import { Request, Response } from "express";
import * as branchService from "../services/branchService";
import {
  Branch,
  fetchAllBranches,
  addBranch,
  fetchBranchById,
  modifyBranch,
  removeBranch,
} from "../services/branchService";

/**
 * Retrieves all branches from the database.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response containing the list of branches.
 */
export const getAllBranches = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const branches: Branch[] = await fetchAllBranches();
    res.status(200).json({ message: "Branches retrieved", data: branches });
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Creates a new branch in the database.
 * @param req - The request object containing the branch data in the body.
 * @param res - The response object.
 * @returns A JSON response containing the created branch.
 */

// got chatGPT to write this vulerability for me.
export const createBranch = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // 🚨 No validation! We trust user input blindly.
    const { name, address, phone } = req.body;

    // Simulate passing it directly to the service or DB
    const newBranch = {
      name,
      address,
      phone,
    };

    console.log("Creating branch with:", newBranch); // Just for visual confirmation

    res.status(201).json({ message: "Branch created", data: newBranch });
  } catch (error) {
    console.error("Error creating branch:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Retrieves a branch by its ID.
 * @param req - The request object containing the branch ID in the parameters.
 * @param res - The response object.
 * @returns A JSON response containing the found branch or a 404 error if not found.
 */
export const getBranchById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const branch = await branchService.fetchBranchById(id);
    if (branch) {
      res.status(200).json({ message: "Branch found", data: branch });
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error) {
    console.error("Error fetching branch:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Updates an existing branch by its ID.
 * @param req - The request object containing the branch ID in the parameters and updated data in the body.
 * @param res - The response object.
 * @returns A JSON response containing the updated branch or a 404 error if not found.
 */
export const updateBranch = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedBranch: Branch = req.body;
    const result = await branchService.modifyBranch(id, updatedBranch);
    if (result) {
      res.status(200).json({ message: "Branch updated", data: result });
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error) {
    console.error("Error updating branch:", error);
    res.status(400).json({ message: "Bad Request" });
  }
};

/**
 * Deletes a branch by its ID.
 * @param req - The request object containing the branch ID in the parameters.
 * @param res - The response object.
 * @returns A JSON response confirming the deletion or a 404 error if not found.
 */
export const deleteBranch = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await branchService.removeBranch(id);
    if (result) {
      res.status(200).json({ message: "Branch deleted" });
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error) {
    console.error("Error deleting branch:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
