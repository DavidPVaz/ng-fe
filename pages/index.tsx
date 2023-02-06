import styled from 'styled-components';
import { StyledContent } from '@/shared/components';

const Home = () => (
    <StyledContent>
        <Temp>Here</Temp>
    </StyledContent>
);

export default Home;

const Temp = styled.div`
    display: flex;
    color: white;
`;
