import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const app = readFileSync('src/main.js', 'utf8');
const html = readFileSync('index.html', 'utf8');

assert.match(app, /Array\.from\(\{ length: 20 \}/, 'campaign should generate 20 levels per movie');
assert.match(app, /Force Push/, 'Force powers should be present');
assert.match(app, /saber/i, 'lightsaber-style weapons should be present');
assert.match(app, /180 total levels/, 'UI should advertise the full 180-level campaign');
assert.doesNotMatch(app, /import ['"].*\.css['"]/, 'native browser module should not import CSS directly');
assert.match(html, /href="\.\/src\/styles\.css"/, 'CSS should use a relative GitHub Pages-safe path');
assert.match(html, /src="\.\/src\/main\.js"/, 'JS should use a relative GitHub Pages-safe path');
console.log('smoke checks passed');
