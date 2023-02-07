import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { KeyStrings } from '@/types/theme';
import { StyledImage } from '@/shared/components';

export const StyledCard = () => (
    <Card>
        <ImageHeader>
            <StyledImage src={'https://i.dummyjson.com/data/products/1/thumbnail.jpg'} alt={'Quest thumbnail'} lazy />
        </ImageHeader>
        <DetailsTop>
            <QuestTitle>delegate call detection</QuestTitle>
        </DetailsTop>
        <Details>
            <SpecWrapper>
                <Spec color={'gold'}>Skill tree</Spec>
                <Spec>Spec</Spec>
            </SpecWrapper>
            <SpecWrapper>
                <Spec color={'gold'}>Spec</Spec>
                <Spec>Spec</Spec>
            </SpecWrapper>
            <SpecWrapper>
                <Spec color={'gold'}>Spec</Spec>
                <Spec>Spec</Spec>
            </SpecWrapper>
            <SpecWrapper>
                <Spec color={'gold'}>Spec</Spec>
                <Spec>Spec</Spec>
            </SpecWrapper>
            <SpecWrapper>
                <Spec color={'gold'}>Spec</Spec>
                <Spec>Spec</Spec>
            </SpecWrapper>
            <SpecWrapper>
                <Spec color={'gold'}>Spec</Spec>
                <Spec>Spec</Spec>
            </SpecWrapper>
        </Details>
    </Card>
);

const Card = styled.div`
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    display: flex;
    overflow: hidden;
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
    margin: ${({ theme: { spacing } }) => `${spacing['5xs']} ${spacing['5xs']} 0 ${spacing['5xs']}`};
    overflow: hidden;
`;

const DetailsTop = styled.div`
    margin-top: 3.89px;
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 12px;
    height: 19px;
`;

const QuestTitle = styled.span`
    display: flex;
    align-items: center;
    font-family: Cinzel;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    color: ${({
        theme: {
            colors: { white }
        }
    }) => white};
`;

const Details = styled.div`
    margin-top: 8px;
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-left: 12px;
    padding-right: 12px;
    gap: 10px 20px;

    @media only screen and (max-width: 400px) {
        gap: 6px 10px;
    }
`;

const SpecWrapper = styled.div`
    position: relative;
    flex: calc(45%);
    height: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: flex-start;
    align-items: center;
`;

const Spec = styled.span`
    font-family: Lato;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    min-width: 60px;
    text-align: left;
    text-transform: capitalize;
    color: ${({ color, theme: { colors } }: any) => colors[color] ?? colors.white};
`;
