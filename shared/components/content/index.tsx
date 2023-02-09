import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { StyledImage } from '@/shared/components';

export const StyledContent = ({ children }: { children: React.ReactNode }) => (
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
    justify-content: center;
    gap: 20px 0;
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
