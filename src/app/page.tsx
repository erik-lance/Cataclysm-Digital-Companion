import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between h-screen">
      <Box
        className="my-auto"
      >
        {/* Logo expands width based on screen */}
        <Box className="flex justify-center mb-12">
        <Image src="/cataclysm_logo.png"  width={790} height={256}
          style={{ width: "80%", height: "auto" }}
          alt="Cataclysm Logo" />
        </Box>
        
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
