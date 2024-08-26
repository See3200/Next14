import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.scss";
import { SWRProvider } from "@/providers/SwrProvider";
import QueryProvider from "@/providers/QueryProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <SWRProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </SWRProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
