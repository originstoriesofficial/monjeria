import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "La Monjería",
    description: "AI Animation and Music Studio",
    other: {
      "fc:miniapp": JSON.stringify({
        version: "next",
        imageUrl: "https://monjeria.vercel.app/preview.png", // Replace with actual preview image
        button: {
          title: "Enter La Monjería",
          action: {
            type: "launch_frame",
            name: "La Monjería",
            url: "https://monjeria.vercel.app", // Replace with actual deployed app URL
          },
        },
      }),
    },
  };
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], variable: "--font-source-code-pro" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sourceCodePro.variable} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
