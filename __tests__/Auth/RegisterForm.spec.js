import { render, screen } from '@testing-library/vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { describe, expect, it, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import userEvent from '@testing-library/user-event'
import { useStore } from 'vuex'
// import userEvent from '@testing-library/user-event'
// import axios from 'axios'
// import { setupServer } from 'msw/node'
expect.extend(matchers)
vi.mock('axios')
vi.mock('vuex')

const mockDispatch = vi.fn().mockResolvedValue('success')

vi.mocked(useStore).mockReturnValue({
  dispatch: mockDispatch
})

const setup = async () => {
  render(RegisterForm, {
    global: {
      stubs: {
        'v-icon': true,
        'router-link': true
      }
    }
  })
}

describe('Register', () => {
  it('has heading with info about the project', async () => {
    await setup()
    const heading = screen.getByRole('heading', {
      Name: 'Join to Our TaskSchedular tool with all time access and free'
    })
    expect(heading).toBeInTheDocument()
  })
  it('has name input', async () => {
    await setup()
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
  })
  it('has email input', async () => {
    await setup()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })
  it('has password input', async () => {
    await setup()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })
  it('password input has type password', async () => {
    await setup()
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
  })
  it('has confirm password input', async () => {
    await setup()
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
  })
  it('confirm password input has type password', async () => {
    await setup()
    expect(screen.getByLabelText('Confirm Password')).toHaveAttribute('type', 'password')
  })

  it('has a sign up button', async () => {
    await setup()
    const button = screen.getByRole('button', { Name: 'Sign Up' })
    expect(button).toBeInTheDocument()
  })

  describe('when user clicks signup with appropriate inputs', () => {
    it('dispatch appropriate action on the store', async () => {
      await setup()
      const user = userEvent.setup()

      const name = screen.getByLabelText('Name')
      const email = screen.getByLabelText('Email')
      const password = screen.getByLabelText('Password')
      const confirmPassword = screen.getByLabelText('Confirm Password')
      const signUpButton = screen.getByRole('button', { Name: 'Sign Up' })

      await user.type(name, 'Sagnik Jana')
      await user.type(email, 'abc@gmail.com')
      await user.type(password, 'password')
      await user.type(confirmPassword, 'password')
      await user.click(signUpButton)

      expect(mockDispatch).toHaveBeenCalledOnce()
      expect(mockDispatch).toHaveBeenCalledWith('register', {
        name: 'Sagnik Jana',
        email: 'abc@gmail.com',
        password: 'password'
      })
    })
  })
})
