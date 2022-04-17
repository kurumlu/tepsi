module.exports = {
  extends: './.eslintrc.js',
  rules: {
    'no-console': [
      'error',
      {
        allow: [
          'info',
          'warn',
          'dir',
          'error',
          'timeLog',
          'assert',
          'clear',
          'count',
          'countReset',
          'group',
          'groupEnd',
          'table',
          'dirxml',
          'groupCollapsed',
          'Console',
          'profile',
          'profileEnd',
          'timeStamp',
          'context',
        ],
      },
    ], // https://eslint.org/docs/rules/no-console
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
  },
};
