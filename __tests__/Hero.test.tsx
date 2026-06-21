import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

describe('Hero', () => {
  it('renders heading with full name', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: /arjay delos reyes/i })).toBeInTheDocument()
  })

  it('has Download Resume link pointing to PDF', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /download resume/i })
    expect(link).toHaveAttribute('href', '/resume.pdf')
  })

  it('has View Projects link pointing to #projects', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /view projects/i })
    expect(link).toHaveAttribute('href', '#projects')
  })

  it('hero section has aria-label for screen readers', () => {
    render(<Hero />)
    expect(screen.getByRole('region', { name: /introduction/i })).toBeInTheDocument()
  })
})
