import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Box>
        <Typography variant="h1">Cataclysm</Typography>
        <Stack
          spacing={2}
        >
          <Button variant="contained" href="/maps">Start Game</Button>
          <Button variant="contained">Glossary</Button>
        </Stack>
      </Box>
    </main>
  );
}
