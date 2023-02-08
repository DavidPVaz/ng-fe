import styled from 'styled-components';
import { StyledCard } from '@/shared/components';
import { Quest } from '@/types/quests';
import { useApiRead } from '@/shared/hooks';
import { QuestService } from '@/service';
import { RESOURCES } from '@/shared/enums';
import { useRouter } from 'next/router';

export const StyledQuests = () => {
    const router = useRouter();
    const { response, loading, error } = useApiRead({ resource: RESOURCES.QUESTS, method: QuestService.list });

    return (
        <QuestsWrapper>
            {response?.map((quest: Quest, index: number) => (
                <StyledCard key={index} {...quest} />
            ))}
        </QuestsWrapper>
    );
};

const QuestsWrapper = styled.div`
    margin-top: 174px;
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

    @media only screen and (max-width: 400px) {
        margin-top: ${({ theme: { spacing } }) => `${spacing['3xl']}`};
    }
`;
