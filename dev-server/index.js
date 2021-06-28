const Path = require('path');
const express = require('express');
module.exports = function createDevServer (options) {
  const { stubPath = '/stubs' } = options;
  // const rootDir = Path.dirname(__dirname);
  const curDir = Path.resolve(__dirname);
  const stubsDir = Path.join(curDir, 'stubs');

  // Setup local stubs endpoint 
  return app => {
    app.use(stubPath, function(req, res, next) {
      express.static(stubsDir)(req, res, next);
    })
  }
}