import styled from 'styled-components';
import { StyledContent, StyledCard } from '@/shared/components';
import { Quest, Quests } from '@/types/quests';

const quests: Quests = [
    {
        cover: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        id: 1,
        title: 'iPhone 9',
        skillTree: 'smartphones',
        difficulty: 4,
        skill: 'Apple',
        experience: 9400,
        type: '-',
        gold: 549
    },
    {
        cover: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
        id: 2,
        title: 'iPhone X',
        skillTree: 'smartphones',
        difficulty: 4,
        skill: 'Apple',
        experience: 3400,
        type: '-',
        gold: 899
    },
    {
        cover: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
        id: 3,
        title: 'Samsung Universe 9',
        skillTree: 'smartphones',
        difficulty: 4,
        skill: 'Samsung',
        experience: 3600,
        type: '-',
        gold: 1249
    },
    {
        cover: 'https://i.dummyjson.com/data/products/4/thumbnail.jpg',
        id: 4,
        title: 'OPPOF19',
        skillTree: 'smartphones',
        difficulty: 4,
        skill: 'OPPO',
        experience: 12300,
        type: '-',
        gold: 280
    },
    {
        cover: 'https://i.dummyjson.com/data/products/5/thumbnail.jpg',
        id: 5,
        title: 'Huawei P30',
        skillTree: 'smartphones',
        difficulty: 4,
        skill: 'Huawei',
        experience: 3200,
        type: '-',
        gold: 499
    },
    {
        cover: 'https://i.dummyjson.com/data/products/6/thumbnail.png',
        id: 6,
        title: 'MacBook Pro',
        skillTree: 'laptops',
        difficulty: 4,
        skill: 'Apple',
        experience: 8300,
        type: '-',
        gold: 1749
    },
    {
        cover: 'https://i.dummyjson.com/data/products/7/thumbnail.jpg',
        id: 7,
        title: 'Samsung Galaxy Book',
        skillTree: 'laptops',
        difficulty: 4,
        skill: 'Samsung',
        experience: 5000,
        type: '-',
        gold: 1499
    },
    {
        cover: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
        id: 8,
        title: 'Microsoft Surface Laptop 4',
        skillTree: 'laptops',
        difficulty: 4,
        skill: 'Microsoft Surface',
        experience: 6800,
        type: '-',
        gold: 1499
    },
    {
        cover: 'https://i.dummyjson.com/data/products/9/thumbnail.jpg',
        id: 9,
        title: 'Infinix INBOOK',
        skillTree: 'laptops',
        difficulty: 4,
        skill: 'Infinix',
        experience: 9600,
        type: '-',
        gold: 1099
    },
    {
        cover: 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg',
        id: 10,
        title: 'HP Pavilion 15-DK1056WM',
        skillTree: 'laptops',
        difficulty: 4,
        skill: 'HP Pavilion',
        experience: 8900,
        type: '-',
        gold: 1099
    }
];
const Home = () => (
    <StyledContent>
        <Quests>
            {quests.map((quest: Quest, index) => (
                <StyledCard key={index} {...quest} />
            ))}
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
