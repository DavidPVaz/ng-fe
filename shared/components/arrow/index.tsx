import styled from 'styled-components';

interface Arrow {
    type: string;
}

export const StyledArrow = ({ type }: Arrow) => <Arrow type={type} />;

const Arrow = styled.span`
    display: flex;
    position: relative;
    height: 25px;
    width: 25px;
    background: transparent;
    font-size: 10px;
    opacity: 0.6;
    transition: opacity 0.25s;

    &:hover {
        opacity: 0.95;
    }

    &::before {
        content: '';
        height: 10px;
        width: 10px;
        background: transparent;
        border-top: ${({
            theme: {
                colors: { gold }
            }
        }) => `2px solid ${gold}`};
        border-right: ${({
            theme: {
                colors: { gold }
            }
        }) => `2px solid ${gold}`};
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: ${({ type }: Arrow) =>
            type === 'previous' ? 'translate(-25%, -50%) rotate(-135deg)' : 'translate(-75%, -50%) rotate(45deg)'};
    }
`;
