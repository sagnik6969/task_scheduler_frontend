import ActionBar from '@/components/dashboard/ActionBar.vue'
import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

describe('Action Bar', () => {
  describe('when user is admin', () => {
    it('displays add task button', () => {
      render(ActionBar, {
        global: {
          stubs: { 'v-icon': true },
          mocks: {
            $store: {
              state: {
                user: {
                  is_admin: true
                }
              }
            }
          }
        }
      })
      expect(screen.getByText('Add Task')).toBeInTheDocument()
    })

    it('displays Admin Dashboard button', () => {
      render(ActionBar, {
        global: {
          stubs: { 'v-icon': true },
          mocks: {
            $store: {
              state: {
                user: {
                  is_admin: true
                }
              }
            }
          }
        }
      })
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
    })
  })

  describe('when user is not admin', () => {
    it('displays add task button', () => {
      render(ActionBar, {
        global: {
          stubs: { 'v-icon': true },
          mocks: {
            $store: {
              state: {
                user: {
                  is_admin: false
                }
              }
            }
          }
        }
      })
      expect(screen.getByText('Add Task')).toBeInTheDocument()
    })

    it('does not displays Admin Dashboard button', () => {
      render(ActionBar, {
        global: {
          stubs: { 'v-icon': true },
          mocks: {
            $store: {
              state: {
                user: {
                  is_admin: false
                }
              }
            }
          }
        }
      })
      expect(screen.queryByText('Admin Dashboard')).not.toBeInTheDocument()
    })
  })
})
