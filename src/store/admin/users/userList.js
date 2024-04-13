import axios from 'axios'
import assignTask from '../assign/assignTask'
// import { connect } from 'http2'

const state = () => {
  return {
    userList: {},
    userListStatus: null
  }
}

const getters = {
  userList(state) {
    return Object.values(state.userList) //|| []
  },
  user: (state) => (id) => {
    return state.userList[id]
  },
  userListLength(state) {
    return Object.keys(state.userList).length
  },
  userListStatus(state) {
    return state.userListStatus
  }
}

const mutations = {
  setUserList(state, userList) {
    state.userList = userList
  },
  setUserListStatus(state, status) {
    state.userListStatus = status
  },
  setSelectedUser(state, user) {
    state.selectedUser = user
  }
}

const actions = {
  async fetchUserList(context) {
    try {
      context.commit('setUserListStatus', 'loading')
      const response = await axios.get('/api/admin/users')
      context.commit('setUserList', response.data)
      context.commit('setUserListStatus', 'success')
    } catch (error) {
      context.commit('setUserListStatus', 'failed')
      throw 'Unable to fetch user'
    }
  },
  async makeAdmin(context, userId) {
    try {
      context.commit('setUserListStatus', 'loading')
      await axios.patch(`/api/admin/users/${userId}`)
      context.commit('setUserListStatus', 'success')
    } catch (error) {
      context.commit('setUserListStatus', 'failed')
      throw 'Unable to make user admin'
    }
  },
  async assignTask(context, { userId}) {
    try {
      context.commit('setUserListStatus', 'loading')
      await axios.post(`/admin/assign-task/${userId}`)
      context.commit('setUserListStatus', 'success')
    } catch (error) {
      context.commit('setUserListStatus', 'failed')
      throw 'Unable to assign task'
    }
  },
  async deleteUser(context, userId) {
    try {
      context.commit('setUserListStatus', 'loading')
      await axios.delete(`/api/admin/users/${userId}`)
      context.commit('setUserListStatus', 'success')
    } catch (error) {
      context.commit('setUserListStatus', 'failed')
      throw 'Unable to delete user'
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
