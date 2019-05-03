const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  chainWebpack: config => {
    config.module
    .rule('ts')
    .use('ts-loader')
    .loader('ts-loader')
    .tap(options => {
      options.getCustomTransformers = () => ({
        before: [tsImportPluginFactory({
          libraryName: 'vant',
          libraryDirectory: 'es',
          style: true
        })]
      });
      return options;
    })
  }
}