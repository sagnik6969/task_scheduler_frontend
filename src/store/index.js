import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state() {
    return {
      user: null
    }
  },

  getters: {
    isLoggedIn(state) {
      return state.user !== null
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },

  actions: {
    async tryLogIn(context) {
      try {
        const res = await axios.get('/api/user')
        context.commit('setUser', res.data)
      } catch (err) {
        console.log(err)
      }
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
        return err.response.data.message
      }
    },
    async register(context, payload) {
      const name = payload.name
      const email = payload.email
      const password = payload.password

      axios.defaults.withCredentials = true
      axios.defaults.withXSRFToken = true
      try {
        const res = await axios.post('/api/register', {
          name: name,
          email: email,
          password: password,
          password_confirmation: password
        })
        context.commit('setUser', res.data.user)
        return 'Registered Successfully'
      } catch (err) {
        console.log(err)
        return err.response.data.message
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
