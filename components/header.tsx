"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-primary/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
            🧳
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-foreground">WanderWallet</h1>
            <p className="text-xs text-primary font-semibold">Smart Travel Planner</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <a href="#features" className="text-foreground hover:text-primary transition font-medium">
            Features
          </a>
          <Link href="/planner" className="text-foreground hover:text-primary transition font-medium">
            Trip Planner
          </Link>
          <a href="#travel-mode" className="text-foreground hover:text-primary transition font-medium">
            Plan Trip
          </a>
          <a href="#recommendations" className="text-foreground hover:text-primary transition font-medium">
            Recommendations
          </a>
          <a href="#compare" className="text-foreground hover:text-primary transition font-medium">
            Explore
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-card border-t border-primary/20 p-4 flex flex-col gap-4">
          <a href="#features" className="text-foreground hover:text-primary font-medium">
            Features
          </a>
          <Link href="/planner" className="text-foreground hover:text-primary font-medium">
            Trip Planner
          </Link>
          <a href="#travel-mode" className="text-foreground hover:text-primary font-medium">
            Plan Trip
          </a>
          <a href="#recommendations" className="text-foreground hover:text-primary font-medium">
            Recommendations
          </a>
          <a href="#compare" className="text-foreground hover:text-primary font-medium">
            Explore
          </a>
        </nav>
      )}
    </header>
  )
}
