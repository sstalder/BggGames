const rewireMobX = require('react-app-rewire-mobx');

module.exports = function override(config, env) {
    // Add support for decorators
    config = rewireMobX(config, env);

    return config;
}