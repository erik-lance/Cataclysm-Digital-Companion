import map_data from '../data/map_data.json';
import seedrandom from 'seedrandom';


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
 * @param seed - (optional) (default: current timestamp) random seed for generating the map
 * @returns randomMap - random map data same format in map_data.json
 */
export function randomizeMapData(seed: number = Date.now()): MapData {
    const rows = 9;
    const cols = 9;
    const tiles: number[][] = [];

    const rng = seedrandom(seed.toString());
    const numWalls = Math.floor(rng() * 5);     //map can have 0-4 walls
    const numCrates = Math.floor(rng() * 7);    //map can have 0-6 crates
    
    // initialize empty grid
    for (let i = 0; i < rows; i++) {
        const row: number[] = [];
        for (let j = 0; j < cols; j++) {
            row.push(0);
        }
        tiles.push(row);
    }

    let placedWalls = 0;
    while (placedWalls < numWalls) {
        const row = Math.floor(rng() * rows);
        const col = Math.floor(rng() * cols);
        if (tiles[row][col] === 0) {
            tiles[row][col] = 2;
            placedWalls++;
        }
    }

    let placedCrates = 0;
    while (placedCrates < numCrates) {
        const row = Math.floor(rng() * rows);
        const col = Math.floor(rng() * cols);
        if (tiles[row][col] === 0) {
            tiles[row][col] = 1;
            placedCrates++;
        }
    }

    const randomMap: MapData = {
        id: seed,
        name: "Randomly Generated Map",
        tiles: tiles
    };

    return randomMap;
}