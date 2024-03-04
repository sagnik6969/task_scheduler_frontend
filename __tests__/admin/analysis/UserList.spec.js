import UserList from '@/components/Admin/Analytics/UserList.vue'
import { render, screen } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)
import userEvent from '@testing-library/user-event'
import axios from 'axios'

const tooltip = {
  template: `<div><slot></slot></div>`
}

const users = [
  {
    id: 1,
    name: 'sagnik',
    updated_at: '2024-11-11 11:11:11',
    incomplete_tasks: 12,
    completed_tasks: 123
  }
]

describe('user list in admin -> analysis', () => {
  it('displays name of user along with completed and incomplete tasks', () => {
    render(UserList, {
      props: {
        users: users
      },
      global: {
        stubs: {
          'v-icon': true,
          'v-tooltip': tooltip
        }
      }
    })

    expect(screen.getByText('sagnik')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
  })
})
