import axios from 'axios'

const state = () => ({
  tasks: []
})

const getters = {
  selectedUser: (state) => state.selectedUser
}

const mutations = {
  setSelectedUser(state, user) {
    state.selectedUser = user
  }
}

const actions = {
  async fetchAssignTask({ commit }) {
    try {
    } catch (error) {}
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
