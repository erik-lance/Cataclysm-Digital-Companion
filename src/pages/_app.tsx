import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ThemeWrapper from "@/components/ThemeWrapper";
import { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme";

const inter = Inter({ subsets: ["latin"] });

function MyApp({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp;