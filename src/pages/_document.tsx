import { Html, Head, Main, NextScript } from "next/document";
import { GeistSans } from "@/fonts/sans";
import { GeistMono } from "@/fonts/mono";

export default function Document() {
  return (
    <Html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
