"use client";
import AuthContextProvider from "@/contexts/auth/AuthContextProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Breadcrumbs from "@/components/Breadcrumb";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const path = usePathname();
  console.log("current path -", path);
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Heera Singh Lodhi" />
        <meta
          title="Home"
          description="A software that help you to handle your counseling in your organization, it provide many features of counseling like tracking status, interested, courses and enrolled students"
        />
      </head>
      <body className="m-auto">
        <AuthContextProvider>
          <Header />

          <div className="pb-4 mt-2 max-w-[1440px] m-auto min-h-[75vh]">
            <Breadcrumbs path={path} />
            {children}
          </div>
          {/* <div className="min-h-[80vh]"></div> */}
          <Footer />
        </AuthContextProvider>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></script>
      </body>
    </html>
  );
}
