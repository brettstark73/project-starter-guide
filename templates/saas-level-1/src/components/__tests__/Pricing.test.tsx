import { render, screen } from '@testing-library/react'
import { Pricing } from '../Pricing'

describe('Pricing component', () => {
  it('highlights the most popular plan', () => {
    render(<Pricing />)

    expect(screen.getByText(/Most Popular/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Pro/i })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Contact Sales/i })
    ).toHaveAttribute('href', '/signup')
  })
})
