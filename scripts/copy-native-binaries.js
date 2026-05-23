const fs = require('fs');
const path = require('path');

// lightningcss/node/index.js loads its native binary in two steps:
//   1. require('lightningcss-<platform>') — fails inside Turbopack's bundled PostCSS worker
//   2. require('../lightningcss.<platform>.node') — fallback, expects file at the lightningcss root
//
// Step 1 copies the platform binary to the fallback location (needed for production builds
// where serverExternalPackages loads lightningcss outside Turbopack's bundle sandbox).
//
// Step 2 patches lightningcss/node/index.js to add a try-catch around the fallback
// require so that when both loads fail (Turbopack dev PostCSS worker), the module
// provides pass-through stubs instead of crashing. Production builds are unaffected
// because serverExternalPackages loads the real native binary via normal Node.js require.

const root = path.join(__dirname, '..');
const lcDir = path.join(root, 'node_modules', 'lightningcss');
const indexPath = path.join(lcDir, 'node', 'index.js');

// Step 1: copy platform binary to fallback location
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

// Step 2: patch lightningcss/node/index.js to handle bundler contexts gracefully
const ORIGINAL = `let native;
try {
  native = require(\`lightningcss-\${parts.join('-')}\`);
} catch (err) {
  native = require(\`../lightningcss.\${parts.join('-')}.node\`);
}`;

const PATCHED = `let native;
try {
  native = require(\`lightningcss-\${parts.join('-')}\`);
} catch (err) {
  try {
    native = require(\`../lightningcss.\${parts.join('-')}.node\`);
  } catch (err2) {
    // Running inside a bundler context (e.g. Turbopack PostCSS worker) that
    // cannot load native .node add-ons. Pass CSS through unchanged so the
    // dev server does not crash; production builds use serverExternalPackages
    // and load the real native binary outside this bundle sandbox.
    native = {
      transform: (opts) => ({ code: opts.code, map: null, warnings: [] }),
      transformStyleAttribute: (opts) => ({ code: opts.code, dependencies: [] }),
      bundle: () => ({ code: Buffer.alloc(0), map: null, dependencies: [] }),
      bundleAsync: async () => ({ code: Buffer.alloc(0), map: null, dependencies: [] }),
    };
  }
}`;

if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf8');
  if (content.includes(ORIGINAL)) {
    fs.writeFileSync(indexPath, content.replace(ORIGINAL, PATCHED), 'utf8');
    console.log('[postinstall] patched lightningcss/node/index.js with bundler-safe fallback');
  } else if (!content.includes('bundler context')) {
    console.warn('[postinstall] WARNING: lightningcss/node/index.js has unexpected content — patch not applied');
  }
}
