import { render, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import AdminDashboard from '@/components/Admin/AdminDashboard.vue'

describe('AdminDashboard Component', () => {
  it.only('renders AdminSectionSelector component', async () => {
    const { getByText } = render(AdminDashboard)
    expect(getByText('Users')).toBeInTheDocument()
    expect(getByText('Analytics')).toBeInTheDocument()
    expect(getByText('Assigned Tasks')).toBeInTheDocument()
  })

  it('renders AdminContent component with Users by default', async () => {
    const { getByText } = render(AdminDashboard)
    expect(getByText('Admin User List')).toBeInTheDocument()
  })

  it('switches to Analytics when Analytics option is clicked', async () => {
    const { getByText } = render(AdminDashboard)
    await userEvent.click(getByText('Analytics'))
    await waitFor(() => {
      expect(getByText('Analytics Component')).toBeInTheDocument()
    })
  })
})
