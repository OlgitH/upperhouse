import type { Metadata } from "next";
import { Bebas_Neue, Libre_Baskerville, Montserrat, Open_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { site } from "@/content";
import "./globals.css";

// Open Sans for body copy, Montserrat for nav/buttons/labels, Adobe Fonts Schoolbook for display headings.
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
const baskerville = Libre_Baskerville({ variable: "--font-baskerville", subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"] });
const logoFont = Bebas_Neue({ variable: "--font-logo", subsets: ["latin"], weight: "400" });
const openSans = Open_Sans({ variable: "--font-open-sans", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://upperhouseandspa.co.uk"),
  title: { default: `${site.name} | Luxury holiday cottages near Hay-on-Wye`, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${montserrat.variable} ${openSans.variable} ${baskerville.variable} ${logoFont.variable}`}>
      <head>
        {/* Adobe Fonts kit: "schoolbook" is the display face */}
        <link rel="stylesheet" href="https://use.typekit.net/dwu5ljd.css" />
      </head>
      <body className="flex min-h-screen flex-col">
        <ScrollToTop />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
