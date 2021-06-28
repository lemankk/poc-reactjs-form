const createDevServer = require("./dev-server");

module.exports = {
  //do stuff with the webpack config...
  devServer: function (configFunction, env) {
    return function (proxy, allowedHost) {
      const webserverConfig = configFunction(proxy, allowedHost);

      webserverConfig.setup = createDevServer({});

      return webserverConfig;
    };
  },
};
