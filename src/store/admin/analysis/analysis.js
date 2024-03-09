import axios from 'axios'

const state = () => ({
  selectedUser: null,
  barchartStatistics: {
    data: null,
    loading: false,
    initialLoadingComplete: false
  },
  userStatistics: {}
})

const getters = {
  selectedUser: (state) => state.selectedUser,
  getbarchartStatistics: (state) => state.barchartStatistics,
  getUserStatistics(state) {
    return state.userStatistics
  }
}

const mutations = {
  setSelectedUser(state, user) {
    state.selectedUser = user
  },
  setbarchartStatistics(state, statistics) {
    state.barchartStatistics.data = statistics
  },
  setBarchartLoading(state, loading) {
    state.barchartStatistics.loading = loading
  },
  setInitialLoadingComplete(state, complete) {
    state.barchartStatistics.initialLoadingComplete = complete
  },
  setUserStatistics(state, statistics) {
    state.userStatistics = statistics
  },
  setLoading(state, loading) {
    state.loading = loading
  }
}

const actions = {
  async selectUser({ commit }, user) {
    commit('setSelectedUser', user)
  },
  async fetchbarchartStatistics({ commit }) {
    try {
      commit('setBarchartLoading', true)
      const res = await axios.get(`/api/admin/analysis/all_user_task_progress_analysis`)
      commit('setbarchartStatistics', res.data)
      commit('setBarchartLoading', false)
      commit('setInitialLoadingComplete', true)
    } catch (error) {
      console.log('error', error)
      commit('setBarchartLoading', false)
      throw 'Unable to fetch statistics'
    }
  },
  async fetchUserStatistics({ commit }, { userId, timeRange, statistics }) {
    commit('setLoading', true)
    try {
      const res = await axios.get(`/api/user/analysis?admin=true&user_id=${userId}`, {
        params: {
          time_range: timeRange,
          statistics: statistics
        }
      })
      commit('setUserStatistics', res.data)
    } catch (error) {
      throw new Error('Unable to fetch user statistics')
    } finally {
      commit('setLoading', false)
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
