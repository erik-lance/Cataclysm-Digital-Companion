import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface MapCardProps {
    id: number;
    name: string;
    description: string;
    href: string;
    color?: string
}

export default function MapCard( { id, name, description, href, color }: MapCardProps ) {
    if (color === undefined) {
        color = "background.paper"
    }
    return (
        <Card
            style={{ backgroundColor: color }}
        >
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