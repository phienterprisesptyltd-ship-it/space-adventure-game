import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const app = readFileSync('src/main.js', 'utf8');
assert.match(app, /Array\.from\(\{ length: 20 \}/, 'campaign should generate 20 levels per movie');
assert.match(app, /Force Push/, 'Force powers should be present');
assert.match(app, /saber/i, 'lightsaber-style weapons should be present');
assert.match(app, /180 total levels/, 'UI should advertise the full 180-level campaign');
console.log('smoke checks passed');
