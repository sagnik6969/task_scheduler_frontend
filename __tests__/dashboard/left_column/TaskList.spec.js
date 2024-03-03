vi.mock('vuex')
vi.mock('vue-router')

import TaskList from '@/components/dashboard/TaskList/TaskList.vue'
import { render, screen } from '@testing-library/vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import userEvent from '@testing-library/user-event'
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

let clickedLink = null
beforeEach(() => (clickedLink = null))
const routerLink = {
  template: `<div @click="handleCLick">
  <slot>
  </slot>
  </div>`,
  props: ['to'],
  methods: {
    handleCLick() {
      clickedLink = this.to
    }
  }
}

const setup = async () => {
  render(TaskList, {
    global: {
      mocks: {
        $store: store,
        $route: {
          query: {}
        }
        // $router: {
        //   push: routerPushFn
        // }
      },
      stubs: {
        'v-icon': true,
        'router-link': routerLink,
        'v-tooltip': true
      }
    }
  })
}

describe('Task List', () => {
  it('has Tasks heading', async () => {
    await setup()
    expect(screen.getByRole('heading', { name: 'Tasks' })).toBeInTheDocument()
  })

  it('has search tasks input', async () => {
    await setup(), expect(screen.getByPlaceholderText('Search tasks.....')).toBeInTheDocument()
  })

  describe('when task list is empty', () => {
    it('displays appropriate message', async () => {
      store.getters.userTasks = []
      await setup()
      expect(screen.getByText(`looks like you haven't added any task yet!`)).toBeInTheDocument()
    })
  })

  describe('when task list contains a task', () => {
    it('displays the task', async () => {
      await setup()
      expect(screen.getByText('Task Title')).toBeInTheDocument()
    })
  })

  describe('Task List Nav', () => {
    describe.each([
      { name: 'All Tasks', query: '' },
      { name: 'Most Important', query: 'most_important' },
      { name: 'Near Deadline', query: 'near_deadline' },
      { name: 'Least Progress', query: 'least_progress' },
      { name: 'Assigned By admin', query: 'assigned_by_admin' }
    ])('when user clicks $name link', ({ name, query }) => {
      it('it modifies the route query accordingly', async () => {
        await setup()
        const user = userEvent.setup()
        const routerLink = screen.getByText(name)
        expect(routerLink).toBeInTheDocument()
        await user.click(routerLink)
        expect(clickedLink).toStrictEqual({
          query: {
            sort: query
          }
        })
      })
    })
  })
})
