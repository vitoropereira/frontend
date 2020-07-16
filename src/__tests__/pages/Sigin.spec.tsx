import React from 'react'
import SignIn from '../../pages/SignIn'
import { render, fireEvent } from '@testing-library/react'

const mockedHistoryPush = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      singIn: jest.fn()
    })
  }
})

describe('SignIn Page', () => {
  it('should be able to sign in', () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />)

    const emailField = getByPlaceholderText('E-mail')
    const passwordField = getByPlaceholderText('Senha')
    const buttonElement = getByText('Entrar')

    fireEvent.change(emailField, { target: { value: 'jhndoe@exemplo.com' } })
    fireEvent.change(passwordField, { target: { value: '123456' } })

    fireEvent.click(buttonElement)

    expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard')

  })
})
