import styled from 'styled-components';
import { StyledCard, StyledContent, StyledButton, StyledArrow } from '@/shared/components';
import { Quest } from '@/types/quests';
import { useApiRead } from '@/shared/hooks';
import { QuestService } from '@/service';
import { RESOURCES } from '@/shared/enums';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const StyledQuests = () => {
    const { push, query: args } = useRouter();
    const {
        response,
        paginated: { nextPage, previousPage, hasNext, hasPrevious, total, limit, skip },
        loading,
        error
    } = useApiRead({
        resource: RESOURCES.QUESTS,
        method: QuestService.list,
        args,
        withPagination: true,
        keepPreviousData: true
    });

    const onPrevious = useCallback(
        () => hasPrevious && push({ query: { ...args, page: previousPage } }),
        [args, hasPrevious, previousPage, push]
    );

    const onNext = useCallback(
        () => hasNext && push({ query: { ...args, page: nextPage } }),
        [args, hasNext, nextPage, push]
    );

    return (
        <StyledContent>
            <PaginatorSection>
                <StyledButton onClick={onPrevious} disabled={!hasPrevious}>
                    <StyledArrow type={'previous'} />
                </StyledButton>
                <StyledButton onClick={onNext} disabled={!hasNext}>
                    <StyledArrow type={'next'} />
                </StyledButton>
                <PaginatorDescription>{`Showing ${skip + 1} to ${skip + limit} of ${total}.`}</PaginatorDescription>
            </PaginatorSection>
            <QuestsWrapper>
                {response?.map((quest: Quest) => (
                    <StyledCard key={quest.id} {...quest} />
                ))}
            </QuestsWrapper>
        </StyledContent>
    );
};

export default StyledQuests;

const QuestsWrapper = styled.div`
    margin-bottom: 168px;
    position: relative;
    width: ${({
        theme: {
            spacing: { s },
            width: { card }
        }
    }) => `calc(((${card}px + 2px) * 3) + (${s} * 2))`};
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
        width: ${({
            theme: {
                spacing: { s },
                width: { card }
            }
        }) => `calc(((${card}px + 2px) * 2) + ${s})`};
        justify-content: space-around;
    }

    @media only screen and (max-width: 750px) {
        width: 100%;
        flex-direction: column;
        align-items: center;
    }
`;

const PaginatorSection = styled.div`
    margin-top: 125px;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    gap: 0 10px;
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
        justify-content: center;
    }

    @media only screen and (max-width: 400px) {
        margin-top: ${({ theme: { spacing } }) => `${spacing['3xl']}`};
    }
`;

const PaginatorDescription = styled.span`
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
