/**
 * Represents an employee in the system.
 * @interface
 */
export interface Employee {
  id: number; // Unique identifier for the employee
  name: string; // Name of the employee
  position: string; // Job position of the employee
  department: string; // Department of the employee
  email: string; // Email address of the employee
  phone: string; // Phone number of the employee
  branchId: number; // ID of the branch the employee belongs to
}

// In-memory storage for employees
let employees: Employee[] = [];
let nextId = 1; // Simple ID generator

/**
 * Fetches all employees from the in-memory storage.
 * @returns {Promise<Employee[]>} A promise that resolves to an array of employees.
 */
export const fetchAllEmployees = async (): Promise<Employee[]> => {
  return employees;
};

/**
 * Adds a new employee to the in-memory storage.
 * @param {Omit<Employee, "id">} employee - The employee data without the ID.
 * @returns {Promise<Employee>} A promise that resolves to the created employee, including its ID.
 */
export const addEmployee = async (
  employee: Omit<Employee, "id">
): Promise<Employee> => {
  const newEmployee = { id: nextId++, ...employee };
  employees.push(newEmployee);
  return newEmployee;
};

/**
 * Fetches an employee by their ID.
 * @param {string} id - The ID of the employee to fetch.
 * @returns {Promise<Employee | undefined>} A promise that resolves to the employee if found, or undefined if not found.
 */
export const fetchEmployeeById = async (
  id: string
): Promise<Employee | undefined> => {
  return employees.find((emp) => emp.id === parseInt(id));
};

/**
 * Modifies an existing employee by their ID.
 * @param {string} id - The ID of the employee to modify.
 * @param {Partial<Omit<Employee, "id">>} updatedData - The updated employee data.
 * @returns {Promise<Employee | undefined>} A promise that resolves to the updated employee if found, or undefined if not found.
 */
export const modifyEmployee = async (
  id: string,
  updatedData: Partial<Omit<Employee, "id">>
): Promise<Employee | undefined> => {
  const employee = await fetchEmployeeById(id);
  if (employee) {
    Object.assign(employee, updatedData);
    return employee;
  }
  return undefined;
};

/**
 * Removes an employee by their ID.
 * @param {string} id - The ID of the employee to remove.
 * @returns {Promise<boolean>} A promise that resolves to true if the employee was removed, or false if not found.
 */
export const removeEmployee = async (id: string): Promise<boolean> => {
  const initialLength = employees.length;
  employees = employees.filter((emp) => emp.id !== parseInt(id));
  return employees.length < initialLength; // Return true if an employee was removed
};
