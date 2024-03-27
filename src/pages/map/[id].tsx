import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import map_data from '../../data/map_data.json';
import { useRouter } from 'next/router';

export default function Map() {
    const router = useRouter();
    const { id } = router.query;
    return <>
        <Container
            maxWidth="lg"
        >
            <Box
                p={12}
            >
            </Box>
        </Container>
    </>
}