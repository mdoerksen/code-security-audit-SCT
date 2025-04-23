# Debugging Analysis

## Scenario 1: Update Employee

- **Breakpoint Location:** `employeeController.ts`, line 96
- **Objective:** I wanted to see what happens when an employee gets updated and make sure the data is going through correctly.

### Debugger Observations

- **Variable States:**

  - `id = "1"`
  - `updatedEmployee = { position: "Senior Advisor", phone: "555-9876" }`
  - `result = undefined` (at this point in the pause)

- **Call Stack:**

  - The request came into `updateEmployee`
  - Paused right at the call to `modifyEmployee`
  - After that, it would either return the updated employee or a 404

- **Behavior:**
  - The employee ID didn't exist in memory, so it went into the 404 response
  - The update logic didn't break, just returned `undefined` as expected

### Analysis

- This helped show how params and request body data are used together.
- It confirmed that the controller correctly checks if the employee exists before updating.
- Nothing crashed, which is good—it just returned “Employee not found” if the ID wasn't valid.
- I also saw how `await` holds everything until `modifyEmployee` finishes running.

## Scenario 2: Get Employee by ID (Not Found)

- **Breakpoint Location:** `employeeController.ts`, line 71
- **Objective:** I wanted to see how the app handles a request for an employee that doesn't exist and make sure it returns a 404 correctly.

### Debugger Observations

- **Variable States:**

  - `id = "9999"` (a fake ID I used to trigger the error)
  - `employee = undefined`
  - Inside the `res` object, the `_header` showed: `HTTP/1.1 404 Not Found`

- **Call Stack:**

  - The request hit `getEmployeeById`
  - Paused at the `if (employee)` line
  - It was about to send the 404 JSON response

- **Behavior:**
  - Since the employee wasn't found, it went into the `else` block
  - The response sent back was: `{ message: "Employee not found" }` with a 404 code

### Analysis

- This confirmed that the controller handles missing employees properly.
- The header clearly showed the response status was set to 404.
- The logic was simple but worked—if no employee, return an error.
- It was helpful to see that Express sets up the response header before sending it.

## Scenario 3: Deleting a Branch by ID

- **Breakpoint Location:** `branchService.ts`, line 73
- **Objective:** To see how the branch is removed from the in-memory array and make sure the logic works.

### Debugger Observations

- **Variable States:**
  - `initialLength = 1`
  - `branches = [{ id: 1, name: "Debug Branch", address: "123 Debug Street", phone: "555-9999" }]`
  - `id = "1"`
- **Call Stack:**
  - The call started in `deleteBranch` (in `branchController.ts`)
  - Then it went into `removeBranch` (in `branchService.ts`)
  - The program paused on the line that filters out the branch with the matching ID.
- **Behavior:**
  - It correctly filters out the branch with ID 1.
  - The final return value will be `true` because the branch count changes.

### Analysis

- The deletion logic works as expected. It checks the length of the array before and after removing the branch.
- The filter condition is simple but effective: `br.id !== parseInt(id)`
- I realized earlier that restarting the server wiped the in-memory data, so I had to re-create the branch first. That helped me understand how temporary this storage is.
- This scenario shows that the delete feature works, and helped me understand how data gets removed and confirmed.
