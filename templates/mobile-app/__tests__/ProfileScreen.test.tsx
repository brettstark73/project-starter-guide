import { jest } from '@jest/globals'
import React from 'react'
import { render } from '@testing-library/react-native'
import ProfileScreen from '../src/screens/ProfileScreen'

describe('ProfileScreen', () => {
  it('shows account settings options', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() } as any} />)

    expect(getByText('Account Settings')).toBeTruthy()
    expect(getByText('Support')).toBeTruthy()
    expect(getByText('Sign Out')).toBeTruthy()
  })
})
