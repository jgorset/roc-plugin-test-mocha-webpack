'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _roc = require('roc');

var _util = require('../roc/util');

var _nyc = require('../nyc');

var _nyc2 = _interopRequireDefault(_nyc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => (targets, _ref) => {
    let grep = _ref.grep;
    let watch = _ref.watch;
    let coverage = _ref.coverage;
    let runtime = _ref.runtime;

    if (targets.find(target => target === 'node')) {
        return () => {
            // By default set coverage to true in non-watch
            const cover = coverage === undefined ? !watch : coverage;

            (0, _roc.appendSettings)({ build: { mode: 'test' } });

            // Create Webpack configuration that is to be used in a node.
            const babelConfig = (0, _util.invokeHook)('babel-config', 'node', cover);
            const webpackConfig = (0, _util.invokeHook)('build-webpack', 'node', babelConfig);

            (0, _nyc2.default)({ grep, watch, coverage: cover, runtime, webpackConfig });
        };
    }

    return undefined;
};
//# sourceMappingURL=test.js.map