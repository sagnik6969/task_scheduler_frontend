import { render, screen } from '@testing-library/vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { describe, expect, it, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
// import userEvent from '@testing-library/user-event'
// import axios from 'axios'
// import { setupServer } from 'msw/node'
expect.extend(matchers)
vi.mock('axios')

// const mockFetch = vi.fn()
// global.fetch = mockFetch

describe('Register', () => {
  it('has heading with info about the project', () => {
    render(RegisterForm)
    const heading = screen.getByRole('heading', {
      Name: 'Join to Our TaskSchedular tool with all time access and free'
    })
    expect(heading).toBeInTheDocument()
  })
  it('has name input', () => {
    render(RegisterForm)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
  })
  it('has email input', () => {
    render(RegisterForm)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })
  it('has password input', () => {
    render(RegisterForm)
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })
  it('password input has type password', () => {
    render(RegisterForm)
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
  })
  it('has confirm password input', () => {
    render(RegisterForm)
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
  })
  it('confirm password input has type password', () => {
    render(RegisterForm)
    expect(screen.getByLabelText('Confirm Password')).toHaveAttribute('type', 'password')
  })

  it('has a sign up button', () => {
    render(RegisterForm)
    const button = screen.getByRole('button', { Name: 'Sign Up' })
    expect(button).toBeInTheDocument()
  })

  // Sagnik ek baar dekh lena isko
  //   describe('when user submits form', () => {
  //     it('sends username, email, password and confirm password to backed', async () => {
  //       const server = setupServer(
  //         http.post('/api/register', async ({ request }) => {
  //           await Response.json()
  //           return HttpResponse.json({})
  //         })
  //       )
  //       const user = userEvent.setup()
  //       render(RegisterForm)
  //       const nameInput = screen.getByLabelText('Name')
  //       const emailInput = screen.getByLabelText('Email')
  //       const passwordInput = screen.getByLabelText('Password')
  //       const confirmPasswordInput = screen.getByLabelText('Confirm Password')

  //       await user.type(nameInput, 'sameer')
  //       await user.type(emailInput, 'sameer@gmail.com')
  //       await user.type(passwordInput, 'p4ssword')
  //       await user.type(confirmPasswordInput, 'p4ssword')

  //       const button = screen.getByRole('button', { Name: 'Sign Up' })

  //       await user.click(button)
  //       expect(mockFetch).toHaveBeenCalledWith('api/register', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           name: 'sameer',
  //           email: 'sameer@gmail.com',
  //           password: 'p4ssword',
  //           password_confirm: 'p4ssword'
  //         })
  //       })
  //       //   expect(axios.post).toHaveBeenCalledWith('/api/register', {
  //       //     name: 'sameer',
  //       //     email: 'sameer@gmail.com',
  //       //     password: 'p4ssword',
  //       //     password_confirm: 'p4ssword'
  //       //   })
  //   })
  // })
})
