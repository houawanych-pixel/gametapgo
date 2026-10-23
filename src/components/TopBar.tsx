"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import { Bell, Search, User } from "./Icons";

export default function TopBar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  return (
    <header className="topbar">
      <Link href="/" aria-label="GameTapGo home" className="logo-link"><Logo /></Link>
      <form className="search desk-only" role="search"
        onSubmit={(e) => { e.preventDefault(); router.push(`/explore?q=${encodeURIComponent(q)}`); }}>
        <Search />
        <input type="search" placeholder="Search games, developers…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
      </form>
      <div className="top-actions">
        <Link href="/explore" className="icon-btn phone-only" aria-label="Search"><Search size={22} /></Link>
        <button className="icon-btn desk-only" aria-label="Notifications"><Bell /></button>
        <Link href="/profile" className="me desk-only" aria-label="Your profile"><User size={20} /></Link>
      </div>
    </header>
  );
}
