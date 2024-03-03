import { render, screen, waitFor } from '@testing-library/vue'
import UserProfile from '@/components/Admin/UserSpecific/UserProfile.vue'
import { describe, expect, it, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)
import axios from 'axios'
import userEvent from '@testing-library/user-event'

const setup = async () => {
  return render(UserProfile, {
    props: {
      userDetails: { id: 1, name: 'User 1', created_at: '2024-03-03T10:00:00', tasks: [] }
    },
    global: {
      stubs: {
        'v-progress-linear': true,
        'v-icon': true
      }
    }
  })
}

describe('User Profile Card in admin dashboard', () => {
  it('displays name of the user', async () => {
    await setup()
    expect(screen.getByText('User 1')).toBeInTheDocument()
  })

  it('displays make admin button', async () => {
    await setup()
    expect(screen.getByRole('button', { name: 'Make Admin' })).toBeInTheDocument()
  })

  it('displays delete user button', async () => {
    await setup()
    expect(screen.getByRole('button', { name: 'Delete User' })).toBeInTheDocument()
  })

  describe('when user clicks make admin button', () => {
    it('emits makeAdmin event', async () => {
      const { emitted } = await setup()
      const user = userEvent.setup()
      const makeAdminButton = screen.getByRole('button', { name: 'Make Admin' })
      await user.click(makeAdminButton)
      expect(emitted('make-admin')).toStrictEqual([
        [
          {
            id: 1,
            name: 'User 1',
            created_at: '2024-03-03T10:00:00',
            tasks: []
          }
        ]
      ])
    })
  })

  describe('when user clicks delete user button', () => {
    it('emits delete-user event', async () => {
      const { emitted } = await setup()
      const user = userEvent.setup()
      const deleteUserButton = screen.getByRole('button', { name: 'Delete User' })

      await user.click(deleteUserButton)

      expect(emitted('delete-user')).toStrictEqual([
        [
          {
            id: 1,
            name: 'User 1',
            created_at: '2024-03-03T10:00:00',
            tasks: []
          }
        ]
      ])
    })
  })
})
