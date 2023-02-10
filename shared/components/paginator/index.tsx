import React from 'react';
import styled from 'styled-components';
import { StyledButton, StyledArrow } from '@/shared/components';

interface Paginator {
    onFirst: (event: React.MouseEvent) => void;
    onPrevious: (event: React.MouseEvent) => void;
    onNext: (event: React.MouseEvent) => void;
    onLast: (event: React.MouseEvent) => void;
    description: string;
    hasPrevious: boolean;
    hasNext: boolean;
}

export const StyledPaginator = ({
    onFirst,
    onPrevious,
    onNext,
    onLast,
    description,
    hasNext,
    hasPrevious
}: Paginator) => (
    <Paginator>
        <StyledButton onClick={onFirst} disabled={!hasPrevious}>
            <PaginatorTextButton>First</PaginatorTextButton>
        </StyledButton>
        <StyledButton onClick={onPrevious} disabled={!hasPrevious}>
            <StyledArrow type={'previous'} />
        </StyledButton>
        <StyledButton onClick={onNext} disabled={!hasNext}>
            <StyledArrow type={'next'} />
        </StyledButton>
        <StyledButton onClick={onLast} disabled={!hasNext}>
            <PaginatorTextButton>Last</PaginatorTextButton>
        </StyledButton>
        <Description>{description}</Description>
    </Paginator>
);

const Paginator = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    gap: 0 10px;
    width: 100%;

    @media only screen and (max-width: 750px) {
        justify-content: center;
    }
`;

const Description = styled.span`
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

const PaginatorTextButton = styled.span`
    padding: 5.5px;
    font-family: Lato;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    justify-content: center;
    opacity: 0.6;
    color: ${({
        theme: {
            colors: { gold }
        }
    }) => gold};

    &:hover {
        opacity: 0.95;
    }
`;
