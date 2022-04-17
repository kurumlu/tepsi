// do it inline in sync way
// to make it work in non-npm environment
var yarnBin,
  executioner,
  path = require('path'),
  node = process.argv[0];

const userAgent = process.env.npm_config_user_agent;
const isYarn = Boolean(userAgent && userAgent.startsWith('yarn'));
const isNpm = Boolean(userAgent && userAgent.startsWith('npm'));

if (
  process.env['npm_execpath'] &&
  process.env['npm_execpath'].match(/bin[\/\\]yarn\.js$/)
) {
  var execPath = process.env['npm_execpath'];
  var expectedPath = path.join('bin', 'yarn.js');
  if (execPath.slice(-1 * expectedPath.length) === expectedPath) {
    yarnBin = path.resolve(execPath, '..', '..', 'lib', 'cli');
  }
}

// if no yarn module found, don't expose any function
// to allow upstream modules find alternatives
module.exports = null;

if (yarnBin) {
  executioner = require('executioner');

  module.exports = function(packages, extra, done) {
    var options = {
      node: node,
      // escape package names@versions
      yarn: yarnBin,
      packages: packages.map(pkg => '"' + pkg + '"').join(' '),
    };

    executioner(
      '"${node}" "${yarn}" add --peer --no-lockfile ${packages}',
      options,
      function(error, result) {
        if (error) {
          console.error('Unable to install peerDependencies', error);
          process.exit(1);
          return;
        }
        done(result);
      }
    );

    // Looks like yarn shows last line from the output of sub-scripts
    console.log('Installing peerDependencies as devDependencies...');
  };
}
