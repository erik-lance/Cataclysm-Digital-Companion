import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ThemeWrapper from "@/components/ThemeWrapper";
import { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme";
import Image from "next/image";
import { Container } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

function MyApp({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />

        {/* Logo at bottom left corner */}
        <Container
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                padding: 1,
            }}
        >
            <Image
            src="/cataclysm_logo_yellow_small.png"
            alt="Logo"
            width={25}
            height={25}
            />
        </Container>
        
        </ThemeProvider>
    )
}

export default MyApp;