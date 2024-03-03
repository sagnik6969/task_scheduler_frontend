import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import AdminUserList from '@/components/Admin/AdminUserList.vue'
const VIconStub = {
  template: '<div data-testid="v-icon-stub"></div>'
}
describe('AdminUserList Component', () => {
  it('renders user list correctly', async () => {
    const users = [
      { id: 1, name: 'User 1', created_at: '2024-03-03T10:00:00' },
      { id: 2, name: 'User 2', created_at: '2024-03-03T11:00:00' }
    ]

    const { emitted } = render(AdminUserList, {
      props: {
        users: users
      },
      global: {
        stubs: {
          'v-icon': VIconStub
        }
      }
    })
    await waitFor(() => {
      expect(screen.queryByText('User 1')).toBeInTheDocument()
      expect(screen.queryByText('User 2')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Delete User'))

    expect(emitted().deleteUser).toBeTruthy()
    expect(emitted().deleteUser[0]).toEqual([users[0]])
  })
})
