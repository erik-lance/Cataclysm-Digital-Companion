import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface MapCardProps {
    id: number;
    name: string;
    description: string;
    href: string;
}

export default function MapCard( { id, name, description, href }: MapCardProps ) {
    return (
        <Card>
            <CardActionArea
                href={href}
            >
                <CardContent>
                    <Typography gutterBottom
                        sx={{ typography: { sm: 'h6', md: 'h5' } }}
                    >
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}