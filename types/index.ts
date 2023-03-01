export type Quest = {
    id: number;
    skillTree: string;
    skill: string;
    title: string;
    difficulty: number;
    experience: number;
    gold: number;
    type: string;
    cover: string;
};

export type Quests = Array<Quest>;
