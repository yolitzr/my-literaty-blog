import type { Metadata } from "next";
import { Playfair_Display, Lora, Montserrat } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yolit's Bookish Blog | Mi rincón literario",
  description:
    "Reseñas honestas, lecturas inevitables y todo lo que hace amar los libros. En español e inglés.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfairDisplay.variable} ${lora.variable} ${montserrat.variable}`}
    >
      <body>
        <StyledComponentsRegistry>
          <Header />
          <main style={{ flex: 1, background: '#fff' }}>{children}</main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
