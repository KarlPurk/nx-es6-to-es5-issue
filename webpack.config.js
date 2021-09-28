const nxReactBaseConfig = require('@nrwl/react/plugins/webpack')
const {
  checkModules,
  buildIncludeRegexp,
} = require('are-you-es5')

module.exports = function (webpackConfig, nxConfig) {
    const config = nxReactBaseConfig(webpackConfig)
    const result = checkModules({})
    const es6Regex = buildIncludeRegexp(result.es6Modules)
    // config.module.rules[0].exclude = () => false
    config.module.rules[0].exclude = function (path) {
        if (/\/node_modules\//.test(path) && !es6Regex.test(path)) {
            return true
        }
        console.log("Transpile:", path)
        return false
    }
    config.optimization.moduleIds = "named"
    config.optimization.minimize = false
    return config
}