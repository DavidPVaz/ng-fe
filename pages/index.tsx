import React from 'react';
import styled from 'styled-components';
import { StyledQuests } from '@/pages/quests';
import { StyledContent } from '@/shared/components';
import { usePaginator } from '@/shared/hooks';
import { QuestService } from '@/service';
import { RESOURCES } from '@/shared/enums';

const Home = () => {
    const {
        response: quests,
        Paginator,
        paginatorProps
    } = usePaginator({
        resource: RESOURCES.QUESTS,
        method: QuestService.list
    });

    return (
        <StyledContent>
            <QuestPage>
                <Paginator {...paginatorProps} />
                <StyledQuests quests={quests} />
            </QuestPage>
        </StyledContent>
    );
};

export default Home;

const QuestPage = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 168px;
    margin-top: 125px;
    gap: 20px 0;
    justify-content: center;

    width: ${({
        theme: {
            spacing: { s },
            width: { card }
        }
    }) => `calc(((${card}px + 2px) * 3) + (${s} * 2))`};

    @media only screen and (max-width: 1120px) {
        width: ${({
            theme: {
                spacing: { s },
                width: { card }
            }
        }) => `calc(((${card}px + 2px) * 2) + ${s})`};
    }

    @media only screen and (max-width: 750px) {
        width: 100%;
    }

    @media only screen and (max-width: 400px) {
        margin-top: ${({ theme: { spacing } }) => `${spacing['3xl']}`};
    }
`;
