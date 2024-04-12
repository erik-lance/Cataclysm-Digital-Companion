import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import map_data from '../data/map_data.json';
import { random_select } from '../utils/randomizer';
import MapCard from '@/components/MapCard';

export default function Maps() {
    return <>
        <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"
            p={3}
        >
            <Grid item
                lg
            >
                <Typography
                    variant="h3"
                    align="center"
                    gutterBottom
                >
                        Map Selection Screen
                </Typography>
            </Grid>

            <Grid item container direction="row"
                columns={20} justifyContent="center" alignItems="center"
            >
                <Grid item lg={4} md={3} sm={1} xs={1}> {/* Spacing */} </Grid>

                <Grid item lg={6} md={6} sm={10} xs={10} 
                    container columns={12} spacing={2}
                >
                    {map_data.map((map, index) => (
                        <Grid item xs={6} sm={6} md={4} key={index}>
                            <MapCard
                                id={map.id}
                                name={map.name}
                                description={"Click to view map"}
                                href={`/map/${map.id}`}
                            />
                        </Grid>
                    ))}

                    {/* There are two more maps */}
                    {/* One is for randomized objects */}
                    {/* One is for random select */}

                    

                    <Grid item xs={6} sm={6} md={4} key={map_data.length}>
                        <MapCard
                            id={map_data.length}
                            name={"Randomized Objects"}
                            description={"Click to view randomized objects"}
                            href="/map/random"
                        />
                    </Grid>

                    <Grid item xs={6} sm={6} md={4} key={map_data.length + 1}>
                        <MapCard
                            id={map_data.length + 1}
                            name={"Random Select"}
                            description={"Click to view random select"}
                            href={`/map/${random_select()}`}
                        />
                    </Grid>
                </Grid>
                
                <Grid item lg={4} md={3} sm={1} xs={1}> {/* Spacing */} </Grid>
            </Grid>

            

            {/* Button to return home bottom center */}
            <Grid item sm>
                <Box
                    display="flex"
                    justifyContent="center"
                    mt={3}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        href="/"
                    >
                        Return
                    </Button>
                </Box>
            </Grid>
            
        </Grid>
    </>
}