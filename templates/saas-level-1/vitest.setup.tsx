import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('next/link', () => {
  return {
    default: ({ children, href, ...rest }: any) => (
      <a href={href} {...rest}>
        {children}
      </a>
    ),
  }
})

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
  }),
}))
