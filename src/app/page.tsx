import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between h-screen">
      <Box
        className="my-auto"
      >
        <Typography variant="h1"
          sx={{ fontSize: "3rem" }}
        >
          Cataclysm
        </Typography>
        <Stack
          spacing={2}
        >
          <Button variant="contained" href="/maps">Start Game</Button>
          <Button variant="contained" href="/cards">Glossary</Button>
        </Stack>
      </Box>
    </main>
  );
}
