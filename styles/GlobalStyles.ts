import { createGlobalStyle, DefaultTheme } from 'styled-components';

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
//========================================================================================================
// GENERAL
//========================================================================================================

body {
	margin: 0;
  background-color: ${({ theme }) => theme.colors.black};
}

`;

export default GlobalStyle;
