import { createStore } from 'vuex'
import axios from 'axios'
import userTasks from './userTasks'
import userList from './admin/users/userList'
import analysis from './admin/analysis/analysis'

const store = createStore({
  modules: {
    userTasks,
    adminUserList: userList,
    analysis: analysis
  },
  state() {
    return {
      user: null,
      admin: null
    }
  },

  getters: {
    isLoggedIn(state) {
      return state.user !== null
    },
    isAdmin(state) {
      return state.admin
    },
    userName(state) {
      return state.user.name
    },
    User(state) {
      return state.user
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    adminStatus(state, res) {
      state.admin = res
    }
  },

  actions: {
    tryLogIn(context) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/user')
          .then((res) => {
            context.commit('setUser', res.data)
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    async login(context, payload) {
      const email = payload.email
      const password = payload.password

      axios.defaults.withCredentials = true
      axios.defaults.withXSRFToken = true
      try {
        const res = await axios.post('/api/login', {
          email: email,
          password: password
        })
        context.commit('setUser', res.data.user)
        return 'Logged In Successfully'
      } catch (err) {
        console.log(err)
        throw err.response.data.message
      }
    },
    async register(context, payload) {
      const name = payload.name
      const email = payload.email
      const password = payload.password
      const password_confirmation = payload.password_confirmation
      // console.log(password, password_confirmation)

      axios.defaults.withCredentials = true
      axios.defaults.withXSRFToken = true
      try {
        const res = await axios.post('/api/register', {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation
        })

        context.commit('setUser', res.data.user)
        return 'Registered Successfully'
      } catch (err) {
        console.log(err)
        throw err.response.data.message
      }
    },

    async logout(context) {
      try {
        await axios.post('/api/logout')
        context.commit('setUser', null)
        return 'Logged Out Successfully'
      } catch (err) {
        console.log(err)
        return 'Unable to logout'
      }
    }
  }
})

export default store
