const fs = require('fs');
const path = require('path');

// lightningcss/node/index.js loads its native binary in two steps:
//   1. require('lightningcss-<platform>') — fails inside Turbopack's bundled PostCSS worker
//   2. require('../lightningcss.<platform>.node') — fallback, expects file at the lightningcss root
//
// This script copies the installed platform binary to the fallback location so the
// Turbopack dev-mode PostCSS worker can find it after the primary require fails.

const root = path.join(__dirname, '..');
const lcDir = path.join(root, 'node_modules', 'lightningcss');

const platforms = [
  'win32-x64-msvc',
  'win32-arm64-msvc',
  'darwin-x64',
  'darwin-arm64',
  'linux-x64-gnu',
  'linux-arm64-gnu',
  'linux-x64-musl',
  'linux-arm64-musl',
];

for (const platform of platforms) {
  const src = path.join(root, 'node_modules', `lightningcss-${platform}`, `lightningcss.${platform}.node`);
  const dst = path.join(lcDir, `lightningcss.${platform}.node`);
  if (fs.existsSync(src) && !fs.existsSync(dst)) {
    fs.copyFileSync(src, dst);
    console.log(`[postinstall] copied lightningcss.${platform}.node → lightningcss/`);
  }
}
