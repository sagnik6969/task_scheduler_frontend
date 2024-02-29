import axios from 'axios'

const state = () => {
  return {
    userTasks: [],
    userTasksStatus: null,
    userCompletedTaskCount: 0,
    userIncompleteTaskCount: 0
  }
}

const getters = {
  userTasks(state) {
    return state.userTasks
  },
  userTasksLoadingStatus(state) {
    return state.userTasksStatus
  },
  getUserCompletedTaskCount(state) {
    return state.userCompletedTaskCount
  },
  getUserIncompleteTaskCount(state) {
    return state.userIncompleteTaskCount
  }
}

const mutations = {
  setUserTasks(state, userTasks) {
    state.userTasks = userTasks
  },
  setTaskDeleted(state) {
    state.userTasksStatus = 'taskDeleted'
  },
  addUserTask(state, task) {
    state.userTasks.unshift(task)
  },
  updateTask(state, task) {
    const idx = state.userTasks.findIndex((t) => {
      return t.data.task_id == task.data.task_id
    })
    // console.log(t.data.task_id)
    console.log(state.userTasks[idx])
    console.log(task)

    state.userTasks[idx] = task
  },
  setUserTasksStatus(state, status) {
    state.userTasksStatus = status
  },
  setUserCompletedTaskCount(state, count) {
    state.userCompletedTaskCount = count
  },
  setUserIncompleteTaskCount(state, count) {
    state.userIncompleteTaskCount = count
  }
}

const actions = {
  fetchDashboardData(context) {
    context.dispatch('fetchUserTasks')
    context.dispatch('fetchUserTaskCount')
  },

  async fetchUserTasks(context) {
    try {
      context.commit('setUserTasksStatus', 'loading')
      const res = await axios.get('/api/user/tasks')
      context.commit('setUserTasks', res.data.data)
      context.commit('setUserTasksStatus', 'success')
    } catch {
      context.commit('setUserTasksStatus', 'failed')
    }
  },

  async fetchUserTaskCount(context) {
    try {
      const res = await axios.get('/api/user/analysis', {
        params: {
          time_range: 'all',
          statistics: 'completed_vs_pending_tasks'
        }
      })
      context.commit('setUserCompletedTaskCount', res.data.series[0])
      context.commit('setUserIncompleteTaskCount', res.data.series[1])
    } catch {
      throw 'unable to fetch user task count'
    }
  },
  async createUserTask(context, payload) {
    try {
      const response = await axios.post('api/user/tasks', payload)
      context.commit('addUserTask', response.data)
      context.dispatch('fetchUserTaskCount')
    } catch (err) {
      console.log(err)
      throw 'unable to add task'
    }
  },

  async updateUserTask(context, payload) {
    try {
      const response = await axios.put(`/api/user/tasks/${payload.task_id}`, payload)
      context.commit('updateTask', response.data)
      context.dispatch('fetchUserTaskCount')
    } catch (error) {
      console.log(error)
      throw 'unable to update task'
    }
  },

  async createUserTaskByAdmin(context, payload) {
    try {
      console.log(payload)
      const { userId, ...taskData } = payload
      await axios.post('api/admin/assign-task/' + userId, taskData)
      // context.commit('addUserTask', response.data)
    } catch (err) {
      console.log(err)
      throw 'unable to add task'
    }
  },
  async deleteTask(context, taskId) {
    try {
      await axios.delete('api/user/tasks/' + taskId)
      context.dispatch('fetchUserTasks')
      context.commit('setTaskDeleted', true)
    } catch (err) {
      console.log(err)
      throw 'unable to delete task'
    }
  },
  async updateTask(context, payload) {
    try {
      await axios.put('api/user/tasks/' + payload.task_id, {
        title: payload.title,
        description: payload.description,
        deadline: payload.deadline,
        is_completed: payload.is_completed,
        progress: payload.progress,
        priority: payload.priority
      })
      context.dispatch('fetchUserTasks')
    } catch (err) {
      console.log(err)
      throw 'unable to update task'
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
