'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _roc = require('roc');

var _micromatch = require('micromatch');

var _micromatch2 = _interopRequireDefault(_micromatch);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRegexp(regexp) {
    if (regexp instanceof RegExp) {
        return regexp;
    }

    return _micromatch2.default.makeRe(`./${regexp}`);
}

exports.default = (_ref) => {
    var _ref$context = _ref.context;
    let settings = _ref$context.config.settings;
    let directory = _ref$context.directory;
    return () => webpackConfig => {
        const newWebpackConfig = _extends({}, webpackConfig);

        newWebpackConfig.devtool = 'inline-source-map';

        const entry = settings.test.entry ? (0, _roc.getAbsolutePath)(settings.test.entry) : './utils/entry';

        newWebpackConfig.entry[newWebpackConfig.rocMetaInfo.outputName] = require.resolve(entry);

        // Always include the entry point
        newWebpackConfig.externals.unshift({
            [require.resolve(entry)]: false
        });

        newWebpackConfig.resolve.alias = _extends({}, newWebpackConfig.resolve.alias, {
            src: (0, _path.join)(directory, settings.test.node.src.path)
        });

        newWebpackConfig.plugins.push(new _webpack2.default.DefinePlugin({
            __PATH_TESTS__: JSON.stringify((0, _path.join)(directory, settings.test.node.tests.path)),
            __PATTERN_TESTS__: getRegexp(settings.test.node.tests.pattern),
            __PATH_SRC__: JSON.stringify((0, _path.join)(directory, settings.test.node.src.path)),
            __PATTERN_SRC__: getRegexp(settings.test.node.src.pattern)
        }));

        return newWebpackConfig;
    };
};
//# sourceMappingURL=webpack.js.map