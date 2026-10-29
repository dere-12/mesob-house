import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { siteUrl } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteDescription =
  "Discover traditional Ethiopian dishes and order your favorites for delivery across Addis Ababa.";

export const metadata = {
  metadataBase: siteUrl,

  title: {
    default: "Addis Eats - Food Delivery in Addis Ababa",
    template: "%s | Addis Eats",
  },

  description: siteDescription,
  applicationName: "Addis Eats",

  openGraph: {
    title: "Ethiopian Food Delivery in Addis Ababa | Addis Eats",
    description: siteDescription,
    siteName: "Addis Eats",
    locale: "en_ET",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
