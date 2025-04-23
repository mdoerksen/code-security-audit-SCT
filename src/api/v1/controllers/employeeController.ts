import { Request, Response } from "express";
import {
  fetchAllEmployees,
  addEmployee,
  fetchEmployeeById,
  modifyEmployee,
  removeEmployee,
} from "../services/employeeService";

/**
 * Retrieves all employees from the database.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response containing the list of employees.
 * @throws {Error} If there is an error fetching employees.
 *
 * This function uses a try-catch block to handle errors
 * Referenced from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
 */
export const getAllEmployees = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await fetchAllEmployees();
    res.status(200).json({ message: "Employees retrieved", data: employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Creates a new employee in the database.
 * @param req - The request object containing the employee data in the body.
 * @param res - The response object.
 * @returns A JSON response containing the created employee.
 * @throws {Error} If there is an error creating the employee.
 *
 */
export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newEmployee = req.body;
    const createdEmployee = await addEmployee(newEmployee);
    res
      .status(201)
      .json({ message: "Employee created", data: createdEmployee });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(400).json({ message: "Bad Request" });
  }
};

/**
 * Retrieves an employee by their ID.
 * @param req - The request object containing the employee ID in the parameters.
 * @param res - The response object.
 * @returns A JSON response containing the found employee or a 404 error if not found.
 * @throws {Error} If there is an error fetching the employee.
 */
export const getEmployeeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const employee = await fetchEmployeeById(id);
    if (employee) {
      res.status(200).json({ message: "Employee found", data: employee });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Updates an existing employee by their ID.
 * @param req - The request object containing the employee ID in the parameters and updated data in the body.
 * @param res - The response object.
 * @returns A JSON response containing the updated employee or a 404 error if not found.
 * @throws {Error} If there is an error updating the employee.
 */
export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedEmployee = req.body;
    const result = await modifyEmployee(id, updatedEmployee);
    if (result) {
      res.status(200).json({ message: "Employee updated", data: result });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(400).json({ message: "Bad Request" });
  }
};

/**
 * Deletes an employee by their ID.
 * @param req - The request object containing the employee ID in the parameters.
 * @param res - The response object.
 * @returns A JSON response confirming the deletion or a 404 error if not found.
 * @throws {Error} If there is an error deleting the employee.
 */
export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await removeEmployee(id);
    if (result) {
      res.status(200).json({ message: "Employee deleted" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
