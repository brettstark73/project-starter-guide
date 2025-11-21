import { jest } from '@jest/globals'
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import HomeScreen from '../src/screens/HomeScreen'
import type { StackNavigationProp } from '@react-navigation/stack'
import type { RootStackParamList } from '../src/types/navigation'

type MockNavigation = Partial<StackNavigationProp<RootStackParamList, 'Home'>>

describe('HomeScreen', () => {
  it('renders the home screen content', () => {
    const { getByText } = render(<HomeScreen navigation={{ navigate: jest.fn() } as MockNavigation} />)

    expect(getByText('Welcome to Your App')).toBeTruthy()
    expect(getByText('Features Included')).toBeTruthy()
    expect(getByText('✅ TypeScript support')).toBeTruthy()
  })

  it('navigates to Profile screen when button is pressed', () => {
    const navigate = jest.fn()
    const { getByText } = render(<HomeScreen navigation={{ navigate } as MockNavigation} />)

    const profileButton = getByText('Go to Profile')
    fireEvent.press(profileButton)

    expect(navigate).toHaveBeenCalledWith('Profile')
  })

  it('renders all feature items', () => {
    const { getByText } = render(<HomeScreen navigation={{ navigate: jest.fn() } as MockNavigation} />)

    expect(getByText('✅ TypeScript support')).toBeTruthy()
    expect(getByText('✅ React Navigation')).toBeTruthy()
    expect(getByText('✅ Safe Area Context')).toBeTruthy()
    expect(getByText('✅ Expo SDK')).toBeTruthy()
    expect(getByText('✅ ESLint configuration')).toBeTruthy()
    expect(getByText('✅ Jest testing setup')).toBeTruthy()
  })

  it('renders the Learn More button', () => {
    const { getByText } = render(<HomeScreen navigation={{ navigate: jest.fn() } as MockNavigation} />)

    expect(getByText('Learn More')).toBeTruthy()
  })
})
