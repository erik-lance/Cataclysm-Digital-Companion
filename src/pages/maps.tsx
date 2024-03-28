import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import map_data from '../data/map_data.json';
import { random_select } from '../utils/randomizer';

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
                            <Card>
                                <CardActionArea
                                    href={`/map/${map.id}`}
                                >
                                    <CardMedia
                                        component="img"
                                        image="maps/question.png"
                                        alt={map.name} 
                                    />
                                    
                                    <CardContent>
                                        <Typography gutterBottom
                                            sx={{ typography: { sm: 'h6', md: 'h5' } }}
                                        >
                                            {map.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                
                            </Card>
                        </Grid>
                    ))}

                    {/* There are two more maps */}
                    {/* One is for randomized objects */}
                    {/* One is for random select */}

                    <Grid item xs={6} sm={6} md={4} key={map_data.length}>
                        <Card>
                            <CardActionArea
                                href="/map/random"
                            >
                                <CardMedia
                                    component="img"
                                    image="maps/question.png"
                                    alt="Randomized Objects" />
                                
                                <CardContent>
                                    <Typography gutterBottom
                                        sx={{ typography: { sm: 'h6', md: 'h5' } }}
                                    >
                                        Randomized Objects
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            
                        </Card>
                    </Grid>

                    <Grid item xs={6} sm={6} md={4} key={map_data.length + 1}>
                        <Card>
                            <CardActionArea
                                href={`/map/${random_select()}`}
                            >
                                <CardMedia
                                    component="img"
                                    image="maps/question.png"
                                    alt="Random Select" />
                                
                                <CardContent>
                                    <Typography gutterBottom
                                        sx={{ typography: { sm: 'h6', md: 'h5' } }}
                                    >
                                        Random Select
                                    </Typography>
                                </CardContent>
                            </CardActionArea> 
                        </Card>
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