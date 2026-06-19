import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Carlin Hou | Software Engineer",
  description:
    "Carlin Hou is a software engineer and incoming University of Michigan MSI student interested in AI systems, full-stack engineering, backend systems, retrieval systems, and ML infrastructure.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
