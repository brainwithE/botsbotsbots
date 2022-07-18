const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: ['react-app', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '~/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'app/**',
            group: 'internal',
          },
          {
            pattern: 'utils/**',
            group: 'internal',
          },
          {
            pattern: 'styles/**',
            group: 'internal',
          },
          {
            pattern: 'types/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: { 'prettier/prettier': ['warn', prettierOptions] },
    },
  ],
};
