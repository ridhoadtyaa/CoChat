const config = {
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  importOrder: ['^@/styles/(.*)$', '^@/components(.*)$', '^@/(.*)$', '^[./]', '^'],
  importOrderSortSpecifiers: true,
};

module.exports = config;
