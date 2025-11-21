import { jest } from '@jest/globals'
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Alert } from 'react-native'
import ProfileScreen from '../src/screens/ProfileScreen'
import type { StackNavigationProp } from '@react-navigation/stack'
import type { RootStackParamList } from '../src/types/navigation'

type MockNavigation = Partial<StackNavigationProp<RootStackParamList, 'Profile'>>

// Mock Alert
jest.spyOn(Alert, 'alert')

describe('ProfileScreen', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('shows account settings options', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() } as MockNavigation} />)

    expect(getByText('Account Settings')).toBeTruthy()
    expect(getByText('Support')).toBeTruthy()
    expect(getByText('Sign Out')).toBeTruthy()
  })

  it('shows sign out alert when sign out button is pressed', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() } as MockNavigation} />)

    const signOutButton = getByText('Sign Out')
    fireEvent.press(signOutButton)

    expect(Alert.alert).toHaveBeenCalledWith(
      'Sign Out',
      'Are you sure you want to sign out?',
      expect.arrayContaining([
        expect.objectContaining({ text: 'Cancel' }),
        expect.objectContaining({ text: 'Sign Out' })
      ])
    )
  })

  it('executes sign out logic when confirmed', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() } as MockNavigation} />)

    const signOutButton = getByText('Sign Out')
    fireEvent.press(signOutButton)

    // Get the alert callback and execute it
    const alertMock = Alert.alert as jest.MockedFunction<typeof Alert.alert>
    const alertCall = alertMock.mock.calls[0]
    const signOutCallback = alertCall[2]?.[1]?.onPress
    signOutCallback?.()

    expect(consoleSpy).toHaveBeenCalledWith('User signed out')

    consoleSpy.mockRestore()
  })
})
