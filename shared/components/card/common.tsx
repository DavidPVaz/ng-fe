import { StyledSword } from '@/shared/components';
import { COLORS } from '@/shared/enums';

export const renderSwords = (difficulty: number) =>
    Array(5)
        .fill(0)
        .map((_, index) => <StyledSword key={index} color={difficulty > index ? COLORS.GOLD : undefined} />);

export const calculateImageHeaderHeightPercentage = ({ image, card }: { image: number; card: number }) =>
    (image * 100) / card;
