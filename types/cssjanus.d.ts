declare module 'cssjanus' {
	type Options = {
		transformDirInUrl?: boolean
		transformEdgeInUrl?: boolean
	}

	// eslint-disable-next-line no-unused-vars
	export const transform: (styles: string, options?: Options) => string
}
