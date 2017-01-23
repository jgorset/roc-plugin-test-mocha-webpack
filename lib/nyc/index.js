'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = nycRunner;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _roc = require('roc');

var _rocPackageWebpackDev = require('roc-package-webpack-dev');

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _mocha = require('./mocha');

var _mocha2 = _interopRequireDefault(_mocha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _roc.initLog)();

const nyc = require.resolve('nyc/bin/nyc');
const mocha = require.resolve('mocha/bin/mocha');

const getGrep = grep => grep ? ` --grep ${grep}` : '';
const coverageCommand = `${nyc} --reporter=text-summary --include /`;

const mochaCommand = (artifact, grep) => `${mocha} ` + `${getGrep(grep)} ${artifact}`;

const getCommand = (artifact, grep, coverage) => coverage ? `${coverageCommand} ${mochaCommand(artifact, grep)}` : mochaCommand(artifact, grep);

const cleanupCoverage = () => _rimraf2.default.sync(_path2.default.join(process.cwd(), '.nyc_output'));

function getArtifact(compiler, err, stats) {
    if (err) {
        throw err;
    }

    const statsJson = stats.toJson();

    if (statsJson.errors.length > 0 || statsJson.warnings.length > 0) {
        if (statsJson.errors.length > 0) {
            statsJson.errors.map(error => log.small.warn(error));
        }

        if (statsJson.warnings.length > 0) {
            statsJson.warnings.map(warning => log.small.warn(warning));
        }

        return undefined;
    }

    let bundleName = `${(0, _roc.getSettings)('build').name}.js`;

    if (statsJson.assets && statsJson.assets.length > 0) {
        bundleName = (0, _rocPackageWebpackDev.parseStats)(statsJson).script[0];
    }

    return _path2.default.join(compiler.outputPath, '/', bundleName);
}

let runningTest = false;
let nextCommand;

function runTest(command) {
    function cleanupCoverageWrapper() {
        cleanupCoverage();
        if (nextCommand) {
            runTest(nextCommand);
        } else {
            runningTest = false;
        }
    }

    nextCommand = null;
    runningTest = true;
    (0, _roc.execute)(command).then(cleanupCoverageWrapper, cleanupCoverageWrapper);
}

function watchTest(command) {
    if (runningTest) {
        nextCommand = command;
    } else {
        runTest(command);
    }
}

function nycRunner(_ref) {
    let grep = _ref.grep;
    let watch = _ref.watch;
    let coverage = _ref.coverage;
    let runtime = _ref.runtime;
    let webpackConfig = _ref.webpackConfig;

    const compiler = (0, _webpack2.default)(webpackConfig);

    if (watch) {
        let mochaRunner;

        if (coverage) {
            log.small.info('You have enabled coverage for the watch mode for roc-plugin-test-mocha-webpack. ' + 'This will make the tests run slower, the recommendation is to not use coverage in watch mode.');

            process.env.ROC_TEST_RUNTIME = runtime;
        } else {
            if (runtime) {
                // eslint-disable-next-line
                require('roc-plugin-start').initRuntime(false, true);
            }

            mochaRunner = (0, _mocha2.default)(grep);
        }

        compiler.watch({
            poll: true
        }, (err, stats) => {
            const artifact = getArtifact(compiler, err, stats);
            if (artifact) {
                if (coverage) {
                    process.env.ROC_TEST_ENTRY = artifact;
                    watchTest(getCommand(require.resolve('./utils/runtime'), grep, coverage));
                } else {
                    mochaRunner.run(artifact);
                }
            } else if (mochaRunner) {
                mochaRunner.abort();
            }
        });
    } else {
        compiler.run((err, stats) => {
            process.env.ROC_TEST_ENTRY = getArtifact(compiler, err, stats);
            (0, _roc.executeSyncExit)(getCommand(require.resolve('./utils/runtime'), grep, coverage));

            if (coverage) {
                (0, _roc.executeSyncExit)(`${nyc} report --report-dir coverage/nyc/html --reporter=html`);
                (0, _roc.executeSyncExit)(`${nyc} report --report-dir coverage/nyc/cobertura --reporter=cobertura`);
                cleanupCoverage();
            }
        });
    }
}
//# sourceMappingURL=index.js.map