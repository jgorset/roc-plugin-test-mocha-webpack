'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = runMocha;

var _mocha = require('mocha');

var _mocha2 = _interopRequireDefault(_mocha);

var _small = require('roc/log/default/small');

var _small2 = _interopRequireDefault(_small);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let runner;
let restart;
let grepRegExp;

function mochaRunner(file) {
    if (runner) {
        _small2.default.note('\nAborting current tests and will restart.\n');
        restart = file;
        runner.abort();
    } else {
        restart = null;
        const mocha = new _mocha2.default();

        if (grepRegExp) {
            mocha.grep(grepRegExp);
        }

        delete require.cache[file];

        mocha.addFile(file);

        runner = mocha.run(() => {
            runner = null;

            if (restart) {
                mochaRunner(restart);
            }
        });
    }
}

function runMocha(grep) {
    // Enable source map support
    // eslint-disable-next-line
    require('source-map-support/register');

    if (grep) {
        grepRegExp = new RegExp(grep);
    }

    return {
        abort: () => {
            if (runner) {
                _small2.default.warn('\nAborting current tests.\n');
                runner.abort();
            }
        },
        run: mochaRunner
    };
}
//# sourceMappingURL=mocha.js.map