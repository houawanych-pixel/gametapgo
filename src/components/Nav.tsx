"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Compass, Home, Plus, User, Users } from "./Icons";
import ModeCard from "./ModeCard";

type Item = { href: string; label: string; Icon: (p: { size?: number }) => React.ReactNode; desk?: boolean; phone?: boolean; accent?: boolean };

const ITEMS: Item[] = [
  { href: "/", label: "Home", Icon: Home, desk: true, phone: true },
  { href: "/explore", label: "Explore", Icon: Compass, desk: true, phone: true },
  { href: "/following", label: "Following", Icon: Users, desk: true },
  { href: "/upload", label: "Upload", Icon: Plus, phone: true, accent: true },
  { href: "/my-games", label: "My Games", Icon: Bookmark, desk: true, phone: true },
  { href: "/upload", label: "Upload", Icon: Plus, desk: true },
  { href: "/profile", label: "Profile", Icon: User, desk: true, phone: true },
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="nav" aria-label="Main">
      {ITEMS.map(({ href, label, Icon, desk, phone, accent }, i) => {
        const on = href === "/" ? path === "/" : path.startsWith(href);
        const cls = ["nav-item", on && "on", accent && "accent", !desk && "phone-only", !phone && "desk-only"].filter(Boolean).join(" ");
        return (
          <Link key={`${href}-${i}`} href={href} className={cls} aria-current={on ? "page" : undefined}>
            <span className="nav-icon"><Icon /></span>
            <span className="nav-label">{label}</span>
          </Link>
        );
      })}
      <div className="desk-only nav-mode"><ModeCard /></div>
    </nav>
  );
}
