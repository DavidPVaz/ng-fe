import styled from 'styled-components';
import { StyledContent, StyledCard } from '@/shared/components';

const Home = () => (
    <StyledContent>
        <Quests>
            <StyledCard />
            <StyledCard />
            <StyledCard />
            <StyledCard />
            <StyledCard />
            <StyledCard />
            <StyledCard />
            <StyledCard />
            <StyledCard />
            <StyledCard />
            <StyledCard />
        </Quests>
    </StyledContent>
);

export default Home;

const Quests = styled.div`
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
