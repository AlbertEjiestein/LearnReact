const { override, fixBabelImports } = require('customize-cra')

// module.exports = function override(config, env){
//   return config
// }

module.exports = override(
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: 'css',
  })
)