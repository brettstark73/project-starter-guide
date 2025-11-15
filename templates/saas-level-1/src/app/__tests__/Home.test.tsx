import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home page', () => {
  it('renders key sections', () => {
    render(<Home />)

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { name: /everything you need to succeed/i }).length).toBeGreaterThan(0)
    expect(screen.getByRole('region', { name: /pricing/i })).toBeInTheDocument()
    expect(screen.getByText(/© 2024 saas starter/i)).toBeInTheDocument()
  })
})
