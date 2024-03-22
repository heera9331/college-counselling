"use client";
import { useRef } from "react";
import { Header, Footer } from "@/components";

import Breadcrumbs from "@/components/Breadcrumb";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

import { AppStore, makeStore } from '@/lib/store'
import { Provider } from 'react-redux'

export default function RootLayout({ children, params }: { children: string, params: string }) {
  const path = usePathname();
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <html lang="en">
      <head>
        <meta name="author" content="Heera Singh Lodhi" />
      </head>
      <body className="m-auto">
        <SessionProvider>
          <Provider store={storeRef.current}>
            <Header />
            <div className="scroll-smooth max-w-[1440px] mx-auto min-h-[80vh] border border-black px-2 pb-10">
              <Breadcrumbs path={path} />
              {children}
            </div>
            <Footer />
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}