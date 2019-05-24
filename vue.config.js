const tsImportPluginFactory = require('ts-import-plugin');
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const nodeExternals = require("webpack-node-externals");
const merge = require("lodash.merge");
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";

module.exports = {
  devServer: {
    host: '0.0.0.0'
  },
  css: {
    extract: false
  },
  configureWebpack: () => ({
    // 将 entry 指向应用程序的 server / client 文件
    entry: `./src/entry-${target}.js`,
    // 对 bundle renderer 提供 source map 支持
    devtool: 'source-map',
    target: TARGET_NODE ? "node" : "web",
    node: TARGET_NODE ? undefined : false,
    output: {
      libraryTarget: TARGET_NODE ? "commonjs2" : undefined
    },
    // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖。
    externals: TARGET_NODE
      ? nodeExternals({
          // 排除要打包的模块
          whitelist: [/\.(css|less)$/]
        })
      : undefined,
    optimization: {
      splitChunks: undefined
    },
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
  }),
  chainWebpack: config => {
    /* config.module
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
    }); */


    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options => {
        merge(options, {
          optimizeSSR: false
        });
      });
  }
}