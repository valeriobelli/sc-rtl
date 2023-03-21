import { transform } from 'cssjanus'
import type { FlattenInterpolation, Interpolation } from 'styled-components'
import { css } from 'styled-components'

export type ThemeProviderLtrProps = {
	dir: 'ltr' | 'rtl'
}

export type WithLtrProps<Theme extends { theme: Record<string, unknown> } = { theme: Record<string, unknown> }> = {
	theme: Theme['theme'] & ThemeProviderLtrProps
}

const cssToString = (
	cssStyles: FlattenInterpolation<{ theme: ThemeProviderLtrProps }>,
	theme: ThemeProviderLtrProps,
): string =>
	cssStyles
		.map((fragment) => {
			if (typeof fragment === 'function') {
				const fragmentResult = fragment({ theme })

				if (typeof fragmentResult === 'function') {
					return cssToString([fragmentResult], theme)
				}

				return fragmentResult
			}

			return fragment
		})
		.join('')

export const rtl =
	(
		first: TemplateStringsArray,
		...interpolations: readonly Interpolation<{ theme: ThemeProviderLtrProps }>[]
	): Interpolation<{ theme: ThemeProviderLtrProps }> =>
	({ theme }) => {
		const styles = css<{ theme: ThemeProviderLtrProps }>(first, ...interpolations)

		if (theme.dir === 'ltr') {
			return styles
		}

		return transform(cssToString(styles, theme))
	}
