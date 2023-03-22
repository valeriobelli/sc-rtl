# sc-rtl

## Installation

```bash
yarn add sc-rtl
```

## Usage

First thing first is augmenting the styled-components' `DefaultTheme`.

To do that, you can just add the following into a `styled-components.d.ts` file

```typescript
import 'styled-components'
import type { ThemeProviderRtl } from 'sc-rtl'

declare module 'styled-components' {
 export interface DefaultTheme extends ThemeProviderRtl {}
}

```

as already explained in the styled-components [documentation](https://styled-components.com/docs/api#create-a-declarations-file).

Second thing is to inject the text direction into the ThemeProvider, as you can see in the following example

```typescript
import { ThemeProvider } from "styled-components"
import { rtl } from "sc-rtl"

const Card = styled.div<{ paddingLeft: number }>`
  ${rtl`
    margin-left: 1rem;
    padding-left: ${({ paddingLeft }) => paddingLeft}px;
  `}
`

const root = createRoot(document.getElementById('root'))

root.render(
  <ThemeProvider theme={{ dir: navigator.language === 'ar' ? 'rtl' : 'ltr' }}>
    <Card>
      Hello, world!
    </Card>
  </ThemeProvider>
)
```

Obviously, `navigator.language` is there just for your convenience: you will likely need another strategy to get the page language.

That's it!
