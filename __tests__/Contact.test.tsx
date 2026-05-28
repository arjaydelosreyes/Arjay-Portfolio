import { render, screen } from '@testing-library/react'
import Contact from '@/components/Contact'
import { bio } from '@/lib/data'

describe('Contact', () => {
  it('renders the email CTA with correct mailto href', () => {
    render(<Contact />)
    const link = screen.getByRole('link', { name: new RegExp(bio.email, 'i') })
    expect(link).toHaveAttribute('href', `mailto:${bio.email}`)
  })

  it('renders the GitHub link', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', bio.github)
  })
})
