import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import map_data from '../data/map_data.json';

export default function Maps() {
    return <>
        <Container
            maxWidth="lg"
        >
            <Box
                p={12}
            >
                <Grid container spacing={3} columns={3}>
                    {map_data.map((map, index) => (
                        <Grid item md={1} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    image="maps/question.png"
                                    alt={map.name} />
                                
                                <CardContent>
                                    <Typography gutterBottom variant="h5">
                                        {map.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    </>
}