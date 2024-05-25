"use client";

/**
 * overal app layout, which have header and footer with dark
 * background
 */

import { Header, Footer } from "@/components";

import Breadcrumbs from "@/components/Breadcrumb";
import { usePathname } from "next/navigation";


/**
 * importing redux libraries
 */

// import { AppStore, makeStore } from '@/lib/store'
// import { Provider } from 'react-redux'

import "./globals.css"


/**
 * importing my search context provider and other providers
 */
import { SearchProvider } from "@/contexts/search-context/SearchContextProvider";
import { StudentContextProvider } from "@/contexts/StudentContext";
import { AuthContextProvider } from "@/contexts/AuthContext";


export default function RootLayout({
  children,
  params,
}: {
  children: string;
  params: string;
}) {
  const path = usePathname();
  // const storeRef = useRef<AppStore>();
  // if (!storeRef.current) {
  //   // Create the store instance the first time this renders
  //   storeRef.current = makeStore();
  // }

  return (
    <html lang="en">
      <head> 
        <meta name="author" content="Heera Singh Lodhi" />
      </head>
      <body className="m-auto bg-bgWhite-100">
        <AuthContextProvider>
          <StudentContextProvider>
            {/* <Provider store={storeRef.current}> */}
            <SearchProvider>
              <Header />
              <div className="scroll-smooth max-w-[1440px] mx-auto min-h-[80vh] border border-black px-2 pb-10">
                <Breadcrumbs path={path} />
                {children}
              </div>
              <Footer />
            </SearchProvider>
            {/* </Provider> */}
          </StudentContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
