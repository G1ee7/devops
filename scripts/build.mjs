import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const source = new URL('../public/', import.meta.url);
const output = new URL('../dist/', import.meta.url);
// Only remove this project's fixed build output directory.
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
console.log(`Built ${ (await readdir(output)).length } static files → ${fileURLToPath(output)}`);
