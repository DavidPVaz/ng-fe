import React from 'react';
import styled from 'styled-components';
import { StyledImage } from '@/shared/components';
import { COLORS } from '@/shared/enums';
import { Quest } from '@/types';
import { renderSwords, calculateImageHeaderHeightPercentage } from './common';

enum EXPECTED {
    SKILL_TREE = 'skillTree',
    DIFFICULTY = 'difficulty'
}
const isKey = ({ key, expected }: { key: string; expected: string }) => key === expected;

export const StyledListCard = ({ onClick, quest }: { onClick: Function; quest: Quest }) => {
    const { cover, id, title, ...rest } = quest;

    return (
        <Card onClick={() => onClick(id)} data-cy={`list-card-${id}`}>
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
};

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

const ImageHeader = styled.div`
    position: relative;
    height: ${({
        theme: {
            height: { card, questListImage }
        }
    }) => `${calculateImageHeaderHeightPercentage({ image: questListImage, card })}%`};
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
    padding-left: ${({ theme: { spacing } }) => spacing['3xs']};
`;

const QuestTitle = styled.span`
    position: relative;
    display: flex;
    align-items: center;
    font-family: Cinzel;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    text-transform: uppercase;
    color: ${({
        theme: {
            colors: { white }
        }
    }) => white};
`;

const Details = styled.div`
    margin-top: 5px;
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: ${({ theme: { spacing } }) => `0 ${spacing['3xs']} 0 ${spacing['3xs']}`};
    gap: 10px 35px;

    @media only screen and (max-width: 400px) {
        gap: ${({ theme: { spacing } }) => `${spacing['5xs']} ${spacing['5xs']}`};
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
    gap: ${({ theme: { spacing } }) => `0 ${spacing['7xs']}`};
    color: ${({ color = COLORS.WHITE, theme: { colors } }: any) => colors[color]};
`;
