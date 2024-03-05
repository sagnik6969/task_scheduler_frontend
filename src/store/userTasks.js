import axios from 'axios'

const state = () => {
  return {
    userTasks: [],
    userTasksStatus: null,
    userCompletedTaskCount: 0,
    userIncompleteTaskCount: 0,
    userStatistics: {}
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
  },
  getUserStatistics(state) {
    return state.userStatistics
  }
}

const mutations = {
  setUserTasks(state, userTasks) {
    state.userTasks = userTasks
  },
  addUserTask(state, task) {
    state.userTasks.unshift(task)
  },
  updateTask(state, task) {
    const idx = state.userTasks.findIndex((t) => {
      return t.data.task_id == task.data.task_id
    })
    state.userTasks[idx] = task
  },

  deleteTask(state, taskId) {
    const idx = state.userTasks.findIndex((t) => {
      return t.data.task_id == taskId
    })
    // console.log(t.data.task_id)
    // console.log(state.userTasks[idx])
    // console.log(task)

    state.userTasks.splice(idx, 1)
  },

  setUserTasksStatus(state, status) {
    state.userTasksStatus = status
  },
  setUserCompletedTaskCount(state, count) {
    state.userCompletedTaskCount = count
  },
  setUserIncompleteTaskCount(state, count) {
    state.userIncompleteTaskCount = count
  },

  setUserStatistics(state, statistics) {
    state.userStatistics = statistics
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
      await context.dispatch('fetchUserTaskCount')
      if (context.getters.getUserStatistics.params)
        await context.dispatch('fetchUserStatistics', context.getters.getUserStatistics.params)
    } catch (err) {
      console.log(err)
      throw 'unable to add task'
    }
  },

  async updateUserTask(context, payload) {
    try {
      const response = await axios.put(`/api/user/tasks/${payload.task_id}`, payload)
      context.commit('updateTask', response.data)
      if (context.getters.getUserStatistics.params)
        await context.dispatch('fetchUserStatistics', context.getters.getUserStatistics.params)
      await context.dispatch('fetchUserTaskCount')
    } catch (error) {
      console.log(error)
      throw 'unable to update task'
    }
  },

  async createUserTaskByAdmin(context, payload) {
    try {
      // console.log(payload)
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
      context.commit('deleteTask', taskId)
      if (context.getters.getUserStatistics.params)
        await context.dispatch('fetchUserStatistics', context.getters.getUserStatistics.params)
      await context.dispatch('fetchUserTaskCount')
    } catch (err) {
      console.log(err)
      throw 'unable to delete task'
    }
  },

  async fetchUserStatistics(context, params) {
    try {
      const res = await axios.get(`/api/user/analysis`, {
        params: params
      })
      context.commit('setUserStatistics', {
        params: params,
        data: res.data
      })
    } catch (error) {
      console.log('error')
      throw 'unable to fetch statistics'
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
