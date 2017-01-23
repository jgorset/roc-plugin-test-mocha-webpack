'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

exports.default = (_ref) => {
    let settings = _ref.context.config.settings;
    return (target, coverage) => {
        if (settings.build.mode === 'test' && target === 'node' && coverage) {
            return babelConfig => {
                // eslint-disable-next-line
                babelConfig.env.test = _extends({}, babelConfig.env.test, {
                    plugins: [[require.resolve('babel-plugin-istanbul'), {
                        include: `${settings.test.node.src.path}/**/*.js`
                    }]].concat(_toConsumableArray((babelConfig.env.test || {}).plugins || []))
                });

                return babelConfig;
            };
        }

        return undefined;
    };
};
//# sourceMappingURL=babel.js.map