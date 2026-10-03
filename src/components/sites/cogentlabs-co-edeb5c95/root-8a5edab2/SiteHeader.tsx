"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ArrowUpRightIcon, CloseIcon, MenuIcon } from "./icons";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blogs", href: "/blogs" },
  { label: "About Us", href: "/about-us" },
];

export type SiteHeaderProps = {
  tone?: "light" | "dark";
};

export function SiteHeader({ tone = "light" }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDark = tone === "dark";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerSurface = isDark
    ? isScrolled || isMenuOpen
      ? "border-white/10 bg-[rgba(26,26,26,0.94)] backdrop-blur-md"
      : "border-white/10 bg-[#1a1a1a]"
    : isScrolled || isMenuOpen
      ? "border-[#d7d3cb] bg-[rgba(244,242,236,0.92)] backdrop-blur-md"
      : "border-transparent bg-transparent";

  const navLinkClass = isDark
    ? "link-line text-sm font-medium text-white/65 transition-colors hover:text-white"
    : "link-line text-sm font-medium text-[#111111] transition-opacity hover:opacity-60";

  const menuButtonClass = isDark
    ? "flex size-10 items-center justify-center border border-white/20 text-white lg:hidden"
    : "flex size-10 items-center justify-center border border-[#d7d3cb] lg:hidden";

  const mobilePanelClass = isDark
    ? `overflow-hidden border-t bg-[#1a1a1a] transition-[max-height,opacity,border-color] duration-300 lg:hidden ${
        isMenuOpen ? "max-h-[28rem] border-white/10 opacity-100" : "max-h-0 border-transparent opacity-0"
      }`
    : `overflow-hidden border-t bg-[#f4f2ec] transition-[max-height,opacity,border-color] duration-300 lg:hidden ${
        isMenuOpen ? "max-h-[28rem] border-[#d7d3cb] opacity-100" : "max-h-0 border-transparent opacity-0"
      }`;

  const mobileLinkClass = isDark
    ? "flex items-center justify-between py-3.5 text-base font-medium text-white"
    : "flex items-center justify-between py-3.5 text-base font-medium";

  const mobileBorderClass = isDark ? "border-b border-white/10" : "border-b border-[#d7d3cb]";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${headerSurface}`}
    >
      <div className="shell flex h-20 items-center justify-between gap-5">
        <Link
          href="/"
          aria-label="BXTrack home"
          className="group flex shrink-0 items-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src={
              isDark
                ? "/sites/cogentlabs-co-edeb5c95/shared/bxtrack-white-logo.png"
                : "/sites/cogentlabs-co-edeb5c95/shared/bxtrack-official-logo.png"
            }
            alt="BXTrack"
            width={148}
            height={35}
            priority
            className="h-auto w-[132px] sm:w-[150px]"
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="#contact"
            className={
              isDark
                ? "group flex h-10 items-center gap-2 bg-[#f47820] px-3 text-xs font-semibold text-[#1a1a1a] transition-colors hover:bg-white sm:px-4 sm:text-sm"
                : "group flex h-10 items-center gap-2 bg-[#111111] px-3 text-xs font-semibold text-[#f4f2ec] transition-colors hover:bg-[#f47820] hover:text-[#111111] sm:px-4 sm:text-sm"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="hidden sm:inline">Start a Project</span>
            <span className="sm:hidden">Start</span>
            <ArrowUpRightIcon className="arrow-shift size-4" />
          </Link>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className={menuButtonClass}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      <div id="mobile-navigation" className={mobilePanelClass}>
        <nav aria-label="Mobile navigation" className="shell flex flex-col py-4">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${mobileLinkClass} ${index === navigation.length - 1 ? "" : mobileBorderClass}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
              <ArrowUpRightIcon className="size-4" />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
