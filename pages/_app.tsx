import { useRef } from 'react';
import { QueryClient, QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import GlobalStyle from '@/styles/GlobalStyles';
import { darkTheme } from '@/styles/theme';
import type { AppProps } from 'next/app';
import styled, { ThemeProvider } from 'styled-components';
import { StyledImage } from '@/shared/components';

const config: QueryClientConfig = {
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false
        },
        mutations: {
            retry: 5,
            retryDelay: 500
        }
    }
};

declare global {
    interface Window extends Global {
        Cypress: any;
        queryClient: any;
        appReady: boolean;
    }
}

export default function App({ Component, pageProps }: AppProps) {
    const client = useRef(new QueryClient(config));

    if (global?.window?.Cypress) {
        global.window.queryClient = client;
        global.window.appReady = true;
    }

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.svg" />
                <meta name="robots" content="noindex" />
            </Head>

            <QueryClientProvider client={client.current}>
                <ThemeProvider theme={darkTheme}>
                    <GlobalStyle />
                    <StyledContent>
                        <Component {...pageProps} />
                    </StyledContent>
                </ThemeProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
}

const StyledContent = ({ children }: { children: React.ReactNode }) => (
    <>
        <Head>
            <title>Node Guardians</title>
            <meta name="description" content="Node Guardians frontend" />
        </Head>

        <Content>
            <Logo>
                <StyledImage src={'https://nodeguardians.io/assets/logo-white.svg'} alt={'Node Guardians logo'} />
            </Logo>

            {children}
        </Content>
    </>
);

const Content = styled.main`
    display: flex;
    width: 100vw;
    min-height: 100vh;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
`;

const Logo = styled.div`
    position: absolute;
    width: 285px;
    height: 34.82px;
    left: 28px;
    top: 10px;

    @media only screen and (max-width: 450px) {
        width: 200px;
        height: auto;
        left: calc(50% - (200px / 2));
    }
`;
