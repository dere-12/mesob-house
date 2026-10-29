import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { siteUrl } from "@/lib/seo";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteDescription =
  "Discover Ethiopian food traditions, explore authentic flavors, and order your favorites from Mesob House.";

export const metadata = {
  metadataBase: siteUrl,

  title: {
    default: "Mesob House | Ethiopian Food & Hospitality",
    template: "%s | Mesob House",
  },

  description: siteDescription,
  applicationName: "Mesob House",

  openGraph: {
    title: "Mesob House | Ethiopian Food & Hospitality",
    description: siteDescription,
    siteName: "Mesob House",
    locale: "en_ET",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${plusJakartaSans.variable}`}
    >
      <body
        className={`${plusJakartaSans.className} flex min-h-screen flex-col`}
      >
        <Providers>
          <Header />

          <div id="site-content" className="flex-1">
            {children}
          </div>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
