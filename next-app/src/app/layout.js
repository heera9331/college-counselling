import AuthContextProvider from "@/contexts/auth/AuthContextProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Heera Singh Lodhi" />
        <meta
          title="Home"
          description="A software that help you to handle your counseling in your organization, it provide many features of counseling like tracking status, interested, courses and enrolled students"
        />
      </head>
      <body className="max-w-[1440px] m-auto">
        <AuthContextProvider>
          <Header />
          <div className="mt-2">{children}</div>
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
