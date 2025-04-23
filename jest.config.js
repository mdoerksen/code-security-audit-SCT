// jest.config.js
module.exports = {
  preset: "ts-jest", // Use ts-jest preset
  testEnvironment: "node", // Set the test environment to Node.js
  moduleFileExtensions: ["ts", "js", "json", "node"], // Specify file extensions
  testPathIgnorePatterns: ["/node_modules/", "/dist/"], // Ignore these paths
};
