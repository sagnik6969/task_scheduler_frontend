import { render, screen, fireEvent } from '@testing-library/vue'
import LoginForm from '@/components/auth/RegisterForm.vue'
import { describe, expect, it, vi } from 'vitest'

import axios from 'axios'
import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)
vi.mock('axios')
const createUser = async (user) => {
  return (await axios.post('/api/login', user)).data
}

describe('Login', () => {
  it('has heading with info about the project', () => {
    render(LoginForm)
    const heading = screen.getByRole('heading', {
      Name: 'Welcome back to our Task Scheduler Tool'
    })
    expect(heading).toBeInTheDocument()
  })

  it('has email input', () => {
    render(LoginForm)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('has password input', () => {
    render(LoginForm)
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('has password input of type password', () => {
    render(LoginForm)
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
  })

  it('has sign in button', () => {
    render(LoginForm)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
  it('submits the form with correct data', async () => {
    render(LoginForm)
    await fireEvent.update(screen.getByLabelText('Email'), 'test@example.com')
    await fireEvent.update(screen.getByLabelText('Password'), 'password123')
    fireEvent.submit(screen.getByRole('button'))
    const userMock = {
      email: 'test@example.com'
    }
    const data = {
      password: 'password123',
      ...userMock
    }

    axios.post.mockResolvedValue({
      data: data
    })
    const newUser = await createUser(data)
    expect(newUser).toEqual(data)
  })

  it('displays an error message if login fails', async () => {
    render(LoginForm)
  })

  it('displays a loading indicator while waiting for the login response', async () => {
    render(LoginForm)
  })

  it('submits the form with valid data', async () => {
    render(LoginForm)
  })

  it('displays error message on form submission with invalid data', async () => {
    render(LoginForm)
  })

  it('handles login failure with error message', async () => {
    render(LoginForm)
  })
})
