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
    tryLogIn(context) {
      return new Promise((resolve) => {
        axios
          .get('/api/user')
          .then((res) => {
            context.commit('setUser', res.data)
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            resolve()
          })
      })
    },
    login(context, payload) {
      return new Promise((resolve, reject) => {
        const email = payload.email
        const password = payload.password

        axios.defaults.withCredentials = true
        axios.defaults.withXSRFToken = true

        axios
          .post('/api/login', {
            email: email,
            password: password
          })
          .then((res) => {
            context.commit('setUser', res.data.user)
            resolve('Logged In Successfully')
          })
          .catch((err) => {
            reject(err.response.data.message)
          })
      })
    },
    register(context, payload) {
      return new Promise((resolve, reject) => {
        const name = payload.name
        const email = payload.email
        const password = payload.password

        axios.defaults.withCredentials = true
        axios.defaults.withXSRFToken = true

        axios
          .post('/api/register', {
            name: name,
            email: email,
            password: password
          })
          .then(() => {
            resolve('Registered Successfully')
          })
          .catch((err) => {
            reject(err.response.data.message)
          })
      })
    },

    logout(context) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/logout')
          .then(() => {
            context.commit('setUser', null)
            resolve('Logged Out Successfully')
          })
          .catch((err) => {
            console.log(err)
            reject('Unable to logout')
          })
      })
    }
  }
})

export default store
