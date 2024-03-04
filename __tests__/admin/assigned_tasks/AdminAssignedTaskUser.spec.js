import AdminAssignedTaskUser from '@/components/Admin/assigned_tasks/AdminAssignedTaskUser.vue'
import { describe, expect, it, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/vue'
import axios from 'axios'

expect.extend(matchers)

vi.mock('axios')

const tasks = [
  {
    id: 1,
    title: 'task 1',
    deadline: '12-12-2025 11:11:11',
    user: {
      name: 'sagnik'
    },
    status: 'Accepted'
  }
]

vi.mocked(axios.get).mockResolvedValue({
  data: {
    data: tasks
  }
})

describe('admin assigned task to user in admin page', () => {
  it('displays the list of assigned tasks', async () => {
    render(AdminAssignedTaskUser, {
      global: {
        stubs: {
          'v-icon': true
        }
      }
    })
    await waitFor(() => {
      expect(screen.getByText('task 1')).toBeInTheDocument()
      expect(screen.getByText('sagnik')).toBeInTheDocument()
      expect(screen.getByText('Accepted')).toBeInTheDocument()
    })
  })

  it('displays view task button', async () => {
    render(AdminAssignedTaskUser, {
      global: {
        stubs: {
          'v-icon': true
        }
      }
    })
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'View Task' })).toBeInTheDocument()
    })
  })

  it('view task button is disable when status is pending', async () => {
    tasks[0].status = 'Pending'

    render(AdminAssignedTaskUser, {
      global: {
        stubs: {
          'v-icon': true
        }
      }
    })
    const button = await screen.findByRole('button', { name: 'View Task' })

    expect(button).toBeDisabled()
  })

  it('view task button is disable when status is rejected', async () => {
    tasks[0].status = 'Decline'

    render(AdminAssignedTaskUser, {
      global: {
        stubs: {
          'v-icon': true
        }
      }
    })
    const button = await screen.findByRole('button', { name: 'View Task' })

    expect(button).toBeDisabled()
  })
})
