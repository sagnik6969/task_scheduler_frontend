import TaskCounter from '@/components/dashboard/right_column/TaskCounter.vue'
import { render, screen } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { useStore } from 'vuex'
expect.extend(matchers)

vi.mock('vuex')

vi.mocked(useStore).mockReturnValue({
  dispatch: () => {}
})

describe('Task Counter', () => {
  it('displays appropriate task count from store', () => {
    render(TaskCounter, {
      global: {
        mocks: {
          $store: {
            getters: {
              getUserCompletedTaskCount: 123,
              getUserIncompleteTaskCount: 345
            }
          }
        }
      }
    })

    expect(screen.getByText(123)).toBeInTheDocument()
    expect(screen.getByText(345)).toBeInTheDocument()
  })
})
