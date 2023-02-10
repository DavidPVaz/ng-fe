import { StyledContent } from '@/shared/components';
import { useApiRead } from '@/shared/hooks';
import { QuestService } from '@/service';
import { RESOURCES } from '@/shared/enums';
import { useRouter } from 'next/router';
import { Quest } from '@/types/quests';

const StyledQuest = ({ quest }: Quest) => {
    const { response, loading } = useApiRead({
        resource: RESOURCES.QUEST,
        method: QuestService.findById,
        args: { id: quest.id },
        initialData: quest,
        enabled: !!quest.id
    });

    return (
        <StyledContent>
            {Object.values(response ?? {}).map((value: any, index: number) => (
                <div key={index}>{value}</div>
            ))}
        </StyledContent>
    );
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
