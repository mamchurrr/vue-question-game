import axios from 'axios'
import router from '@/router'

export default {
  setLogoutTimer({ dispatch }, expirationTime) {
    setTimeout(() => {
      dispatch('logout')
    }, expirationTime * 1000)
  },

  signUp({ commit, dispatch }, authData) {
    axios
      .post(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAoleWonTVLCd7y8kIk5fnWbP6tM2HuLG4',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )
      .then(res => {
        // console.log(res)
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId
        })
        const now = new Date()
        const expirationDate = new Date(
          now.getTime() + res.data.expiresIn * 1000
        )
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userId', res.data.localId)
        dispatch('storeUser', authData)
        router.push('/')
        dispatch('setLogoutTimer', res.data.expiresIn)
      })
    // .catch(error => console.dir(error))
  },

  login({ commit, dispatch }, authData) {
    axios
      .post(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAoleWonTVLCd7y8kIk5fnWbP6tM2HuLG4',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )
      .then(res => {
        // console.log(res)
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId
        })
        const now = new Date()
        const expirationDate = new Date(
          now.getTime() + res.data.expiresIn * 1000
        )
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userId', res.data.localId)
        router.push('/')
        dispatch('setLogoutTimer', res.data.expiresIn)
      })
    // .catch(error => console.dir(error))
  },

  tryAutoLogin({ commit, dispatch }) {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
    const expirationDate = localStorage.getItem('expirationDate')
    const now = new Date()
    console.log(now)

    if (now >= expirationDate) {
      return
    }
    const userId = localStorage.getItem('userId')
    if (!userId) {
      return
    }
    commit('authUser', {
      token: token,
      userId: userId
    })
   dispatch('fetchUser')
  },

  logout({ commit }) {
    commit('clearAuthData')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    router.push('/signin')
  },

  storeUser({ commit, state }, userData) {
    const userId = state.userId
    if (!state.idToken) {
      return
    }
    axios.post(
      'https://vue-question-game.firebaseio.com/users/'+ userId + '.json' + '?auth=' + state.idToken,
      userData
    )
    // .then(res => console.dir(res))
    // .catch(error => console.dir(error))
  },

  fetchUser({ commit, state }) {
    const userId = state.userId
    if (!state.idToken) {
      return
    }
    axios
      .get(
        'https://vue-question-game.firebaseio.com/users/'+ userId + '.json' + '?auth=' + state.idToken
        // 'https://bi-nuxt.firebaseio.com/rest/saving-data/users.json?auth=' + state.idToken
      )
      .then(res => {
        const data = res.data
        for(let key in data){
          const user = []
          console.log(data[key])
          console.log(key)
        }
        
        
        console.log(userId)
        
        commit('storeUser', data)
      })
    .catch(error => console.log(error))
  }
}
