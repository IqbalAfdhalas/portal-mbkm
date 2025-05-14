// eslint.config.js
import next from 'eslint-config-next';
import prettier from 'eslint-config-prettier';

export default [
  ...next(),
  {
    rules: {
      // Opsional tambahan rule
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
  prettier,
];
