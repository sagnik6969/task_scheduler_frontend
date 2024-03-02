import TaskForm from '@/components/tasks/TaskForm.vue'
import { render, screen, waitFor } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { useStore } from 'vuex'
import userEvent from '@testing-library/user-event'
import { ref } from 'vue'
import { beforeEach } from 'node:test'
expect.extend(matchers)

vi.mock('vuex')

const dispatchFn = vi.fn().mockResolvedValue({ message: 'success' })

beforeEach(async () => {
  dispatchFn.mockClear()
})
vi.mocked(useStore).mockReturnValue({
  dispatch: dispatchFn
})

const datepicker = {
  template: `<input 
  data-testid="datepicker" 
  :value="modelValue"  
  type="text"
  @input="$emit('update:modelValue',$event.target.value)"
  ></input>`,
  props: ['modelValue']
}

const setup = async (admin = false, userId = null) => {
  render(TaskForm, {
    props: {
      admin: admin,
      userId: userId
    },
    global: {
      stubs: {
        'v-icon': true,
        'v-progress-linear': true,
        VueDatePicker: datepicker
      }
    }
  })
}

describe('Task form', () => {
  it('has title input', async () => {
    await setup()
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument()
  })

  it('has required constraint for title input', async () => {
    await setup()
    expect(screen.getByPlaceholderText('Title')).toBeRequired()
  })

  it('has description input', async () => {
    await setup()
    expect(screen.getByPlaceholderText('Add description...')).toBeInTheDocument()
  })

  it('does not have required field for requited constraint for description input', async () => {
    await setup()
    expect(screen.getByPlaceholderText('Add description...')).not.toBeRequired()
  })

  it('has set due date input', async () => {
    await setup()
    expect(screen.getByPlaceholderText('Set Due Date')).toBeInTheDocument()
  })

  it('has required constraint for set due date input', async () => {
    await setup()
    expect(screen.getByPlaceholderText('Set Due Date')).toBeRequired()
  })

  it('has select task priority select input', async () => {
    await setup()
    expect(screen.getByTestId('task-form-select')).toBeInTheDocument()
  })

  it('has required constraint for select task priority', async () => {
    await setup()
    expect(screen.getByTestId('task-form-select')).toBeRequired()
  })

  describe('when user admin prop is not passes', () => {
    it('displays add task button', async () => {
      await setup()
      expect(screen.getByRole('button', { name: 'Add Task' })).toBeInTheDocument()
    })
  })

  describe('when admin prop is passed', () => {
    it('displays Assign Task button', async () => {
      await setup(true)
      expect(screen.getByRole('button', { name: 'Assign Task' })).toBeInTheDocument()
    })
  })

  describe('when user submits the task form', () => {
    it('calls appropriate dispatch function on store', async () => {
      await setup()
      const user = userEvent.setup()
      const title = screen.getByPlaceholderText('Title')
      const description = screen.getByPlaceholderText('Add description...')
      const selectPriority = screen.getByTestId('task-form-select')
      const dueDate = screen.getByPlaceholderText('Set Due Date')
      const addTaskButton = screen.getByRole('button', { name: 'Add Task' })

      await user.type(title, 'task title')
      await user.type(description, 'task description')
      await user.selectOptions(selectPriority, 'Important')
      await user.type(dueDate, '03/28/2029, 06:29')
      await user.click(addTaskButton)
      await waitFor(() => {
        expect(dispatchFn).toHaveBeenCalledOnce()
        expect(dispatchFn).toHaveBeenCalledWith('createUserTask', {
          title: 'task title',
          description: 'task description',
          deadline: '03/28/2029, 06:29',
          priority: 'Important'
        })
      })
    })
  })

  describe('when admin submits task form', () => {
    it('calls appropriate dispatch function on store', async () => {
      dispatchFn.mockClear()
      await setup(true, 12)
      const user = userEvent.setup()
      const title = screen.getByPlaceholderText('Title')
      const description = screen.getByPlaceholderText('Add description...')
      const selectPriority = screen.getByTestId('task-form-select')
      const dueDate = screen.getByPlaceholderText('Set Due Date')
      const addTaskButton = screen.getByRole('button', { name: 'Assign Task' })

      await user.type(title, 'task title')
      await user.type(description, 'task description')
      await user.selectOptions(selectPriority, 'Important')
      await user.type(dueDate, '03/28/2029, 06:29')
      await user.click(addTaskButton)
      await waitFor(() => {
        expect(dispatchFn).toHaveBeenCalledOnce()
        expect(dispatchFn).toHaveBeenCalledWith('createUserTaskByAdmin', {
          userId: 12,
          title: 'task title',
          description: 'task description',
          deadline: '03/28/2029, 06:29',
          priority: 'Important'
        })
      })
    })
  })
})
