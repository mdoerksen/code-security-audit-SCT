import express, { Router } from "express";
import {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController";

const router: Router = express.Router();

/**
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Retrieve a list of all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of employees
 */
router.get("/", getAllEmployees);

/**
 * @openapi
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               branchId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Employee created successfully
 */
router.post("/", createEmployee);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Retrieve an employee by their ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the employee to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee found
 *       404:
 *         description: Employee not found
 */
router.get("/:id", getEmployeeById);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update an employee by their ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the employee to update
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
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               branchId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 */
router.put("/:id", updateEmployee);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete an employee by their ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the employee to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */
router.delete("/:id", deleteEmployee);

export default router;
