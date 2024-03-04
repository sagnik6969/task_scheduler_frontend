import UserTaskList from '@/components/Admin/UserSpecific/UserTaskList.vue'
import { render, screen } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
// import { ref } from 'vue'

vi.mock('axios')

const taskList = [
  {
    id: 1,
    title: 'Title 1234',
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
]

//  $table->id();
// $table->string('title');
// $table->text('description')->nullable();
// $table->dateTime('deadline');
// $table->enum('priority', Task::$priorities);
// $table->string('status')->default('Pending');
// $table->unsignedBigInteger('admin_id');
// $table->unsignedBigInteger('user_id');
// $table->unsignedBigInteger('task_id')->nullable();
// $table->foreign('admin_id')->references('id')->on('users');
// $table->foreign('user_id')->references('id')->on('users');
// $table->foreign('task_id')->references('id')->on('tasks');
// $table->timestamps();

expect.extend(matchers)

describe('user task list in admin -> users page', () => {
  it('displays appropriate task details', () => {
    render(UserTaskList, {
      props: {
        alltasks: taskList
      },
      global: {
        stubs: {
          'v-progress-circular': true
        }
      }
    })

    expect(screen.getByText('Title 1234')).toBeInTheDocument()
  })

  it('has delete task button', () => {
    render(UserTaskList, {
      props: {
        alltasks: taskList
      },
      global: {
        stubs: {
          'v-progress-circular': true
        }
      }
    })

    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })

  describe('when user clicks delete button', () => {
    it('sends appropriate delete request to backend', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true)
      vi.mocked(axios.delete).mockResolvedValue({
        data: {
          message: 'success'
        }
      })
      vi.mocked(axios.get).mockResolvedValue({
        data: {
          user: {
            tasks: []
          }
        }
      })
      render(UserTaskList, {
        props: {
          alltasks: taskList
        },
        global: {
          stubs: {
            'v-progress-circular': true
          }
        }
      })

      const user = userEvent.setup()

      const deleteButton = screen.getByRole('button', { name: 'Delete' })

      await user.click(deleteButton)

      expect(axios.delete).toHaveBeenCalledOnce()
    })
  })
})
