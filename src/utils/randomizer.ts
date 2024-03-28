import map_data from '../data/map_data.json';

export interface MapData {
    id: number;
    name: string;
    tiles: number[][];
}

/**
 * Randomly select a number from the number of maps
 * under map_data.json
 */
export function random_select(): number {
    return Math.floor(Math.random() * map_data.length);
}