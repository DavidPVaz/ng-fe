import React from 'react';
import styled from 'styled-components';
import { StyledImage } from '@/shared/components';

export const StyledCard = () => (
    <Card>
        <ImageHeader>
            <StyledImage src={'https://i.dummyjson.com/data/products/1/thumbnail.jpg'} alt={'Quest thumbnail'} lazy />
        </ImageHeader>
    </Card>
);

const Card = styled.div`
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    display: flex;
    height: ${({
        theme: {
            height: { card }
        }
    }) => `${card}px`};
    width: ${({
        theme: {
            width: { card }
        }
    }) => `${card}px`};
    border-radius: ${({
        theme: {
            radius: { xl }
        }
    }) => `${xl}`};
    border: ${({
        theme: {
            colors: { darkGrey }
        }
    }) => `1px solid ${darkGrey}80`};
    background: ${({
        theme: {
            colors: { lighterBlack }
        }
    }) => `${lighterBlack}`};

    @media only screen and (max-width: 400px) {
        height: ${({
            theme: {
                width: { card: cardWidth },
                height: { card: cardHeight }
            }
        }) => `calc(((${cardHeight} + 2) / (${cardWidth} + 2)) * 80vw)`};
        width: 80vw;
        min-width: 280px;
        min-height: ${({
            theme: {
                width: { card: cardWidth },
                height: { card: cardHeight }
            }
        }) => `calc(((${cardHeight} + 2) / (${cardWidth} + 2)) * 280px)`};
    }
`;

const calculateImageHeaderHeightPercentage = ({ questListImage, card }: { questListImage: number; card: number }) =>
    (questListImage * 100) / card;

const ImageHeader = styled.div`
    position: relative;
    height: ${({
        theme: {
            height: { card, questListImage }
        }
    }) => `${calculateImageHeaderHeightPercentage({ questListImage, card })}%`};
    width: ${({ theme: { spacing } }) => `calc(100% - (${spacing['5xs']} * 2))`};
    border-radius: ${({
        theme: {
            radius: { l }
        }
    }) => `${l}`};
    margin: ${({ theme: { spacing } }) => `${spacing['5xs']}`};
    overflow: hidden;
`;
