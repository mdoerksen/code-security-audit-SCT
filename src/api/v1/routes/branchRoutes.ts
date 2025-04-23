import express, { Router } from "express";
import {
  getAllBranches,
  createBranch,
  getBranchById,
  updateBranch,
  deleteBranch,
} from "../controllers/branchController";

const router: Router = express.Router();

/**
 * @openapi
 * /api/v1/branches:
 *   get:
 *     summary: Retrieve a list of all branches
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: A list of branches
 */
router.get("/", getAllBranches);

/**
 * @openapi
 * /api/v1/branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Branch created successfully
 */
router.post("/", createBranch);

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Retrieve a branch by its ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the branch to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch found
 *       404:
 *         description: Branch not found
 */
router.get("/:id", getBranchById);

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update a branch by its ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the branch to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *       404:
 *         description: Branch not found
 */
router.put("/:id", updateBranch);

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   delete:
 *     summary: Delete a branch by its ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the branch to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 *       404:
 *         description: Branch not found
 */
router.delete("/:id", deleteBranch);

export default router;
