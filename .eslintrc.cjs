module.exports = {
  root: true,
  env: { node: true },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript',
    '@nuxtjs/eslint-config-typescript',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'max-len': ['warn', { code: 100 }],
    'import/no-cycle': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    // See https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/issues/119
    'vuejs-accessibility/label-has-for': 'off',
    'import/prefer-default-export': 'off',
    'operator-linebreak': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'implicit-arrow-linebreak': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off', // eslint can't seem to resolve ts files
    '@typescript-eslint/consistent-type-imports': 'warn',
    'comma-dangle': ['error', 'only-multiline'],
    'function-paren-newline': 'off',
    semi: ['error', 'always'],
    indent: ['error', 2],
    curly: ['warn', 'multi'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'space-before-function-paren': 'off',
  },
  ignorePatters: [
    "node_modules",
    "build",
    "dist",
    "public"
  ]
};
