import { StyledContent } from '@/shared/components';
import { useApiRead } from '@/shared/hooks';
import { QuestService } from '@/service';
import { RESOURCES } from '@/shared/enums';
import { useRouter } from 'next/router';

const StyledQuest = ({}) => {
    return (
        <StyledContent>
            <></>
        </StyledContent>
    );
};

export default StyledQuest;

/*

export async function getStaticPaths(context: any) {
    console.log('in paths : ', context);
   
    return {
        paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
        fallback: false // can also be true or 'blocking'
    };
    return {
      paths: [],
      fallback: false // can also be true or 'blocking'
  };
}

export async function getStaticProps(context: any) {
  console.log('in props : ', context);
  
  const posts = await getPosts();
  return { props: { quests } };

  return { props: {} };
}
*/
