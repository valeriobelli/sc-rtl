import * as esbuild from 'esbuild'
import { readFile } from 'fs/promises'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
const peerDependencies = Object.keys(JSON.parse(await readFile('package.json', 'utf-8')).peerDependencies)

/** @type {import('esbuild').BuildOptions} */
const commonOptions = {
	bundle: true,
	entryPoints: ['src/index.ts'],
	external: [...peerDependencies],
	tsconfig: './tsconfig.lib.json',
}

await Promise.all([
	esbuild.build({
		...commonOptions,
		format: 'esm',
		outfile: 'dist/index.mjs',
	}),
	esbuild.build({
		...commonOptions,
		format: 'cjs',
		outfile: 'dist/index.cjs',
	}),
])
