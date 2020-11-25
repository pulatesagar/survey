module.exports = 
{
    testEnvironment: "node",
    testMatch: ["**/src/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
    testPathIgnorePatterns: ["/node_modules/"],
    setupFilesAfterEnv: ["./jest.setup.js"],
    transform: {"^.+\\.tsx?$": "ts-jest"},
    preset: "jest-playwright-preset",
    reporters: [
        "default",
        ["jest-html-reporters", {
            "publicPath": "./ApplicationTestReport",
            "filename": "Survey.html",
            "expand": true,
            "pageTitle": "Survey Test",
            "includeFailureMsg": false,


        }]
        
      ]
      // collectCoverage: false,
      // collectCoverageFrom: [
      //   "**/codecoverage_sample/*.ts",
      //   "!**/node_modules/**",
      //   "!**/vendor/**"
      // ],
      // coverageDirectory: "../coverage/"

      
};



