import map_data from '../data/map_data.json';
import { v4 as uuidv4 } from 'uuid';

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

/**
 * Randomize the obstacles in the map
 * @returns randomMap - random map data same format in map_data.json
 */
export function randomizeMapData(): MapData {
    // revise:
    // 5 to 10 walls
    // less than 6 crates
    const rows = 9;
    const cols = 9;
    const tiles: number[][] = [];

    for (let i = 0; i < rows; i++) {
        const row: number[] = [];
        for (let j = 0; j < cols; j++) {
            const randomTile = Math.floor(Math.random() * 3);
            row.push(randomTile);
        }
        tiles.push(row);
    }

    const randomMap: MapData = {
        id: Number(uuidv4()),
        name: "Randomly Generated Map",
        tiles: tiles
    };

    return randomMap;
}