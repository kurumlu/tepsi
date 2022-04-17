/* eslint-disable */
const spawn = require('cross-spawn');

if (process.env.NODE_ENV === 'local') {
  spawn('yarn', ['prepublishLocal'], { stdio: 'inherit' });
} else {
  spawn('yarn', ['prepublishDefault'], { stdio: 'inherit' });
}
