import { jest } from '@jest/globals'
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Alert } from 'react-native'
import ProfileScreen from '../src/screens/ProfileScreen'

// Mock Alert
jest.spyOn(Alert, 'alert')

describe('ProfileScreen', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('shows account settings options', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() } as any} />)

    expect(getByText('Account Settings')).toBeTruthy()
    expect(getByText('Support')).toBeTruthy()
    expect(getByText('Sign Out')).toBeTruthy()
  })

  it('shows sign out alert when sign out button is pressed', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() } as any} />)

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
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() } as any} />)

    const signOutButton = getByText('Sign Out')
    fireEvent.press(signOutButton)

    // Get the alert callback and execute it
    const alertCall = (Alert.alert as any).mock.calls[0]
    const signOutCallback = alertCall[2][1].onPress
    signOutCallback()

    expect(consoleSpy).toHaveBeenCalledWith('User signed out')

    consoleSpy.mockRestore()
  })
})
