import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import card_data from '../../data/card_data.json';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface CardData {
    id: number;
    name: string;
    image: string;
    description: string;
    type: string;
    numCopies: number;
    detailed: string;
}

export default function GameCard() {
    const router = useRouter();
    const { id } = router.query;
    const cardNum:number = parseInt(id as string);
    const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
    const isLargeScreen = useMediaQuery('(min-width: 960px)');

    useEffect(() => {
        setSelectedCard(card_data[cardNum]);
    }, [cardNum]);

    // Calculate image height based on screen size
    const imageHeight = isLargeScreen ? 600 : 300;

    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" p={3}>

            <Grid item lg>
                <Typography variant="h3" align="center" gutterBottom style={{ marginBottom: '50px' }} >
                        {selectedCard?.name}
                </Typography>
            </Grid>

            <Grid item container direction="row" columns={20} justifyContent="center" alignItems="center">
                <Grid item lg={2} md={1} sm={1} xs={1}> {/* Spacing */} </Grid>

                <Grid item lg={8} md={10} sm={10} xs={10} container spacing={6}>
                    <Grid item xs={12} sm={6} container justifyContent="center">
                        <Card>
                            <CardMedia
                                component="img"
                                image="../cards/question.png"
                                alt="Image"
                                style={{ minWidth: '100%', height: imageHeight }} 
                            />
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} container justifyContent="left">
                        <Card sx={{ bgcolor: 'rgba(0, 0, 0, 0)' }}> 
                            <CardContent>

                                <Typography display="flex" alignItems="center" gutterBottom variant="h5" component="div" style={{ marginBottom: '20px' }}>
                                    <Typography variant="h5" component="div" fontWeight="bold" style={{ marginRight: '10px' }}>
                                        Card Type:
                                    </Typography>
                                    <Typography variant="h6">
                                        {selectedCard?.type}
                                    </Typography>
                                </Typography>

                                <Typography display="flex" alignItems="center" gutterBottom variant="h5" component="div" style={{ marginBottom: '20px' }}>
                                    <Typography variant="h5" component="div" fontWeight="bold" style={{ marginRight: '10px' }}>
                                        Number of Copies:
                                    </Typography>
                                    <Typography variant="h6">
                                        {selectedCard?.numCopies}
                                    </Typography>
                                </Typography>

                                <Typography gutterBottom variant="h5" component="div"  fontWeight="bold">
                                    Description:
                                </Typography>
                                <Typography variant="h6">
                                    {selectedCard?.detailed || selectedCard?.description}
                                </Typography>
                                
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item lg={2} md={1} sm={1} xs={1}> {/* Spacing */} </Grid>
            </Grid>

            {/* Button to return home bottom center */}
            <Grid item sm style={{ marginTop: '30px' }}>
                <Box display="flex" justifyContent="center" mt={3}>
                    <Button variant="contained" color="primary" href="/cards" size="large">
                        Return
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}
