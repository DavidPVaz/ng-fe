import React from 'react';
import styled from 'styled-components';
import {
    StyledImage,
    LeftDelineatorIcon,
    RightDelineatorIcon,
    StyledButton,
    ExperienceIcon,
    CloseIcon
} from '@/shared/components';
import { COLORS } from '@/shared/enums';
import { renderSwords, calculateImageHeaderHeightPercentage } from './common';

interface SingleQuest {
    onBack: (event: React.MouseEvent) => void;
    id: number;
    cover: string;
    title: string;
    skillTree: string;
    difficulty: number;
    skill: string;
    type: string;
    description: string;
    experience: number;
    gold: number;
}

export const StyledSingleCard = ({
    onBack,
    id,
    cover,
    title,
    skillTree,
    difficulty,
    skill,
    type,
    description,
    experience,
    gold
}: SingleQuest) => (
    <Card>
        <Close onClick={onBack}>
            <CloseIcon />
        </Close>
        <ImageHeader>
            <StyledImage src={cover} alt={`Quest ${id} thumbnail`} />
        </ImageHeader>
        <DetailsTop>
            <LeftDelineatorIcon />
            <QuestTitle>{title}</QuestTitle>
            <RightDelineatorIcon />
        </DetailsTop>
        <Details>
            <SpecsWrapper>
                <SpecWrapper>
                    <Spec color={COLORS.GOLD}>Skill tree</Spec>
                    <Spec>{skillTree}</Spec>
                </SpecWrapper>
                <SpecWrapper>
                    <Spec color={COLORS.GOLD}>Difficulty</Spec>
                    <Spec>{renderSwords(Number(difficulty))}</Spec>
                </SpecWrapper>
                <SpecWrapper>
                    <Spec color={COLORS.GOLD}>Skill</Spec>
                    <Spec>{skill}</Spec>
                </SpecWrapper>
                <SpecWrapper>
                    <Spec color={COLORS.GOLD}>Quest type</Spec>
                    <Spec>{type}</Spec>
                </SpecWrapper>
            </SpecsWrapper>
            <Description>{description}</Description>
            <CardFooter>
                <RewardsSection>
                    <RewardsTitle>quest rewards</RewardsTitle>
                    <BoxWrapper>
                        <Box>
                            <ExperienceIcon />
                            <ExperiencePoints>{`+ ${experience}`}</ExperiencePoints>
                        </Box>
                        <Box>
                            <RewardsTitle>gold</RewardsTitle>
                            <ExperiencePoints>{`+ ${gold}`}</ExperiencePoints>
                        </Box>
                    </BoxWrapper>
                </RewardsSection>
                <StyledButton onClick={onBack} withPadding>
                    <TextButton>go back</TextButton>
                </StyledButton>
            </CardFooter>
        </Details>
    </Card>
);

const Card = styled.div`
    margin-top: 87px;

    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    display: flex;
    overflow: hidden;
    height: ${({
        theme: {
            height: { singleCard }
        }
    }) => `${singleCard}px`};
    width: ${({
        theme: {
            width: { singleCard }
        }
    }) => `${singleCard}px`};
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

    @media only screen and (max-width: 800px) {
        height: ${({
            theme: {
                width: { singleCard: cardWidth },
                height: { singleCard: cardHeight }
            }
        }) => `calc(((${cardHeight} + 2) / (${cardWidth} + 2)) * 90vw)`};
        width: 90vw;
        min-width: 290px;
        min-height: ${({
            theme: {
                width: { singleCard: cardWidth },
                height: { singleCard: cardHeight }
            }
        }) => `calc(((${cardHeight} + 2) / (${cardWidth} + 2)) * 290px)`};
    }

    @media only screen and (max-width: 750px) {
        height: auto;
        width: 90vw;
        min-width: 290px;
    }
`;

const ImageHeader = styled.div`
    position: relative;
    height: ${({
        theme: {
            height: { singleCard, singleQuestImage }
        }
    }) => `${calculateImageHeaderHeightPercentage({ image: singleQuestImage, card: singleCard })}%`};
    width: ${({ theme: { spacing } }) => `calc(100% - (${spacing['6xs']} * 2))`};
    border-radius: ${({
        theme: {
            radius: { l }
        }
    }) => `${l} ${l} 0 0`};
    margin: ${({ theme: { spacing } }) => `${spacing['6xs']} ${spacing['6xs']} 0 ${spacing['6xs']}`};
    overflow: hidden;

    @media only screen and (max-width: 750px) {
        height: 200px;
    }

    @media only screen and (max-width: 400px) {
        height: auto;
    }
`;

const DetailsTop = styled.div`
    margin-top: 7px;
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0 10px;
`;

const QuestTitle = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    text-align: center;
    font-family: Cinzel;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    text-transform: uppercase;
    color: ${({
        theme: {
            colors: { white }
        }
    }) => white};

    @media only screen and (max-width: 650px) {
        font-size: 16px;
    }
`;

const Details = styled.div`
    margin-top: ${({ theme: { spacing } }) => spacing['4xs']}};
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: no-wrap;
    padding: 0 15px 23px 15px;
    gap: 13px 0;
`;

const SpecsWrapper = styled.div`
    position: relative;
    flex: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 10px 0;

    @media only screen and (max-width: 400px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const SpecWrapper = styled.div`
    position: relative;
    flex: 50%;
    height: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 0 10px;
`;

const Spec = styled.span`
    font-family: Lato;
    font-size: 14px;
    line-height: 17px;
    min-width: 60px;
    text-align: left;
    text-transform: capitalize;
    display: flex;
    justify-content: flex-start;
    gap: ${({ theme: { spacing } }) => `0 ${spacing['7xs']}`};
    color: ${({ color = COLORS.WHITE, theme: { colors } }: any) => colors[color]};
`;

const Description = styled.span`
    position: relative;
    display: flex;
    font-family: Lato;
    font-size: 14px;
    line-height: 17px;
    min-width: 60px;
    text-align: left;
    min-height: 145px;
    justify-content: flex-start;
    color: ${({
        theme: {
            colors: { grey }
        }
    }) => grey};
`;

const CardFooter = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`;

const RewardsSection = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 7px 0;
`;

const RewardsTitle = styled.span`
    position: relative;
    display: flex;
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

const BoxWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    gap 0 5px;
`;

const Box = styled.div`
    position: relative;
    display: flex;
    width: 55.5px;
    height: 55.5px;
    border: ${({
        theme: {
            colors: { gold }
        }
    }) => `1px solid ${gold}`};
    background: linear-gradient(180deg, rgba(7, 15, 29, 0) 50%, rgba(54, 77, 137, 0.4) 100%);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5.5px 0;
`;

const TextButton = styled.span`
    font-family: 'Cinzel';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    justify-content: center;
    text-transform: uppercase;
    color: ${({
        theme: {
            colors: { white }
        }
    }) => white};
`;

const ExperiencePoints = styled.span`
    position: relative;
    display: flex;
    font-family: Cinzel;
    font-style: normal;
    font-weight: 700;
    font-size: 8px;
    line-height: 11px;
    letter-spacing: 0.5px;
    color: ${({
        theme: {
            colors: { white }
        }
    }) => white};
`;

const Close = styled.div`
    z-index: 1;
    position: absolute;
    top: 15px;
    right: 17px;

    &:hover {
        cursor: pointer;
    }
`;
