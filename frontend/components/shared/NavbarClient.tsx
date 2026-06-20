"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavbarData, NavLink } from "@/lib/getGlobal";
import { getImageUrl } from "@/lib/api";

function getLinkLabel(link?: NavLink) {
  if (link?.label?.trim()) return link?.label;

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
}: {
  navbar?: NavbarData | null;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  function toggleDropdown(key: string | number) {
    setOpenDropdown((current) => (current === key ? null : key));
  }

  function closeAll() {
    setMobileOpen(false);
    setOpenDropdown(null);
  }

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoUrl = navbar?.logoImage ? getImageUrl(navbar.logoImage) : null;

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0b0b0b]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        {logoUrl ? (
          <Link href={navbar?.logoLink || "/"} className="flex items-center">
            <img
              src={logoUrl}
              alt={navbar?.logoAlt ?? "Logo"}
              className="h-9 w-auto object-contain"
            />
          </Link>
        ) : navbar?.logo ? (
          <Link href="/" className="text-xl font-black tracking-tight text-white">
            {navbar.logo}
          </Link>
        ) : null}

        {}
        <button
          type="button"
          className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white md:hidden"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((v) => !v)}
        >
          Menu
        </button>

        {}
        <nav
          className={`${mobileOpen ? "flex" : "hidden"} absolute left-0 top-full w-full flex-col gap-1 border-b border-white/10 bg-[#0b0b0b]/95 p-5 md:static md:flex md:w-auto md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
        >
          {navbar?.links?.map((link, index) => {
            const label = getLinkLabel(link);
            const key = link?.id ?? `${link?.label}-${index}`;
            const hasChildren = link?.children && link.children.length > 0;
            const isDropdownOpen = openDropdown === key;

            
            if (hasChildren) {
              return (
                <div className="relative" key={key}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                    aria-expanded={isDropdownOpen}
                    onClick={() => toggleDropdown(key)}
                  >
                    {label}
                    <span
                      aria-hidden="true"
                      className={`text-[10px] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </button>

                  {isDropdownOpen ? (
                    <div className="grid gap-1 pl-3 md:absolute md:left-0 md:top-full md:mt-2 md:min-w-56 md:rounded-xl md:border md:border-white/10 md:bg-[#151515] md:p-2 md:pl-2 md:shadow-2xl">
                      {link.children!.map((child, childIndex) =>
                        child?.url && child?.label ? (
                          <Link
                            key={child?.id ?? `${child?.label}-${childIndex}`}
                            href={child.url}
                            className="rounded-lg px-3 py-2 text-sm text-white/65 transition hover:bg-white/10 hover:text-white"
                            onClick={closeAll}
                          >
                            {child.label}
                          </Link>
                        ) : null,
                      )}
                    </div>
                  ) : null}
                </div>
              );
            }

            
            if (!link?.url || !label) return null;

            const linkClass =
              "rounded-lg px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white";

            return link?.isExternal ? (
              <a
                key={key}
                href={link.url}
                className={linkClass}
                target="_blank"
                rel="noreferrer"
                onClick={closeAll}
              >
                {label}
              </a>
            ) : (
              <Link key={key} href={link.url} className={linkClass} onClick={closeAll}>
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
