import axios from 'axios'

const state = () => {
  return {
    userTask: {},
    userTaskStatus: null
  }
}

const getters = {
  getuserTask(state) {
    return state.userTask
  },
  userTaskLength(state) {
    return Object.keys(state.userTask).length
  },
  userTaskStatus(state) {
    return state.userTaskStatus
  }
}

const mutations = {
  setuserTask(state, userTask) {
    state.userTask = userTask
  },
  setuserTaskStatus(state, status) {
    state.userTaskStatus = status
  }
}

const actions = {
  async fetchUserTasks({ commit }, user) {
    try {
      commit('setuserTaskStatus', 'loading')
      const userResponse = await axios.get(`/api/admin/users/${user}`)
      commit('setuserTask', userResponse.data.user.tasks)
      commit('setuserTaskStatus', 'success')
    } catch (error) {
      commit('setuserTaskStatus', 'failed')
      console.error('Error fetching user tasks:', error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
