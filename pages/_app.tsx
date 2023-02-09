import { useRef } from 'react';
import GlobalStyle from '@/styles/GlobalStyles';
import { darkTheme } from '@/styles/theme';
import { QueryClient, QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

const config: QueryClientConfig = {
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5
        },
        mutations: {
            retry: 5,
            retryDelay: 500
        }
    }
};

export default function App({ Component, pageProps }: AppProps) {
    const client = useRef(new QueryClient(config));

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
                    <Component {...pageProps} />
                </ThemeProvider>
            </QueryClientProvider>
        </>
    );
}
