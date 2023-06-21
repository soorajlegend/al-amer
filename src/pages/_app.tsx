import React from "react";
import type { AppProps } from "next/app";
import '../app/globals.css';
import { DataProvider } from "@/components/DataProvider";


const MyApp = ({ Component, pageProps }: AppProps) => (
    <DataProvider>
        <Component {...pageProps} />
    </DataProvider>
)

export default MyApp;
