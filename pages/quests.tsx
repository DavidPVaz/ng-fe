import React from 'react';
import styled from 'styled-components';
import { StyledCard } from '@/shared/components';
import { Quest, Quests } from '@/types/quests';

interface Props {
    quests?: Quests;
    onQuest: Function;
}

export const StyledQuests = ({ quests, onQuest }: Props) =>
    !quests ? (
        <Description>No items to show.</Description>
    ) : (
        <QuestsWrapper>
            {quests?.map((quest: Quest) => (
                <StyledCard onClick={onQuest} key={quest.id} quest={quest} />
            ))}
        </QuestsWrapper>
    );

const QuestsWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${({
        theme: {
            spacing: { s }
        }
    }) => `${s} ${s}`};

    @media only screen and (max-width: 1120px) {
        justify-content: space-around;
    }

    @media only screen and (max-width: 750px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Description = styled.span`
    font-family: Lato;
    font-size: 12px;
    line-height: 14px;
    min-width: 60px;
    text-align: left;
    justify-content: flex-start;
    color: ${({
        theme: {
            colors: { gold }
        }
    }) => gold};
`;
