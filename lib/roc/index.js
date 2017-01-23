'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _validators = require('roc/validators');

var _roc = require('roc');

var _rocConfig = require('../config/roc.config.js');

var _rocConfig2 = _interopRequireDefault(_rocConfig);

var _rocConfigMeta = require('../config/roc.config.meta.js');

var _rocConfigMeta2 = _interopRequireDefault(_rocConfigMeta);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const lazyRequire = (0, _roc.lazyFunctionRequire)(require);

exports.default = {
    required: {
        'roc-package-webpack-node-dev': '^1.0.0-beta'
    },
    plugins: [require.resolve('roc-abstract-plugin-test')],
    dependencies: {
        exports: (0, _roc.generateDependencies)(_util.packageJSON, ['expect'])
    },
    config: _rocConfig2.default,
    meta: _rocConfigMeta2.default,
    actions: [{
        hook: 'run-test-command',
        description: 'Adds support for running tests with nyc using Webpack.',
        action: lazyRequire('../actions/test')
    }, {
        extension: _util.name,
        hook: 'build-webpack',
        description: 'Adds Webpack configuration specific for tests.',
        action: lazyRequire('../actions/webpack')
    }, {
        hook: 'babel-config',
        action: lazyRequire('../actions/babel')
    }],
    hooks: {
        'build-webpack': {
            description: 'Used to create the final Webpack configuration object for tests.',
            initialValue: {},
            returns: (0, _validators.isObject)(),
            arguments: {
                target: {
                    validator: _validators.isString,
                    description: 'The target for which the Webpack configuration should be build for.'
                },
                babelConfig: {
                    validator: (0, _validators.isObject)(),
                    description: 'The Babel configuration that should be used for the Webpack build.'
                }
            }
        },
        'babel-config': {
            description: 'Used to create a Babel configuration to be used in the Webpack build for test.',
            initialValue: {},
            returns: (0, _validators.isObject)(),
            arguments: {
                target: {
                    validator: _validators.isString,
                    description: 'The target that is used.'
                },
                coverage: {
                    validator: _validators.isBoolean,
                    description: 'If the code should be prepared for coverage generation.'
                }
            }
        }
    },
    commands: {
        development: {
            test: {
                override: 'roc-abstract-plugin-test',
                options: {
                    grep: {
                        alias: 'g',
                        description: 'Will only run tests that match the given pattern. ' + 'Will be compiled to a RegExp.',
                        validator: _validators.isString
                    },
                    watch: {
                        alias: 'w',
                        description: 'If the tests should run in watch mode.',
                        default: false,
                        validator: _validators.isBoolean
                    },
                    coverage: {
                        description: 'If coverage reports should be generated for the code.',
                        default: undefined,
                        validator: _validators.isBoolean
                    },
                    runtime: {
                        alias: 'r',
                        description: 'If the runtime from roc-plugin-start should be added.',
                        default: false,
                        validator: _validators.isBoolean
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=index.js.map