import axios from 'axios'
// import { connect } from 'http2'

const state = () => {
  return {
    userList: {},
    userListStatus: null,
    selectedUser: null
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
  },
  selectedUser(state) {
    return state.selectedUser
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
  selectUser(context, user) {
    context.commit('setSelectedUser', user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
