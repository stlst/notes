module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jquery: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:import/errors', 'plugin:import/warnings'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    inputHelper: true,
    WdatePicker: true,
    openBusMode: true,
    FBLizard: true,
    showErrorMsgBelowU11: true,
    hideErrorMsgBelowU11: true,
    hideAllMsgBelowU11: true,
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },

  rules: {
    'no-undef': 2,
    'no-empty-pattern': 2,
    'import/no-unresolved': 2,
  },
  plugins: ['import'],
};
