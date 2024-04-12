import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import { MapData, randomizeMapData } from '@/utils/randomizer';
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
    const [selectedMap, setSelectedMap] = useState<MapData | null>(null);
    const [numObstacles, setNumObstacles] = useState<number>(0);
    const [numWalls, setNumWalls] = useState<number>(0);

    useEffect(() => {
        const randomMap = randomizeMapData();
        setSelectedMap(randomMap);
        let obstacles = 0;
        let walls = 0;
        randomMap.tiles.forEach(row => {
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
    }, []);

    return (
      <>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          p={3}
        >
          {/* A Grid of 9x9 filled based on map_data tile */}
          {/* Grab the "tile" int and provide tile based on value */}
          {/* (0 - floor, 1- crate, 2 - wall) */}
          <Grid item container spacing={1} columns={9}>
            {/* If selectedMap is null, don't print */}
            {selectedMap &&
              selectedMap.tiles.map((row, rowIndex) =>
                row.map((tile, tileIndex) => (
                  <Grid
                    item
                    lg={1}
                    md={1}
                    sm={1}
                    xs={1}
                    key={rowIndex * 9 + tileIndex}
                  >
                    <Card>
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
              )}
          </Grid>

          {/* Display map name and number of obstacles and walls to place */}
          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ borderRadius: 2 }}
            columns={12}
          >
            <Grid item container justifyContent="center" alignItems="center">
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
            </Grid>

            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ borderRadius: 2 }}
              columns={2}
              mt={2}
            >
              <Grid item lg={1} md={1} sm={1} xs={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar src="/tiles/crate.png" variant="square" />
                  <Typography variant="h6">
                    x{numObstacles} Obstacles
                  </Typography>
                </Stack>
              </Grid>
              <Grid item lg={1} md={1} sm={1} xs={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar src="/tiles/wall.png" variant="square" />
                  <Typography variant="h6">x{numWalls} Walls</Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Button variant="contained" color="primary" href="/maps">
                Return
              </Button>
            </Grid>

            <Grid item>
              <Button variant="contained" color="success" href="/game">
                Begin
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
}