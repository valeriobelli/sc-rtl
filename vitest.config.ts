import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'happy-dom',
		globals: true,
		mockReset: true,
		setupFiles: ['./vitest.setup.ts'],
		snapshotFormat: {
			printBasicPrototype: false,
		},
	},
})
