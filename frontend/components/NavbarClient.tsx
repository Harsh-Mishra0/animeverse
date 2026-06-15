"use client";

import Link from "next/link";
import { useState } from "react";
import type { Genre } from "@/lib/api";
import type { NavbarData, NavLink } from "@/lib/getGlobal";

function getLinkLabel(link?: NavLink) {
  if (link?.label?.trim()) return link?.label;

  const linkType = link?.type ?? link?.types;
  if (linkType === "genre") {
    return `${linkType?.charAt(0)?.toUpperCase()}${linkType?.slice(1)}`;
  }

  const path = link?.url?.split("?")?.[0]?.split("#")?.[0];
  const segment = path?.split("/")?.filter(Boolean)?.at(-1);
  if (!segment && path === "/") return "Home";

  return segment
    ?.split("-")
    ?.map((word) => `${word?.charAt(0)?.toUpperCase()}${word?.slice(1)}`)
    ?.join(" ");
}

export default function NavbarClient({
  navbar,
  genres,
}: {
  navbar?: NavbarData | null;
  genres?: Genre[];
}) {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | number | null>(null);

  function toggleDropdown(key: string | number) {
    setOpenDropdown((current) => (current === key ? null : key));
  }

  function closeNavigation() {
    setOpen(false);
    setOpenDropdown(null);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0b0b0b]/80 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        {navbar?.logo ? (
          <Link href="/" className="text-xl font-black tracking-tight text-white">
            {navbar?.logo}
          </Link>
        ) : null}

        <button
          type="button"
          className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>

        <nav
          className={`${open ? "flex" : "hidden"} absolute left-0 top-full w-full flex-col gap-1 border-b border-white/10 bg-[#0b0b0b]/95 p-5 md:static md:flex md:w-auto md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
        >
          {navbar?.links?.map((link, index) => {
            const linkType = link?.type ?? link?.types;
            const label = getLinkLabel(link);
            const key = link?.id ?? `${link?.label}-${index}`;
            const isDropdownOpen = openDropdown === key;

            if (linkType === "genre") {
              return (
                <div className="group relative" key={key}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                    aria-expanded={isDropdownOpen}
                    onClick={() => toggleDropdown(key)}
                  >
                    {label}
                    <span aria-hidden="true" className="text-[10px]">v</span>
                  </button>
                  <div className={`${isDropdownOpen ? "grid" : "hidden"} gap-1 pl-3 md:invisible md:absolute md:right-0 md:top-full md:grid md:min-w-56 md:translate-y-2 md:rounded-xl md:border md:border-white/10 md:bg-[#151515] md:p-2 md:opacity-0 md:shadow-2xl md:transition md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:opacity-100`}>
                    {genres?.map((genre) =>
                      genre?.slug && genre?.name ? (
                        <Link
                          key={genre?.documentId ?? genre?.id ?? genre?.slug}
                          href={`/browse?genre=${encodeURIComponent(genre?.slug)}`}
                          className="rounded-lg px-3 py-2 text-sm text-white/65 transition hover:bg-white/10 hover:text-white"
                          onClick={closeNavigation}
                        >
                          {genre?.name}
                        </Link>
                      ) : null,
                    )}
                  </div>
                </div>
              );
            }

            if (linkType === "dropdown") {
              return (
                <div className="group relative" key={key}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                    aria-expanded={isDropdownOpen}
                    onClick={() => toggleDropdown(key)}
                  >
                    {label}
                    <span aria-hidden="true" className="text-[10px]">v</span>
                  </button>
                  <div className={`${isDropdownOpen ? "grid" : "hidden"} gap-1 pl-3 md:invisible md:absolute md:right-0 md:top-full md:grid md:min-w-56 md:translate-y-2 md:rounded-xl md:border md:border-white/10 md:bg-[#151515] md:p-2 md:opacity-0 md:shadow-2xl md:transition md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:opacity-100`}>
                    {link?.children?.map((child, childIndex) =>
                      child?.url && child?.label ? (
                        <Link
                          key={child?.id ?? `${child?.label}-${childIndex}`}
                          href={child?.url}
                          className="rounded-lg px-3 py-2 text-sm text-white/65 transition hover:bg-white/10 hover:text-white"
                          onClick={closeNavigation}
                        >
                          {child?.label}
                        </Link>
                      ) : null,
                    )}
                  </div>
                </div>
              );
            }

            if (!link?.url || !label) return null;
            const className = "rounded-lg px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white";

            return link?.isExternal ? (
              <a
                key={key}
                href={link?.url}
                className={className}
                target="_blank"
                rel="noreferrer"
                onClick={closeNavigation}
              >
                {label}
              </a>
            ) : (
              <Link key={key} href={link?.url} className={className} onClick={closeNavigation}>
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
