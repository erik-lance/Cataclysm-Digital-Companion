import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import card_data from '../data/card_data.json';

export default function GameCards() {

    const move_cards = card_data.filter(card => card.type === 'Move');
    const action_cards = card_data.filter(card => card.type === 'Action');
    const powerup_cards = card_data.filter(card => card.type === 'Powerup');

    return <>
        <Grid container direction="column" justifyContent="center" alignItems="center" p={3}>

            <Grid item lg>
                <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
                        Move Cards
                </Typography>
            </Grid>

            <Grid item container direction="row" columns={20} justifyContent="center" alignItems="center">
                <Grid item lg={2} md={1} sm={1} xs={1}> {/* Spacing */} </Grid>

                <Grid item lg={8} md={10} sm={10} xs={10} container spacing={3}>
                    {move_cards.map((card, index) => (
                        <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
                            <Card>
                                <CardActionArea href={`/card/${card.id}`}>
                                    <CardMedia component="img" image={`/cards/${card.image}`} alt={card.name} />         
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Grid item lg={2} md={1} sm={1} xs={1}> {/* Spacing */} </Grid>
            </Grid>

            <Grid item lg>
                <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '60px' }} fontWeight="bold">
                        Action Cards
                </Typography>
            </Grid>

            <Grid item container direction="row" columns={20} justifyContent="center" alignItems="center">
                <Grid item lg={2} md={1} sm={1} xs={1}> {/* Spacing */} </Grid>
                <Grid item lg={8} md={10} sm={10} xs={10} container spacing={3}>
                    {action_cards.map((card, index) => (
                        <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
                            <Card>
                                <CardActionArea href={`/card/${card.id}`}>
                                    <CardMedia component="img" image={`/cards/${card.image}`} alt={card.name} />
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Grid item lg={2} md={1} sm={1} xs={1}> {/* Spacing */} </Grid>
            </Grid>

            <Grid item lg>
                <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '60px' }} fontWeight="bold">
                        Powerup Cards
                </Typography>
            </Grid>

            <Grid item container direction="row" columns={20} justifyContent="center" alignItems="center">
                <Grid item lg={2} md={1} sm={1} xs={1}> {/* Spacing */} </Grid>

                <Grid item lg={8} md={10} sm={10} xs={10} container spacing={3}>
                    {powerup_cards.map((card, index) => (
                        <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
                            <Card>
                                <CardActionArea href={`/card/${card.id}`}>
                                    <CardMedia component="img" image={`/cards/${card.image}`} alt={card.name} />
                                    
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Grid item lg={2} md={1} sm={1} xs={1}> {/* Spacing */} </Grid>
            </Grid>

            {/* Button to return home bottom center */}
            <Grid item sm style={{ marginTop: '30px' }}>
                <Box display="flex" justifyContent="center" mt={3}>
                    <Button variant="contained" color="primary" href="/" size="large">
                        Return
                    </Button>
                </Box>
            </Grid>
        </Grid>
    </>
}

