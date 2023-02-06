import styled from 'styled-components';

interface ImageProps {
    src: string;
    alt?: string;
    width?: number;
    lazy?: boolean;
}

export const StyledImage = ({ src, alt = 'image', width = 100, lazy = false }: ImageProps) => (
    <Image src={src} alt={alt} width={width} loading={lazy ? 'lazy' : 'eager'} />
);

const Image = styled.img`
    width: ${({ width }) => `${width}%`};
    position: relative;
`;
