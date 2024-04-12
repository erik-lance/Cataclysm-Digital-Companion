import { Button, Grid, Typography } from "@mui/material";

export default function Game() {
    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" p={3}>
            <Grid item xl lg md sm xs> {/* Title */}
                <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
                    Game
                </Typography>
            </Grid>

            <Grid item xl lg md sm xs> {/* Description */}
                <Typography variant="h5" align="center" gutterBottom>
                    This is the game page.
                </Typography>
            </Grid>

            <Grid item xl lg md sm xs> {/* Description */}
                <Button variant="contained" color="primary">
                    Next Cycle
                </Button>
            </Grid>
        </Grid>
    );
}