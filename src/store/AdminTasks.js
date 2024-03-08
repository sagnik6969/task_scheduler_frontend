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
  }
}

const actions = {
  async usersTasks(context, payload) {
    try {
      const res = await axios.get('api/admin/tasks')
      context.commit('setallusers', res.data.users)
    } catch {}
  },
  async makeAdmin(context, payload) {
    try {
      await axios.patch('/api/admin/users/' + payload.id)
      context.commit('setuserAdmin', payload.name + 'is now a admin')
    } catch {
      context.commit('setuserAdmin', payload.name + 'is already admin')
    }
  },
  async deleteuser(context, payload) {
    try {
      await axios.delete('/api/admin/users/' + payload.id)
    } catch {}
  },
  async singleUser(context, payload) {},
  async signleUserTasks(context, payload) {
    try {
      const userResponse = await axios.get('/api/admin/users/' + this.user)
      context.commit('setuserTask', userResponse.data.user.tasks)
    } catch {}
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
