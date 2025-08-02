import { Html, Head, Main, NextScript } from "next/document";
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
