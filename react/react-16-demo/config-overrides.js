const {
  override,
  addPostcssPlugins,
  fixBabelImports
} = require("customize-cra");

module.exports = override(
  addPostcssPlugins([
    require("postcss-normalize")({
      forceImport: true
    }),
    require("postcss-preset-env")({
      stage: 0
    })
  ]),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  })
);
