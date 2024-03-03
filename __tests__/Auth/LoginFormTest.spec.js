import { render, screen } from '@testing-library/vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import { describe, expect, it, vi } from 'vitest'
import { useRoute, useRouter } from 'vue-router'
import * as matchers from '@testing-library/jest-dom/matchers'
import axios from 'axios'
import userEvent from '@testing-library/user-event'
import { useStore } from 'vuex'
expect.extend(matchers)
vi.mock('axios')
vi.mock('vuex')
vi.mock('vue-router')
vi.mocked(axios.get).mockResolvedValue({})
vi.mocked(useRoute).mockReturnValue({
  query: {}
})

const mockDispatch = vi.fn().mockResolvedValue('success')

vi.mocked(useStore).mockReturnValue({
  dispatch: mockDispatch
})
vi.mocked(useRouter).mockReturnValue({
  replace: () => {}
})

const setup = async () => {
  render(LoginForm, {
    global: {
      stubs: {
        'v-icon': true,
        'router-link': true
      }
    }
  })
}

describe('Login', () => {
  it('has heading with info about the project', async () => {
    await setup()
    const heading = screen.getByRole('heading', {
      name: 'Welcome back to our Task Scheduler Tool'
    })
    expect(heading).toBeInTheDocument()
  })

  it('has email input', async () => {
    await setup()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  it('has password input', async () => {
    await setup()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('has password input of type password', async () => {
    await setup()
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
  })

  it('has sign in button', async () => {
    await setup()
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })
  describe('when user submits form with correct data', () => {
    it('dispatches appropriate event in the store', async () => {
      await setup()
      const user = userEvent.setup()
      const email = screen.getByPlaceholderText('Email')
      const password = screen.getByLabelText('Password')
      const signInButton = screen.getByRole('button', { name: 'Sign In' })

      await user.type(email, 'abc@gmail.com')
      await user.type(password, 'password')

      await user.click(signInButton)
      expect(mockDispatch).toHaveBeenCalledWith('login', {
        email: 'abc@gmail.com',
        password: 'password'
      })
    })
  })
})
