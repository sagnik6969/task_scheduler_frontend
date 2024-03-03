import DisplayTask from '@/components/tasks/DisplayTask.vue'
import { render, screen } from '@testing-library/vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { useStore } from 'vuex'
import userEvent from '@testing-library/user-event'
expect.extend(matchers)

vi.mock('vuex')

const dispatchFn = vi.fn().mockResolvedValue({ message: 'success' })

vi.mocked(useStore).mockReturnValue({
  dispatch: dispatchFn
})

let task = null

beforeEach(async () => {
  dispatchFn.mockClear()

  task = {
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
})

const setup = async () => {
  render(DisplayTask, {
    props: {
      task: task
    },
    global: {
      stubs: {
        'v-icon': true,
        'v-progress-linear': true
      }
    }
  })
}

describe('Display task', () => {
  it('displays task title', async () => {
    await setup()
    expect(screen.getByText('Task Title')).toBeInTheDocument()
  })
  it('displays task priority', async () => {
    await setup()
    expect(screen.getByText('Important')).toBeInTheDocument()
  })

  it('has mark as complete checkbox', async () => {
    await setup()
    const checkbox = screen.getByLabelText('Mark as complete')
    expect(checkbox).toHaveAttribute('type', 'checkbox')
  })

  describe('when task is incomplete', () => {
    it('the checkbox is not checked initially', async () => {
      await setup()
      const checkbox = screen.getByLabelText('Mark as complete')
      expect(checkbox).not.toBeChecked()
    })
  })

  describe('when task is complete', () => {
    it('the checkbox is checked initially', async () => {
      task.data.attributes.is_completed = true
      await setup()
      const checkbox = screen.getByLabelText('Mark as complete')
      expect(checkbox).toBeChecked()
    })
  })

  it('has progress input', async () => {
    await setup()
    expect(screen.getByLabelText('Progress: 10%')).toBeInTheDocument()
  })

  it('has appropriate progress value for progress input', async () => {
    await setup()
    const progress = screen.getByLabelText('Progress: 10%')
    expect(progress).toHaveValue('10')
  })

  it('has update due date input', async () => {
    await setup()
    expect(screen.getByPlaceholderText('Update Due Date')).toBeInTheDocument()
  })

  it('has modify priority select input', async () => {
    await setup()
    expect(screen.getByTestId('display-task-select')).toBeInTheDocument()
  })

  it('has delete button', async () => {
    await setup()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })

  //   describe('when user changes progress', () => {
  //     it('calls appropriate function on store', async () => {
  //       const user = userEvent.setup()
  //       await setup()
  //       const progress = screen.getByLabelText('Progress: 10%')

  //       await user.type(progress, '{arrowright}')
  //       expect(dispatchFn).toHaveBeenCalledOnce()
  //       //   expect(progress).toHaveValue(11)
  //     })
  //   })

  describe('when user changes task priority', () => {
    it('calls appropriate function on store', async () => {
      await setup()
      const user = userEvent.setup()
      const prioritySelector = screen.getByTestId('display-task-select')
      await user.selectOptions(prioritySelector, 'Very Important')
      expect(dispatchFn).toHaveBeenCalledOnce()
      expect(dispatchFn).toHaveBeenCalledWith('updateUserTask', {
        task_id: task.data.task_id,
        title: task.data.attributes.title,
        description: task.data.attributes.description,
        deadline: task.data.attributes.deadline,
        is_completed: task.data.attributes.is_completed,
        progress: task.data.attributes.progress,
        priority: 'Very Important'
      })
    })
  })

  describe('when user clicks mark as complete checkbox', () => {
    it('dispatches appropriate function on store', async () => {
      await setup()
      const user = userEvent.setup()
      const checkbox = screen.getByLabelText('Mark as complete')
      await user.click(checkbox)
      expect(dispatchFn).toHaveBeenCalledOnce()
      expect(dispatchFn).toHaveBeenCalledWith('updateUserTask', {
        task_id: task.data.task_id,
        title: task.data.attributes.title,
        description: task.data.attributes.description,
        deadline: task.data.attributes.deadline,
        is_completed: true,
        progress: task.data.attributes.progress,
        priority: task.data.attributes.priority
      })
    })
  })

  describe('when user clicks delete button', () => {
    it('dispatches appropriate function on store', async () => {
      await setup()
      const user = userEvent.setup()

      const deleteButton = screen.getByRole('button', { name: 'Delete' })
      await user.click(deleteButton)
      expect(dispatchFn).toHaveBeenCalledOnce()
      expect(dispatchFn).toHaveBeenCalledWith('deleteTask', task.data.task_id)
    })
  })
})
