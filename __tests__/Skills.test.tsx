import { render, screen } from '@testing-library/react'
import Skills from '@/components/Skills'
import { skillCategories } from '@/lib/data'

jest.mock('@thesvg/react', () => {
  const stub = (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="skill-icon" {...props} />
  return new Proxy({}, { get: () => stub })
})

describe('Skills', () => {
  it('renders all skill category headings', () => {
    render(<Skills />)
    skillCategories.forEach(cat => {
      expect(screen.getByText(cat.name)).toBeInTheDocument()
    })
  })

  it('renders icon-backed skills and omits skills without icons', () => {
    render(<Skills />)
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Supabase').length).toBeGreaterThan(0)
    expect(screen.queryByText('YOLOv8')).not.toBeInTheDocument()
  })

  it('renders skill icons via @thesvg/react components', () => {
    render(<Skills />)
    expect(screen.getAllByTestId('skill-icon').length).toBeGreaterThan(0)
  })
})
