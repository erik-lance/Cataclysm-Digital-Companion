import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface MapCardProps {
    id: number;
    name: string;
    description: string;
    href: string;
    color?: string
    disabled?: boolean
}

export default function MapCard( { id, name, description, href, color, disabled=false }: MapCardProps ) {
    if (color === undefined) {
        color = "background.paper"
    }
    return (
        <Card
            style={{ backgroundColor: color }}
        >
            <CardActionArea
                href={href}
                disabled={disabled}
            >
                <CardContent>
                    <Typography gutterBottom display="inline" noWrap
                        sx={{ 
                            typography: { sm: 'h6', md: 'h5' },
                        }}
                    >
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}