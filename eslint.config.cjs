module.exports = [
  ...require('gts'),
  {
    ignores: ['dist/**', 'docs/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      'no-constant-condition': 0,
      'no-restricted-syntax': ['error', 'SequenceExpression'],
      '@typescript-eslint/no-this-alias': [
        'error',
        {
          allowedNames: ['self'],
        },
      ],
      'prefer-const': ['error', {destructuring: 'all'}],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '_',
        },
      ],
    },
  },
];
