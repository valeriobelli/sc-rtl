import { transform } from 'cssjanus'
import type { DefaultTheme, FlattenInterpolation, Interpolation } from 'styled-components'
import { css } from 'styled-components'

export type RtlDir = 'ltr' | 'rtl'

export interface ThemeProviderRtl {
	dir: RtlDir
}

const cssToString = <P>(
	cssStyles: FlattenInterpolation<P>,
	theme: DefaultTheme,
	props: Record<string, unknown>,
): string =>
	cssStyles
		.map((fragment) => {
			if (typeof fragment === 'function') {
				const fragmentResult = fragment({ theme, ...props } as P)

				if (typeof fragmentResult === 'function') {
					return cssToString([fragmentResult], theme, props)
				}

				return fragmentResult
			}

			return fragment
		})
		.join('')

export const rtl =
	<Props extends Record<string, unknown>>(
		first: TemplateStringsArray,
		...interpolations: readonly Interpolation<{ theme: DefaultTheme } & Props>[]
	): Interpolation<{ theme: DefaultTheme } & Props> =>
	({ theme, ...props }) => {
		const flattenInterpolations = css<Props>(first, ...interpolations)

		if (theme.dir === 'ltr') {
			return flattenInterpolations
		}

		return transform(cssToString(flattenInterpolations, theme, props))
	}
