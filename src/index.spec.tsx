import { render } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import styled, { ThemeProvider as BaseThemeProvider, css } from 'styled-components'
import { describe, expect, it } from 'vitest'
import type { ThemeProviderLtrProps, WithLtrProps } from '.'
import { rtl } from '.'

const ThemeProvider = ({ children, theme }: PropsWithChildren<{ theme: ThemeProviderLtrProps }>) => (
	<BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>
)

describe('rtl', () => {
	it('lefts intact styles when in ltr', () => {
		const Component = styled.div`
			margin-left: 16px;
		`

		const Wrapper = ({ children }: PropsWithChildren) => (
			<ThemeProvider theme={{ dir: 'ltr' }}>{children}</ThemeProvider>
		)

		const { container } = render(<Component />, { wrapper: Wrapper })

		expect(container.firstChild).toMatchSnapshot()
	})

	it('lefts intact styles when in rtl not applied to "rtl" template literal', () => {
		const Component = styled.div`
			margin-left: 16px;
		`

		const Wrapper = ({ children }: PropsWithChildren) => (
			<ThemeProvider theme={{ dir: 'rtl' }}>{children}</ThemeProvider>
		)

		const { container } = render(<Component />, { wrapper: Wrapper })

		expect(container.firstChild).toMatchSnapshot()
	})

	it('reverses styles when in rtl and the styles are applied to "rtl" template literal', () => {
		const Component = styled.div`
			${rtl`
				margin-left: 16px;

				${css<WithLtrProps>`
					${({ theme: { dir } }) => (dir === 'ltr' ? 'text-align: left;' : 'text-align: right;')}

					padding-right: 8px;

					@keyframes foo {
					}
				`}
			`}
		`

		const Wrapper = ({ children }: PropsWithChildren) => (
			<ThemeProvider theme={{ dir: 'rtl' }}>{children}</ThemeProvider>
		)

		const { container } = render(<Component />, { wrapper: Wrapper })

		expect(container.firstChild).toMatchSnapshot()
	})
})
