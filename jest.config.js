module.exports =
{
    testEnvironment: "node",
    testMatch: ["**/src/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
    testPathIgnorePatterns: ["/node_modules/"],
    setupFilesAfterEnv: ["./jest.setup.js"],
    transform: { "^.+\\.tsx?$": "ts-jest" },
    preset: "jest-playwright-preset",
    reporters: [
        "default",
        ["jest-html-reporters",
            {
                "publicPath": "./ApplicationTestReport",
                "filename": "SurveyTestReport.html",
                "expand": true,
                "pageTitle": "Survey Test",
                "includeFailureMsg": false,
                
            }
        ]

    ]
};



