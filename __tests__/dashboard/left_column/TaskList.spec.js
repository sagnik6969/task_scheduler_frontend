vi.mock('vuex')
vi.mock('vue-router')

import TaskList from '@/components/dashboard/TaskList/TaskList.vue'
import { render, screen } from '@testing-library/vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
expect.extend(matchers)

const tasks = [
  {
    data: {
      task_id: 1,
      attributes: {
        title: 'Task Title',
        description: 'Task Description',
        deadline: '2024-03-01 21:08:52',
        is_completed: false,
        progress: 10,
        priority: 'Important',
        user_id: 1,
        admin_id: null,
        created_at: '2024-03-01 21:08:52',
        updated_at: '2024-03-01 21:08:52'
      }
    }
  }
]

let store = {
  getters: {
    userTasksLoadingStatus: 'success',
    userTasks: tasks
  }
}
vi.mocked(useStore).mockReturnValue(store)
vi.mocked(useRoute).mockReturnValue({
  query: {}
})

beforeEach(() => {
  store = {
    getters: {
      userTasksLoadingStatus: 'success',
      userTasks: tasks
    }
  }
})

const setup = async () => {
  render(TaskList, {
    global: {
      mocks: {
        $store: store,
        $route: {
          query: {}
        }
      },
      stubs: {
        'v-icon': true,
        'router-link': true,
        'v-tooltip': true
      }
    }
  })
}

describe('Task List', () => {
  it('has Tasks heading', async () => {
    await setup()

    expect(screen.getByText('Tasks')).toBeInTheDocument()
  })

  describe('when task list is empty', () => {
    it('displays appropriate message', async () => {
      store.getters.userTasks = []
      await setup()
      expect(screen.getByText(`looks like you haven't added any task yet!`)).toBeInTheDocument()
    })
  })
})
