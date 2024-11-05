module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ["prettier", "eslint:recommended"],
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src/"]
      }
    }
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true
    },
    ecmaVersion: 12
  },
  plugins: ["prettier"],
  ignorePatterns: ["node_modules", "**/*.scss"],
  rules: {
    "no-param-reassign": 1,
    "import/order": 0,
    "no-console": 0,
    "prefer-destructuring": 0,
    "no-shadow": 0,
    "no-unused-vars": [
      1,
      {
        ignoreRestSiblings: false
      }
    ],
    "prettier/prettier": [
      2,
      {
        bracketSpacing: true,
        printWidth: 120,
        trailingComma: "none",
        tabWidth: 2,
        useTabs: false,
        endOfLine: "auto"
      }
    ]
  }
};
