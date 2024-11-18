'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

import { Toaster } from "react-hot-toast";



import React, { useEffect } from "react";
import Script from "next/script";


const inter = Inter({ subsets: ["latin"] });



/*
export const metadata: Metadata = {
  title: "WEB3 Starter",
  description:
    "Starter for  WEB3 Wallet.",
};
*/





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  /*
  useEffect(() => {
  
    window.googleTranslateElementInit = () => {
     new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
    };
  
   }, []);
   */


  return (
    <html lang="en">



      <head>
        
        {/* Google Translate */}
        {/*}
        <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        ></Script>
        */}

   

        {/* Google Translate CSS */}
        {/*
        <link
        rel="stylesheet"
        type="text/css"
        href="https://www.gstatic.com/_/translate_http/_/ss/k=translate_http.tr.26tY-h6gH9w.L.W.O/am=CAM/d=0/rs=AN8SPfpIXxhebB2A47D9J-MACsXmFF6Vew/m=el_main_css"
        />
        */}


        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>PPUMP OTC</title>
        <meta name="description" content="Starter for Tether Pay." />
        <link rel="icon" href="/favicon.ico" />




      </head>



      <body className={inter.className}>



        <ThirdwebProvider>

          <Toaster />
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
