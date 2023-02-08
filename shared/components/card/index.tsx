import React from 'react';
import styled from 'styled-components';
import { StyledImage, StyledSword } from '@/shared/components';
import { COLORS } from '@/shared/enums';
import { Quest } from '@/types/quests';

enum EXPECTED {
    SKILL_TREE = 'skillTree',
    DIFFICULTY = 'difficulty'
}
const isKey = ({ key, expected }: { key: string; expected: string }) => key === expected;

const renderSwords = (difficulty: number) =>
    Array(5)
        .fill(0)
        .map((_, index) => <StyledSword key={index} color={difficulty > index ? COLORS.GOLD : undefined} />);

export const StyledCard = ({ cover, id, title, ...rest }: Quest) => (
    <Card onClick={() => {}}>
        <ImageHeader>
            <StyledImage src={cover} alt={`Quest ${id} thumbnail`} lazy />
        </ImageHeader>
        <DetailsTop>
            <QuestTitle>{title}</QuestTitle>
        </DetailsTop>
        <Details>
            {Object.entries(rest).map(([key, value]) => (
                <SpecWrapper key={key}>
                    <Spec color={COLORS.GOLD}>{key}</Spec>
                    <Spec color={isKey({ key, expected: EXPECTED.SKILL_TREE }) ? COLORS.BLUE : undefined}>
                        {isKey({ key, expected: EXPECTED.DIFFICULTY }) ? renderSwords(Number(value)) : value}
                    </Spec>
                </SpecWrapper>
            ))}
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

    &:hover {
        cursor: pointer;
        border: ${({
            theme: {
                colors: { gold }
            }
        }) => `1px solid ${gold}80`};
    }

    @media only screen and (max-width: 400px) {
        height: ${({
            theme: {
                width: { card: cardWidth },
                height: { card: cardHeight }
            }
        }) => `calc(((${cardHeight} + 2) / (${cardWidth} + 2)) * 80vw)`};
        width: 80vw;
        min-width: 290px;
        min-height: ${({
            theme: {
                width: { card: cardWidth },
                height: { card: cardHeight }
            }
        }) => `calc(((${cardHeight} + 2) / (${cardWidth} + 2)) * 290px)`};
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
    gap: 10px 35px;

    @media only screen and (max-width: 400px) {
        gap: 6px 6px;
    }
`;

const SpecWrapper = styled.div`
    position: relative;
    flex: 40%;
    height: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 0 5px;

    @media only screen and (max-width: 400px) {
        gap: 0px 3px;
    }
`;

const Spec = styled.span`
    font-family: Lato;
    font-size: 12px;
    line-height: 14px;
    min-width: 60px;
    text-align: left;
    text-transform: capitalize;
    display: flex;
    justify-content: flex-start;
    gap: 0 2px;
    color: ${({ color = COLORS.WHITE, theme: { colors } }: any) => colors[color]};
`;
