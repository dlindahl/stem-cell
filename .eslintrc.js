module.exports = {
  env: {
    es6: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'react-app',
    'standard',
    'plugin:import/errors',
    'plugin:import/react',
    'plugin:import/warnings',
    'plugin:promise/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: [],
  rules: {
    'array-callback-return': 'error',
    'arrow-body-style': 'error',
    'arrow-parens': 'error',
    'arrow-spacing': 'error',
    'capitalized-comments': 'warn',
    'computed-property-spacing': 'warn',
    'consistent-return': 'warn',
    curly: 'warn',
    'default-case': 'error',
    'dot-location': 'error',
    'dot-notation': 'warn',
    'func-names': 'error',
    'func-style': [
      'warn',
      'declaration',
      {
        allowArrowFunctions: true
      }
    ],
    'generator-star-spacing': 'error',
    'jsx-quotes': 'warn',
    'linebreak-style': ['error', 'unix'],
    'max-len': [
      'warn',
      {
        code: 80,
        comments: 80
      }
    ],
    'max-params': 'warn',
    'no-alert': 'error',
    'no-confusing-arrow': 'error',
    'no-console': [
      'warn',
      {
        allow: ['error', 'warn']
      }
    ],
    'no-delete-var': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-empty-function': 'error',
    'no-lonely-if': 'error',
    'no-negated-condition': 'error',
    'no-path-concat': 'error',
    'no-return-assign': 'warn',
    'no-shadow': 'error',
    'no-ternary': 'warn',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'warn',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'warn',
    'no-var': 'error',
    'object-curly-spacing': ['warn', 'always'],
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'quote-props': ['warn', 'as-needed'],
    'react/react-in-jsx-scope': 'off',
    'rest-spread-spacing': 'error',
    'sort-imports': 'off', // TODO: Enable (with pull request)
    'sort-keys': 'error',
    'sort-vars': 'error',
    'spaced-comment': 'error',
    'template-curly-spacing': 'error'
  }
}
