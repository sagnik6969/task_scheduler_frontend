import axios from 'axios'
// import { connect } from 'http2'

const state = () => {
  return {
    userList: [],
    userListStatus: null
  }
}

const getters = {
  userList(state) {
    return state.userList
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
