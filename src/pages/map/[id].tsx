import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import map_data from '../../data/map_data.json';
import { useRouter } from 'next/router';
import { MapData } from '@/utils/randomizer';
import { useEffect, useState } from 'react';

function tile_translator(value: number): string {
    switch (value) {
        case 0:
            return "floor";
        case 1:
            return "crate";
        case 2:
            return "wall";
        default:
            return "unknown";
    }
}

export default function Map() {
    const router = useRouter();
    const { id } = router.query;
    const mapNum:number = parseInt(id as string);

    const [selectedMap, setSelectedMap] = useState<MapData | null>(null);
    const [numObstacles, setNumObstacles] = useState<number>(0);
    const [numWalls, setNumWalls] = useState<number>(0);

    useEffect(() => {
        if (mapNum >= 0 && mapNum < map_data.length) {
            setSelectedMap(map_data[mapNum]);
            let obstacles = 0;
            let walls = 0;
            map_data[mapNum].tiles.forEach(row => {
                row.forEach(tile => {
                    if (tile === 1) {
                        obstacles++;
                    } else if (tile === 2) {
                        walls++;
                    }
                });
            });
            setNumObstacles(obstacles);
            setNumWalls(walls);
        }
    }, [mapNum]);

    return <>
        <Container
            maxWidth="lg"
        >
            <Box
                p={12}
            >
                {/* A Grid of 9x9 filled based on map_data tile */}
                {/* Grab the "tile" int and provide tile based on value */}
                {/* (0 - floor, 1- crate, 2 - wall) */}
                <Grid container spacing={2} columns={9}>
                    {/* If selectedMap is null, don't print */}
                    {selectedMap && selectedMap.tiles.map((row, rowIndex) => (
                        row.map((tile, tileIndex) => (
                            <Grid item md={1} key={rowIndex * 9 + tileIndex}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image={`/tiles/${tile_translator(tile)}.png`}
                                            alt={tile_translator(tile)} />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    ))}
                </Grid>

                {/* Display map name and number of obstacles and walls to place */}
                <Box
                    display="flex"
                    justifyContent={"space-evenly"}
                    alignItems={"center"}
                    margin={"auto"}
                    mt={3}
                    bgcolor="background.default"
                    sx={{ borderRadius: 2 }}
                    p={2}
                >
                    <Stack>
                        <Typography variant="h5"> {selectedMap?.name} </Typography>
                        <Chip label={`Map #${mapNum}`} />
                    </Stack>
                    
                    <Box
                        bgcolor={"secondary.main"}
                        sx={{ borderRadius: 2 }}
                        p={2}
                    >
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar variant='square' src="/tiles/crate.png" />
                                </ListItemAvatar>
                                <ListItemText primary={`Obstacles: ${numObstacles}`} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar variant='square' src="/tiles/wall.png" />
                                </ListItemAvatar>
                                <ListItemText primary={`Walls: ${numWalls}`} />
                            </ListItem>
                        </List> 
                    </Box>
                    
                </Box>

                <Box
                    display="flex"
                    justifyContent="center"
                    mt={3}
                    gap={2}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        href="/maps"
                    >
                        Return
                    </Button>

                    <Button
                        variant="contained"
                        color="success"
                        href="/game"
                        >
                        Begin
                    </Button>
                </Box>
            </Box>
        </Container>
    </>
}