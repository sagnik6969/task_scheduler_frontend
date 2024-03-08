import { render, screen, waitFor } from '@testing-library/vue'
import AdminUserList from '@/components/Admin/users/AdminUserList.vue'
import { describe, expect, it, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)
import axios from 'axios'
import userEvent from '@testing-library/user-event'

vi.mock('axios')

const users = [
  { id: 1, name: 'User 1', created_at: '2024-03-03T10:00:00' },
  { id: 2, name: 'User 2', created_at: '2024-03-03T11:00:00' }
]

vi.mocked(axios.get).mockResolvedValue({
  data: {
    users: users
  }
})

const mockTooltip = {
  template: '<div>,<slot></slot></div>'
}

const setup = async () => {
  return render(AdminUserList, {
    props: {
      users: users
    },
    global: {
      stubs: {
        'v-icon': true,
        'v-tooltip': mockTooltip
      }
    }
  })
}

describe('AdminUserList Component', () => {
  it('renders user list correctly', async () => {
    await setup()

    await waitFor(() => {
      expect(screen.queryByText('User 1')).toBeInTheDocument()
      expect(screen.queryByText('User 2')).toBeInTheDocument()
    })
  })

  it('has search filter', async () => {
    await setup()
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument()
    })
  })

  describe('when user types on search filter', () => {
    it('the ui is updated accordingly', async () => {
      await setup()
      const user = userEvent.setup()
      const searchBox = await screen.findByPlaceholderText('Search users...')
      const user1 = await screen.findByText('User 1')
      const user2 = await screen.findByText('User 2')

      await user.type(searchBox, 'User 1')
      expect(user2).not.toBeInTheDocument()
      expect(user1).toBeInTheDocument()
    })
  })
})
