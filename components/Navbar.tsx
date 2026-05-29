'use client'

import { useTheme } from '@/components/ThemeProvider'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#about',    label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills',   label: 'Skills' },
  { href: '#contact',  label: 'Contact' },
]

const sectionIds = navLinks.map(l => l.href.slice(1))

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center pointer-events-none px-6">
      <div className="pointer-events-auto w-full max-w-5xl flex items-center justify-between relative">

        {/* Brand mark */}
        <a
          href="#"
          aria-label="Home"
          className="pointer-events-auto font-heading font-bold tracking-tight text-base select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 rounded-sm"
        >
          <span className="text-accent">A</span><span className="text-foreground">DR</span>
        </a>

        {/* Floating pill nav — absolutely centered on the navbar */}
        <nav
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 px-2 py-1.5 rounded-full bg-background/90 backdrop-blur border border-border shadow-sm"
          aria-label="Primary navigation"
        >
          <ul className="flex items-center">
          {navLinks.map(link => {
            const id = link.href.slice(1)
            const isActive = activeSection === id
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 ${
                    isActive
                      ? 'text-accent bg-accent/15'
                      : 'text-muted hover:text-foreground hover:bg-surface/60'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
          </ul>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-background/90 backdrop-blur text-muted hover:text-foreground hover:bg-surface transition-colors duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
          >
            {resolvedTheme === 'dark' ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-border bg-background/90 backdrop-blur text-muted hover:text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
            onClick={() => setMenuOpen(v => !v)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu — full-width dropdown */}
      {menuOpen && (
        <div className="pointer-events-auto absolute top-full mt-2 inset-x-6 bg-background/95 backdrop-blur border border-border rounded-2xl shadow-lg px-4 pb-4 pt-2">
          <ul className="flex flex-col gap-1">
            {navLinks.map(link => {
              const id = link.href.slice(1)
              const isActive = activeSection === id
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`block px-3 py-2.5 rounded-xl transition-colors duration-200 font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isActive
                        ? 'text-accent bg-accent/15'
                        : 'text-muted hover:text-foreground hover:bg-surface'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}
