const path = require('path');
const fs = require('fs');
const resolve = path.resolve;

(function() {
  const moduleFolder = resolve(__dirname, '../enterprise-edition');
  const moduleJSONPath = resolve(moduleFolder, './package.json');
  const moduleJSON = require(resolve(moduleFolder, './package.json'));

  moduleJSON.versionTimestamp = Date.now();

  fs.writeFileSync(moduleJSONPath, JSON.stringify(moduleJSON, null, 2));
})();
