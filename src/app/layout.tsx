import type { Metadata, Viewport } from "next";
import "@fontsource/fredoka/500.css";
import "@fontsource/fredoka/600.css";
import "@fontsource/fredoka/700.css";
import "./globals.css";
import { AppStateProvider } from "@/components/AppState";
import Nav from "@/components/Nav";
import TopBar from "@/components/TopBar";

export const metadata: Metadata = {
  title: "GameTapGo — Scroll. Tap. Play.",
  description: "Scroll game trailers, tap to play free demos, save games you love.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0a1130" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppStateProvider>
          <div className="devbar" role="note">Preview · sample games · accounts not connected yet</div>
          <TopBar />
          <div className="shell">
            <Nav />
            <main className="content">{children}</main>
          </div>
        </AppStateProvider>
      </body>
    </html>
  );
}
