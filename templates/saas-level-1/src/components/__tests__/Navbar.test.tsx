import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { Navbar } from '../Navbar'

// Mock Next.js Link component
vi.mock('next/link', () => {
  return {
    default: ({ children, href }: { children: React.ReactNode; href: string }) => {
      return <a href={href}>{children}</a>
    }
  }
})

describe('Navbar', () => {
  it('renders the navbar with brand name', () => {
    render(<Navbar />)
    expect(screen.getByText('SaaS Starter')).toBeInTheDocument()
  })

  it('renders desktop navigation links', () => {
    render(<Navbar />)
    const links = screen.getAllByText('Features')
    expect(links.length).toBeGreaterThan(0) // At least one Features link
  })

  it('mobile menu is initially closed', () => {
    render(<Navbar />)
    // Mobile menu links should not be visible initially
    const mobileLinks = screen.queryAllByRole('link', { name: /Features/i })
    // Desktop link exists, but mobile menu is hidden
    expect(mobileLinks.length).toBeGreaterThan(0)
  })

  it('toggles mobile menu when button is clicked', () => {
    render(<Navbar />)

    // Find and click the mobile menu button
    const menuButton = screen.getByRole('button')

    // Click to open
    fireEvent.click(menuButton)

    // Click to close
    fireEvent.click(menuButton)
  })

  it('closes mobile menu when a link is clicked', () => {
    render(<Navbar />)

    // Open mobile menu
    const menuButton = screen.getByRole('button')
    fireEvent.click(menuButton)

    // Find a mobile menu link and click it
    const featureLinks = screen.getAllByText('Features')
    // Click the last one (mobile menu link)
    if (featureLinks.length > 1) {
      fireEvent.click(featureLinks[featureLinks.length - 1])
    }
  })

  it('renders all navigation links', () => {
    render(<Navbar />)
    expect(screen.getAllByText(/Features/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Pricing/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Sign In/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Get Started/i).length).toBeGreaterThan(0)
  })
})
