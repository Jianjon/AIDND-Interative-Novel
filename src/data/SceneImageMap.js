import forestImg from '../assets/scenes/forest.png';
import tavernImg from '../assets/scenes/tavern.png';
import dungeonImg from '../assets/scenes/dungeon.png';

export const SCENE_IMAGES = {
    'forest': forestImg,
    'woods': forestImg,
    'jungle': forestImg,
    'tavern': tavernImg,
    'inn': tavernImg,
    'bar': tavernImg,
    'dungeon': dungeonImg,
    'cave': dungeonImg,
    'crypt': dungeonImg,
    'underground': dungeonImg
};

export const getSceneImage = (keyword) => {
    if (!keyword) return null;
    const key = keyword.toLowerCase();
    return SCENE_IMAGES[key] || null;
};
