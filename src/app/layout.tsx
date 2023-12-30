import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";
import Toast from "@/components/Toast/Toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Constant from "@/libs/constant";
import { CookiesProvider } from "next-client-cookies/server";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  title: "Hotel Management App",
  description: "Discover the best hotel room",
};
const cli = "" + Constant.GOOGLE_CLIENT_ID;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CookiesProvider>
          <GoogleOAuthProvider clientId={Constant.GOOGLE_CLIENT_ID}>
            <ThemeProvider>
              <Toast />
              <main className="font-normal">
                <Header />
                {children}
                <Footer />
              </main>
            </ThemeProvider>
          </GoogleOAuthProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
