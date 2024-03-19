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
          <div className="scroll-smooth max-w-[1440px] mx-auto min-h-[80vh] border border-black px-2">
            <Breadcrumbs path={path} />
            {children}

          </div>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}