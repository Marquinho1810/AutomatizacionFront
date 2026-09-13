const common = {
  paths: ['src/features/**/*.feature'],
  requireModule: ['ts-node/register'],
  require: ['src/step-definitions/**/*.ts', 'src/support/**/*.ts'],
  format: [
    'progress-bar',
    'json:reports/cucumber-report.json',
    'html:reports/cucumber-report.html'
  ],
  formatOptions: { snippetInterface: 'async-await' }
};

module.exports = {
  default: common
};
