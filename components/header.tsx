
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenus = () => {
    setToolsOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="flex shrink-0 items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A62A0] to-[#1B9DF0] text-white shadow-lg shadow-blue-900/15">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
            >
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="5.8" />
              <path d="M8.5 12h7M12 8.5v7" />
            </svg>
          </div>

          <div>
            <span className="block text-lg font-extrabold tracking-tight text-slate-900">
              Imprint<span className="text-[#168DE0]">Studio</span>
            </span>
            <span className="block text-[9px] font-semibold uppercase tracking-[2px] text-slate-500">
              Smart Online Tools
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-9 md:flex">

          {/* Tools Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setToolsOpen(!toolsOpen)}
              aria-expanded={toolsOpen}
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition hover:text-[#0A62A0]"
            >
              Tools
              <svg
                className={`h-4 w-4 transition-transform ${
                  toolsOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="m5 7 5 5 5-5" />
              </svg>
            </button>

            {toolsOpen && (
              <>
                <button
                  aria-label="Close tools menu"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setToolsOpen(false)}
                />

                <div className="absolute left-0 top-full z-50 mt-5 w-64 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-900/10">
                  <Link
                    href="/stamp-maker"
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-blue-50"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-[#0A62A0]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
                        <circle cx="12" cy="12" r="9" />
                        <circle cx="12" cy="12" r="5.5" />
                      </svg>
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-slate-800">
                        Stamp Maker
                      </span>
                      <span className="text-xs text-slate-500">
                        Create custom stamps
                      </span>
                    </span>
                  </Link>

                  <Link
                    href="/invoice-maker"
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-blue-50"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
                        <path d="M6 3h9l4 4v14H6z" />
                        <path d="M14 3v5h5M9 13h7M9 17h7" />
                      </svg>
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-slate-800">
                        Invoice Maker
                      </span>
                      <span className="text-xs text-slate-500">
                        Create professional invoices
                      </span>
                    </span>
                  </Link>

                  <Link
                    href="/qr-code-generator"
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-blue-50"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <path d="M14 14h3v3h-3zM20 14v2M17 20h4M20 18v3" />
                      </svg>
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-slate-800">
                        QR Code Generator
                      </span>
                      <span className="text-xs text-slate-500">
                        Generate custom QR codes
                      </span>
                    </span>
                  </Link>
                </div>
              </>
            )}
          </div>

          <Link
            href="/#faqs"
            className="text-sm font-semibold text-slate-700 transition hover:text-[#0A62A0]"
          >
            FAQs
          </Link>

          <Link
            href="/blog"
            className="text-sm font-semibold text-slate-700 transition hover:text-[#0A62A0]"
          >
            Blog
          </Link>

          <Link
            href="/contact"
            className="text-sm font-semibold text-slate-700 transition hover:text-[#0A62A0]"
          >
            Contact
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:block">
          <Link
            href="/stamp-maker"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0A62A0] to-[#168FE0] px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-900/15 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Create Your Stamp
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
        >
          {mobileOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 shadow-lg md:hidden">
          <div className="mx-auto max-w-7xl space-y-2">

            <button
              type="button"
              onClick={() => setToolsOpen(!toolsOpen)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Tools
              <span className="text-lg">{toolsOpen ? "−" : "+"}</span>
            </button>

            {toolsOpen && (
              <div className="ml-3 space-y-1 border-l-2 border-blue-100 pl-3">
                <Link href="/stamp-maker" onClick={closeMenus} className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-blue-50">
                  Stamp Maker
                </Link>
                <Link href="/invoice-maker" onClick={closeMenus} className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-blue-50">
                  Invoice Maker
                </Link>
                <Link href="/qr-code-generator" onClick={closeMenus} className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-blue-50">
                  QR Code Generator
                </Link>
              </div>
            )}

            <Link href="/#faqs" onClick={closeMenus} className="block rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              FAQs
            </Link>

            <Link href="/blog" onClick={closeMenus} className="block rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Blog
            </Link>

            <Link href="/contact" onClick={closeMenus} className="block rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Contact
            </Link>

            <Link
              href="/stamp-maker"
              onClick={closeMenus}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0A62A0] to-[#168FE0] px-5 py-3.5 text-sm font-bold text-white"
            >
              Create Your Stamp →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
