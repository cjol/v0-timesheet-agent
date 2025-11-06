"use client"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function MainNav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedMatter, setSelectedMatter] = useState("Project Blackstone")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b border-border bg-card sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="h-8">
            <Image src="/logo.png" alt="FixMyTime" width={32} height={32} className="h-8 w-auto" />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            {/* Nav Items */}
            <Link
              href="/time-entries"
              className={`text-sm font-medium transition-colors ${
                isActive("/time-entries") ? "text-foreground" : "hover:text-foreground text-muted-foreground"
              }`}
            >
              Time
            </Link>
            <Link
              href="/bills"
              className={`text-sm font-medium transition-colors ${
                isActive("/bills") ? "text-foreground" : "hover:text-foreground text-muted-foreground"
              }`}
            >
              Bills
            </Link>
            <Link
              href="/rules"
              className={`text-sm font-medium transition-colors ${
                isActive("/rules") ? "text-foreground" : "hover:text-foreground text-muted-foreground"
              }`}
            >
              Rules
            </Link>
            <Link
              href="/settings"
              className={`text-sm font-medium transition-colors ${
                isActive("/settings") ? "text-foreground" : "hover:text-foreground text-muted-foreground"
              }`}
            >
              Settings
            </Link>

            {/* Vertical Divider */}
            <div className="h-6 w-px bg-border" />

            {/* Matter Switcher */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-md hover:bg-muted/50 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="text-sm font-medium">{selectedMatter}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-md shadow-lg z-50">
                  <div className="py-1">
                    {/* // TODO: replace these from centralised matter list, and allow setting the current matter in global context */}
                    {[
                      "Project Blackstone",
                      "Anderson Corp Litigation",
                      "Smith Estate Planning",
                      "TechStart Acquisition",
                    ].map((matter) => (
                      <button
                        key={matter}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-colors"
                        onClick={() => {
                          setSelectedMatter(matter)
                          setIsDropdownOpen(false)
                        }}
                      >
                        {matter}
                      </button>
                    ))}

                    {/* Divider */}
                    <div className="border-t border-border my-1" />

                    {/* Logout */}
                    <button
                      className="w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-colors text-muted-foreground"
                      onClick={() => {
                        console.log("Logging out...")
                        setIsDropdownOpen(false)
                      }}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
