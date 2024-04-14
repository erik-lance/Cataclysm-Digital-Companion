import map_data from '../data/map_data.json';
import seedrandom from 'seedrandom';

export const player_coords = [[7,0], [0,1], [1,8], [8,7]];
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
    const numCrates = (Math.floor(rng() * 6) + 1);  //map can have 1-6 crates
    
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

        // Make sure not in any of the player starting positions
        if (player_coords.some(coord => coord[0] === col && coord[1] === row)) { continue; }

        if (tiles[row][col] === 0) {
            tiles[row][col] = 2;
            placedWalls++;
        }
    }

    let placedCrates = 0;
    while (placedCrates < numCrates) {
        const row = Math.floor(rng() * rows);
        const col = Math.floor(rng() * cols);

        // Make sure not in any of the player starting positions
        if (player_coords.some(coord => coord[0] === col && coord[1] === row)) { continue; }

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

/**
 * Randomly selects crates (tiles with value 1) from a map and
 * marks them to have powerups (tiles with value 9)
 * @param map 
 */
export function get_crates_with_powerups(map: MapData): MapData {
    let powerups = 0;
    let crates = 0;
    let crate_coords: number[][] = [];

    // Get the number of crates in the map
    // Get coordinates of all crates
    map.tiles.forEach((row, y) => {
        row.forEach((tile, x) => {
            if (tile === 1) {
                crates++;
                crate_coords.push([x, y]);
            }
        });
    });

    // Up to 6 crates can have powerups. If there are less than 6 crates,
    // then all crates will have powerups. If there are more than 6 crates,
    // then randomly select 6 crates to have powerups.
    if (crates <= 6) {
        powerups = crates;
    } else {
        powerups = 6;
    }

    // Randomly select crates to have powerups
    let powerup_coords: number[][] = [];
    let removed_crate_indices: number[] = [];
    for (let i = 0; i < powerups; i++) {
        let index = Math.floor(Math.random() * crate_coords.length);
        if (removed_crate_indices.includes(index)) { i--; continue }

        // 50/50 chance to have a powerup
        if (Math.random() < 0.5) {
            powerup_coords.push(crate_coords[index]);
        }
        removed_crate_indices.push(index);
    }

    // If no crates have powerups, then randomly select one crate to have a powerup
    if (powerup_coords[0] === undefined) {
        let index = Math.floor(Math.random() * crate_coords.length);
        powerup_coords.push(crate_coords[index]);
    }

    // Mark the crates with powerups
    powerup_coords.forEach(coord => {
        map.tiles[coord[1]][coord[0]] = 9;
    });

    // Add player values to the map
    map = generate_players(map);

    return map;
}

function generate_players(map: MapData): MapData {
    // We generate four players at the followg coordinates:
    // (7,0), (0,1), (1,8), (8,7)
    // and we mark them with values 4, 5, 6, 7 distributed randomly
    const player_coords = [[7,0], [0,1], [1,8], [8,7]];

    // Shuffle the player values
    player_coords.sort(() => Math.random() - 0.5);

    const player_values = [4, 5, 6, 7];
    player_coords.forEach((coord, index) => {
        map.tiles[coord[1]][coord[0]] = player_values[index];
    });

    return map;
}