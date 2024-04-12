import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import map_data from '../../data/map_data.json';
import { useRouter } from 'next/router';
import { MapData, randomizeMapData, get_crates_with_powerups } from '@/utils/randomizer';
import { useEffect, useState } from 'react';

function tile_translator(value: number): string {
    switch (value) {
        case 0:
            return "floor";
        case 1:
            return "crate";
        case 2:
            return "wall";
        case 9:
            return "powerup";
        default:
            return "unknown";
    }
}

export default function Map() {
    const [selectedMap, setSelectedMap] = useState<MapData | null>(null);
    const [numObstacles, setNumObstacles] = useState<number>(0);
    const [numWalls, setNumWalls] = useState<number>(0);
    const [numPowerups, setNumPowerups] = useState<number>(0);

    useEffect(() => {
        const randomMap = randomizeMapData();
        setSelectedMap(get_crates_with_powerups(randomMap));
        let obstacles = 0;
        let walls = 0;
        let powerups = 0;
        randomMap.tiles.forEach(row => {
            row.forEach(tile => {
                if (tile === 1) {
                    obstacles++;
                } else if (tile === 2) {
                    walls++;
                } else if (tile === 9) {
                    powerups++;
                }
            });
        });
        setNumObstacles(obstacles);
        setNumWalls(walls);
        setNumPowerups(powerups);
    }, []);

    return <>
            <Grid container direction="row" justifyContent="center" spacing={2} p={3}
                columns={15}
            >
                {/* A Grid of 9x9 filled based on map_data tile */}
                {/* Grab the "tile" int and provide tile based on value */}
                {/* (0 - floor, 1- crate, 2 - wall) */}
                <Grid item container spacing={1} columns={9}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ borderRadius: 2 }}
                    xl={4} lg={4} md={4} sm={4} xs={9}
                >
                    {/* If selectedMap is null, don't print */}
                    {selectedMap && selectedMap.tiles.map((row, rowIndex) => (
                        row.map((tile, tileIndex) => (
                            <Grid item lg={1} md={1} sm={1} xs={1}
                                key={rowIndex * 9 + tileIndex}
                            >
                                <Card
                                    sx={{
                                        width: { xl: 75, lg: 50, md: 30 },
                                    }}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image={`/tiles/${tile_translator(tile)}.png`}
                                            alt={tile_translator(tile)} 
                                            />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    ))}
                </Grid>

                {/* Display map name and number of obstacles and walls to place */}
                {/* Must be on right side of map when landscape */}
                <Grid item container columns={6}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    xl={3} lg={3} md={3} sm={3} xs={12}
                >
                        {/* Map Name */}
                        <Grid item container
                            justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start', lg: 'flex-start', xl: 'flex-start'}}
                            alignItems="center"
                        >
                            <Box
                                bgcolor={"background.default"}
                                p={2}
                                sx={{ borderRadius: 2 }}
                                width="50%"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Typography variant="h5"> {selectedMap?.name} </Typography>
                                <Chip label={`Seed #${selectedMap?.id}`} />
                            </Box>

                            {/* Show Return and Begin buttons if screen is large here */}
                            <Grid item display={{ md: 'flex', lg: 'flex', xs: 'none', sm: 'none', xl:'none'}} ml={2}>
                                <Stack spacing={2}>
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
                                </Stack>
                                    
                            </Grid>
                        </Grid>

                        {/* Map Parts */}
                        <Grid item container
                            direction="row"
                            spacing={2}
                            sx={{ borderRadius: 2 }}
                            columns={3}
                        >
                            {/* Spacing that shows up when screen is small */}
                            {/* This is to center the main content */}
                            <Grid item columns={1} xs sm display={{md: 'none', lg: 'none'}} />

                            {/* Main Content */}
                            <Grid item>
                                <Stack spacing={2}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Avatar src="/tiles/crate.png" variant="square" />
                                        <Typography variant="h6">x{numObstacles} Obstacles</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Avatar src="/tiles/wall.png" variant="square" />
                                        <Typography variant="h6">x{numWalls} Walls</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Avatar src="/tiles/powerup.png" variant="square" />
                                        <Typography variant="h6">x{numPowerups} Obstacles with Powerups</Typography>
                                    </Stack>
                                </Stack>
                            </Grid>

                            {/* Spacing that shows up when screen is small */}
                            {/* This is to center the main content */}
                            <Grid item columns={1} xs sm display={{md: 'none', lg: 'none'}} />
                            
                        </Grid>
                        
                        <Grid item container
                            display={{ md: 'none', lg: 'none', xl: 'flex'}}
                            direction="row"
                            justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start', lg: 'flex-start', xl: 'flex-start'}}
                            alignItems="center"
                            spacing={2}
                            mt={1}
                        >
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href="/maps"
                                >
                                    Return
                                </Button>
                            </Grid>
                                
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="success"
                                    href="/game"
                                    >
                                    Begin
                                </Button>
                            </Grid>
                        </Grid>
                </Grid>
                
                    
            </Grid>
    </>
}