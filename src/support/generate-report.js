const report = require('multiple-cucumber-html-reporter');
const os = require('os');

report.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html-report',
  metadata: {
    browser: { name: 'chromium', version: 'latest' },
    device: os.hostname(),
    platform: { name: os.platform(), version: os.release() }
  },
  customData: {
    title: 'Info',
    data: [
      { label: 'Proyecto', value: 'SauceDemo QA Automation' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Patrón', value: 'Page Object Model + Cucumber/Gherkin' }
    ]
  }
});
