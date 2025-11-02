import React from 'react'
import { render } from '@testing-library/react-native'
import App from '../App'

describe('App entry', () => {
  it('renders the home screen title', () => {
    const { getByText } = render(<App />)

    expect(getByText('Welcome to Your App')).toBeTruthy()
  })
})
