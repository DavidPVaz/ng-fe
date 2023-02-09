import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

export const StyledButton = ({
    children,
    onClick,
    withPadding = false,
    disabled = false
}: {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent) => void;
    withPadding?: boolean;
    disabled?: boolean;
}) => (
    <Button onClick={onClick} withPadding={withPadding} disabled={disabled}>
        {children}
    </Button>
);

const Button = styled.button`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    align-content: center;
    padding: ${({ withPadding, theme: { spacing } }: { theme: DefaultTheme; withPadding: boolean }) =>
        withPadding && `${spacing['4xs']} ${spacing.xs} ${spacing['4xs']} ${spacing.xs}`};
    border-radius: ${({
        theme: {
            radius: { xs }
        }
    }) => `${xs}`};
    border: ${({
        theme: {
            colors: { gold }
        }
    }) => `1px solid ${gold}`};
    background: ${({
        theme: {
            colors: { lighterBlack }
        }
    }) => `${lighterBlack}`};

    &:hover {
        cursor: pointer;
    }

    &:disabled {
        border: ${({
            theme: {
                colors: { darkGrey }
            }
        }) => `1px solid ${darkGrey}`};
        cursor: not-allowed;
    }
`;
