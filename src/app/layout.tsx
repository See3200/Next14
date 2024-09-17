import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.scss";
import { SWRProvider } from "@/providers/SwrProvider";
import QueryProvider from "@/providers/QueryProvider";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { cookies } from "next/headers";
import { InitialClientSide } from "@/components/InitialClientSide";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next14 with Reqres",
  description: "Some test app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = cookies().get("accessToken") !== undefined;

  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex,nofollow" />
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <SWRProvider>
            <MantineProvider>
              <InitialClientSide isLoggedIn={isLoggedIn} />
              <main>{children}</main>
            </MantineProvider>
          </SWRProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
