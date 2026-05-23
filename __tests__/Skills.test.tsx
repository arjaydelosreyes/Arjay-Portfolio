import { render, screen } from '@testing-library/react'
import Skills from '@/components/Skills'
import { skillCategories } from '@/lib/data'

describe('Skills', () => {
  it('renders all skill category headings', () => {
    render(<Skills />)
    skillCategories.forEach(cat => {
      expect(screen.getByText(cat.name)).toBeInTheDocument()
    })
  })

  it('renders skill pills within each category', () => {
    render(<Skills />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('YOLOv8')).toBeInTheDocument()
    expect(screen.getByText('Supabase')).toBeInTheDocument()
  })
})
