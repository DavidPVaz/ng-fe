import { createGlobalStyle, DefaultTheme } from 'styled-components';

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
@font-face {
	font-family: Lato;
	src: url('/fonts/lato_regular.ttf');
	font-style: normal;
	font-weight: 400;
}

body {
	margin: 0;
  background-color: ${({ theme }) => theme.colors.black};
}
`;

export default GlobalStyle;
