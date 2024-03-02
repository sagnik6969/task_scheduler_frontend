import { render, screen } from '@testing-library/vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { describe, expect, it } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

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
})
