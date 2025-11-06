import { render, screen } from '@testing-library/react'
import { Hero } from '../Hero'

describe('Hero component', () => {
  it('renders primary headline', () => {
    render(<Hero />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /build amazing saas products faster/i,
      })
    ).toBeInTheDocument()
  })

  it('includes call-to-action links', () => {
    render(<Hero />)

    expect(
      screen.getByRole('link', { name: /start building/i })
    ).toHaveAttribute('href', '/signup')
    expect(
      screen.getByRole('button', { name: /watch demo/i })
    ).toBeInTheDocument()
  })
})
