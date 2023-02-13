import { useApiRead } from '@/shared/hooks';
import { QuestService } from '@/service';
import { RESOURCES } from '@/shared/enums';
import { useRouter } from 'next/router';
import { Quest } from '@/types/quests';
import { StyledSingleCard } from '@/shared/components';

interface Props {
    quest: Quest;
}

const StyledQuest = ({ quest }: Props) => {
    const { push } = useRouter();
    const { response } = useApiRead({
        resource: RESOURCES.QUEST,
        method: QuestService.findById,
        args: { id: quest.id },
        initialData: quest,
        enabled: !!quest.id
    });

    return <StyledSingleCard onBack={() => push('/')} {...response} />;
};

export default StyledQuest;

export async function getStaticPaths() {
    const dataLength = await QuestService.list({ limit: 1, page: 1 }).then(
        ({ pagination: { total } }: { pagination: { total: number } }) => total
    );
    const paths = Array(dataLength)
        .fill(0)
        .map((_, index) => ({
            params: {
                id: `${index + 1}`
            }
        }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params: { id } }: { params: { id: string } }) {
    const quest = await QuestService.findById({ id });

    return { props: { quest } };
}
