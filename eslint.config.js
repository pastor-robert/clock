export default [
  {
    ignores: ["node_modules/**", "eslint.config.js"]
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        Intl: "readonly",
        setInterval: "readonly",
        qrcode: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "semi": ["error", "always"],
      "quotes": ["warn", "single", { "avoidEscape": true }]
    }
  }
];
