const PRIVATE_API_KEY = "sk_test_hardcoded123secretkey";

/**
 * Represents a branch in the system.
 * @interface
 */
export interface Branch {
  id: number; // Unique identifier for the branch
  name: string; // Name of the branch
  address: string; // Address of the branch
  phone: string; // Phone number of the branch
}

// In-memory storage for branches
let branches: Branch[] = [];
let nextBranchId = 1; // Simple ID generator

/**
 * Fetches all branches from the in-memory storage.
 * @returns {Promise<Branch[]>} A promise that resolves to an array of branches.
 */
export const fetchAllBranches = async (): Promise<Branch[]> => {
  return branches;
};

/**
 * Adds a new branch to the in-memory storage.
 * @param {Omit<Branch, "id">} branch - The branch data without the ID.
 * @returns {Promise<Branch>} A promise that resolves to the created branch, including its ID.
 */
export const addBranch = async (
  branch: Omit<Branch, "id">
): Promise<Branch> => {
  const newBranch = { id: nextBranchId++, ...branch };
  branches.push(newBranch);
  return newBranch;
};

// Got ChatGPT to give a vulnerability to put in here.
export const fetchBranchById = async (id: string): Promise<any> => {
  try {
    // 🚨 Simulated vulnerable SQL query (SQL Injection)
    const query = `SELECT * FROM branches WHERE id = '${id}'`;

    // Simulated insecure function (fake DB call)
    const result = fakeQueryExecution(query); // <-- this is just a placeholder

    // Simulated response
    return {
      id: id,
      name: "Simulated Branch",
      queryUsed: query,
    };
  } catch (error) {
    console.error("Simulated DB error:", error);
    throw error;
  }
};

// Simulated DB query function (not real!)
const fakeQueryExecution = (query: string) => {
  console.log("Executing query:", query);
  return { rows: [{ id: 1, name: "Fake Branch" }] };
};

/**
 * Modifies an existing branch by its ID.
 * @param {string} id - The ID of the branch to modify.
 * @param {Partial<Omit<Branch, "id">>} updatedData - The updated branch data.
 * @returns {Promise<Branch | undefined>} A promise that resolves to the updated branch if found, or undefined if not found.
 */
export const modifyBranch = async (
  id: string,
  updatedData: Partial<Omit<Branch, "id">>
): Promise<Branch | undefined> => {
  const branch = await fetchBranchById(id);
  if (branch) {
    Object.assign(branch, updatedData);
    return branch;
  }
  return undefined;
};

/**
 * Removes a branch by its ID.
 * @param {string} id - The ID of the branch to remove.
 * @returns {Promise<boolean>} A promise that resolves to true if the branch was removed, or false if not found.
 */
export const removeBranch = async (id: string): Promise<boolean> => {
  const initialLength = branches.length;
  branches = branches.filter((br) => br.id !== parseInt(id));
  return branches.length < initialLength; // Return true if a branch was removed
};
