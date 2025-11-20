import { jest } from '@jest/globals'
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import HomeScreen from '../src/screens/HomeScreen'

describe('HomeScreen', () => {
  it('renders the home screen content', () => {
    const { getByText } = render(<HomeScreen navigation={{ navigate: jest.fn() } as any} />)

    expect(getByText('Welcome to Your App')).toBeTruthy()
    expect(getByText('Features Included')).toBeTruthy()
    expect(getByText('✅ TypeScript support')).toBeTruthy()
  })

  it('navigates to Profile screen when button is pressed', () => {
    const navigate = jest.fn()
    const { getByText } = render(<HomeScreen navigation={{ navigate } as any} />)

    const profileButton = getByText('Go to Profile')
    fireEvent.press(profileButton)

    expect(navigate).toHaveBeenCalledWith('Profile')
  })

  it('renders all feature items', () => {
    const { getByText } = render(<HomeScreen navigation={{ navigate: jest.fn() } as any} />)

    expect(getByText('✅ TypeScript support')).toBeTruthy()
    expect(getByText('✅ React Navigation')).toBeTruthy()
    expect(getByText('✅ Safe Area Context')).toBeTruthy()
    expect(getByText('✅ Expo SDK')).toBeTruthy()
    expect(getByText('✅ ESLint configuration')).toBeTruthy()
    expect(getByText('✅ Jest testing setup')).toBeTruthy()
  })

  it('renders the Learn More button', () => {
    const { getByText } = render(<HomeScreen navigation={{ navigate: jest.fn() } as any} />)

    expect(getByText('Learn More')).toBeTruthy()
  })
})
