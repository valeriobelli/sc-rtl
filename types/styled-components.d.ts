import 'styled-components'
import type { ThemeProviderRtl } from '../src/index'

declare module 'styled-components' {
	export interface DefaultTheme extends ThemeProviderRtl {}
}
