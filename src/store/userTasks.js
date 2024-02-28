import axios from 'axios'

const state = () => {
  return {
    userTasks: [],
    userTasksStatus: null
  }
}

const getters = {
  userTasks(state) {
    return state.userTasks
  },
  userTasksLoadingStatus(state) {
    return state.userTasksStatus
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
  setUserTasksStatus(state, status) {
    state.userTasksStatus = status
  }
}

const actions = {
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

  async createUserTask(context, payload) {
    try {
      const response = await axios.post('api/user/tasks', payload)
      context.commit('addUserTask', response.data)
    } catch (err) {
      console.log(err)
      throw 'unable to add task'
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
