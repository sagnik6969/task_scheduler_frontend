import axios from 'axios'

const state = () => {
  return {
    Allusers: [],
    userStatus,
    userTask
  }
}

const getters = {
  getallusers(state) {
    return state.Allusers
  },
  getuserTask(state) {
    return state.userTask
  }
}

const mutations = {
  setallusers(state, Allusers) {
    state.Allusers = Allusers
  },
  setuserAdmin(state, userStatus) {
    state.userStatus = userStatus
  },
  setuserTask(state, userTask) {
    state.userTask = userTask
  },
  deleteUserById(state, id) {
    state.Allusers = state.Allusers.filter((user) => user.id !== id)
  }
}

const actions = {
  async fetchAllUsers({ commit }) {
    try {
      const res = await axios.get('api/admin/tasks')
      commit('setAllUsers', res.data.users)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  },
  async makeAdmin({ commit }, payload) {
    try {
      await axios.patch(`/api/admin/users/${payload.id}`)
      commit('setUserAdmin', `${payload.name} is now an admin`)
    } catch (error) {
      commit('setUserAdmin', `${payload.name} is already an admin`)
      console.error('Error making user admin:', error)
    }
  },
  async deleteUser({ commit }, id) {
    try {
      await axios.delete(`/api/admin/users/${id}`)
      commit('deleteUserById', id)
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  },
  async fetchUserTasks({ commit }, id) {
    try {
      const userResponse = await axios.get(`/api/admin/users/${id}`)
      commit('setUserTask', userResponse.data.user.tasks)
    } catch (error) {
      console.error('Error fetching user tasks:', error)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
