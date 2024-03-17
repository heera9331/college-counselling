"use client";

import { Header, Footer } from "@/components";

import Breadcrumbs from "@/components/Breadcrumb";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children, params }) {
  const path = usePathname();
  console.log(params);
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Heera Singh Lodhi" />
      </head>
      <body className="m-auto">
        <SessionProvider>
          <Header />
          <div className="pb-4 max-w-[1440px] mx-auto min-h-[75vh]">
            <Breadcrumbs path={path} />
            {children}
          </div>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}