'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.name = exports.packageJSON = undefined;
exports.invokeHook = invokeHook;

var _roc = require('roc');

// eslint-disable-next-line
const packageJSON = exports.packageJSON = require('../../package.json');

/**
 * The name of the package, for easy consumption.
 */
const name = exports.name = packageJSON.name;

/**
 * Helper function for invoking/running a hook, pre-configured for the current package.
 *
 * @param {...Object} args - The arguments to pass along to the action.
 *
 * @returns {Object|function} - Either a object, the final value from the actions or a function if callback is used.
 */
function invokeHook() {
  return (0, _roc.runHook)(packageJSON.name).apply(undefined, arguments);
}
//# sourceMappingURL=util.js.map