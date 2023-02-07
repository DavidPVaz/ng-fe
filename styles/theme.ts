import { DefaultTheme } from 'styled-components';
import { COLORS } from '@/shared/enums';

export const defaultTheme = {
    radius: {
        s: '3px',
        m: '5px',
        l: '7px',
        xl: '10px'
    },
    spacing: {
        unset: 'unset',
        '7xs': '2px',
        '6xs': '4px',
        '5xs': '6px',
        '4xs': '8px',
        '3xs': '12px',
        '2xs': '16px',
        xs: '20px',
        s: '24px',
        m: '32px',
        l: '40px',
        xl: '48px',
        '2xl': '64px',
        '3xl': '80px',
        '4xl': '100px',
        '5xl': '120px',
        '6xl': '140px',
        '7xl': '160px',
        '8xl': '180px'
    },
    width: {
        card: 332
    },
    height: {
        card: 222,
        questListImage: 106.10514831542969
    }
};

export const darkTheme: DefaultTheme = {
    ...defaultTheme,
    colors: {
        // set theme colors
        [COLORS.GOLD]: '#BEA77E',
        [COLORS.WHITE]: '#FFFFF4',
        [COLORS.GREY]: '#8E8E8E',
        [COLORS.DARK_GREY]: '#333030',
        [COLORS.LIGHTER_BLACK]: '#1D1C1A',
        [COLORS.BLACK]: '#151515',
        [COLORS.BLUE]: '#98A7F5',
        [COLORS.GREEN]: '#93D788'
    }
};
