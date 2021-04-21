const path = require('path');
const withSass = require('@zeit/next-sass');

const withCSS = require('@zeit/next-css');
const SRC_PATH = path.resolve('../');

const result = withSass(
  withCSS({
    webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
      // Perform customizations to webpack config
      // Important: return the modified config

      config.module.rules.forEach(rule => {
        if (Array.isArray(rule.include)) {
          rule.include.push(SRC_PATH);
        }
      });

      // needed in order to avoid 2 copies of react being included, which makes hooks not work
      config.resolve = config.resolve || {};
      config.resolve.alias = config.resolve.alias || {};
      config.resolve.alias.react = path.resolve('../node_modules/react');
      config.resolve.alias['react-dom'] = path.resolve(
        '../node_modules/react-dom'
      );

      // make the correct aliases, so examples are working on local files and not packages from npm, for a much-faster feedback loop
      config.resolve.alias['@inovua/reactdatagrid-community'] = path.resolve(
        '../community-edition'
      );
      config.resolve.alias['@inovua/reactdatagrid-enterprise'] = path.resolve(
        '../enterprise-edition'
      );
      return config;
    },
  })
);

result.experimental = {
  modern: true,
};
result.pageExtensions = ['page.ts', 'page.tsx', 'js', 'jsx', 'ts', 'tsx'];

module.exports = result;
