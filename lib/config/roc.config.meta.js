'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _validators = require('roc/validators');

exports.default = {
    settings: {
        build: {
            mode: {
                override: 'roc-package-webpack-dev',
                validator: /^dev|dist|test$/i
            }
        },
        test: {
            node: {
                __meta: {
                    description: 'Settings related to testing for Node.'
                },
                entry: {
                    description: 'The entry point that Webpack should be using for the tests, will not be needed ' + 'to be changed in most situations.',
                    validator: (0, _validators.notEmpty)(_validators.isPath)
                },
                tests: {
                    path: {
                        description: 'The base path to start resolving tests from, should not be the root of the ' + 'project.',
                        validator: (0, _validators.notEmpty)(_validators.isPath)
                    },
                    pattern: {
                        description: 'Should be either a glob pattern for which the test files are located or a ' + 'RegExp. Will be used if no custom entry point is defined. Will be used to get correct ' + 'code coverage.',
                        validator: (0, _validators.notEmpty)((0, _validators.oneOf)(_validators.isRegExp, _validators.isString))
                    }
                },
                src: {
                    path: {
                        description: 'The base path to start resolving src files from, should not be the root of ' + 'the project.',
                        validator: (0, _validators.notEmpty)(_validators.isPath)
                    },
                    pattern: {
                        description: 'Should be either a glob pattern for which the src files are located or a ' + 'RegExp. Will be used if no custom entry point is defined. Will be used to get correct ' + 'code coverage.',
                        validator: (0, _validators.notEmpty)((0, _validators.oneOf)(_validators.isRegExp, _validators.isString))
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=roc.config.meta.js.map