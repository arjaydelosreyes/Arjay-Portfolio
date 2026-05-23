import { render, screen } from '@testing-library/react'
import Projects from '@/components/Projects'
import { projects } from '@/lib/data'

describe('Projects', () => {
  it('renders a card for each project', () => {
    render(<Projects />)
    projects.forEach(p => {
      expect(screen.getByText(p.name)).toBeInTheDocument()
    })
  })

  it('renders a live link when liveUrl is present', () => {
    render(<Projects />)
    const liveProject = projects.find(p => p.liveUrl)!
    const links = screen.getAllByRole('link', { name: /live/i })
    expect(links[0]).toHaveAttribute('href', liveProject.liveUrl)
  })
})
