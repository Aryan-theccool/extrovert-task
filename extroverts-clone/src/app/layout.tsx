import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import DemoBadge from "@/components/ui/DemoBadge";
// Poppins self-hosted via @fontsource (bundled at build time, no runtime request)
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Extroverts — An App Only For Extroverts",
  description:
    "Signup wizard replication — frontend engineering assessment build.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <DemoBadge />
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            style: {
              background: "#1F1F1F",
              border: "1px solid #2A2A2A",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
