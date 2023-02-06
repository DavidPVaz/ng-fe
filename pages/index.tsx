import styled from 'styled-components';
import { StyledContent } from '@/shared/components';

const Home = () => (
    <StyledContent>
        <Quests>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
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

const Card = styled.div`
    position: relative;
    display: flex;
    height: 222px;
    width: 332px;
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

    @media only screen and (max-width: 400px) {
        height: ${({
            theme: {
                width: { card: cardWidth },
                height: { card: cardHeight }
            }
        }) => `calc(((${cardHeight} + 2) / (${cardWidth} + 2)) * 80vw)`};
        width: 80vw;
        min-width: 280px;
        min-height: ${({
            theme: {
                width: { card: cardWidth },
                height: { card: cardHeight }
            }
        }) => `calc(((${cardHeight} + 2) / (${cardWidth} + 2)) * 280px)`};
    }
`;
