import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import * as firebase from '@/services/firebase'
import * as jwt from '@/services/jwt'
import * as kakao from '@/services/kakao'

const mapAuthProviders = {
  // 밑에 firebase랑 jwt는 나중에 뺄 예정
  // 우리 DB 회원 테이블이랑 연동하는거 추가해야함
  firebase: {
    login: firebase.login,
    register: firebase.register,
    currentAccount: firebase.currentAccount,
    logout: firebase.logout,
  },
  jwt: {
    login: jwt.login,
    register: jwt.register,
    currentAccount: jwt.currentAccount,
    logout: jwt.logout,
  },
  // 카카오 로그인
  kakao: {
    // login: kakao.login,
    // register: kakao.register,
    currentAccount: kakao.currentAccount,
    logout: kakao.logout,
  },
}

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    id: '', // ID 정보
    name: '', // 이름
    role: '', // 역할 (필요 없음)
    email: '', // 이메일
    avatar: '', // 필요없음
    authorized: process.env.VUE_APP_AUTHENTICATED || false, // false is default value
    loading: false,
  },
  mutations: {
    SET_STATE(state, payload) {
      Object.assign(state, {
        ...payload,
      })
    },
  },
  actions: {
    KAKAO_LOGIN({ commit, dispatch, rootState }, { payload }) {
      // 사용자 정보 요청 하고 현재 사용자 정보 갱신
      dispatch('LOAD_CURRENT_ACCOUNT').then(() => {
        Vue.prototype.$notification.success({
          message: `${rootState.user.name}님 반갑습니다.`,
          description: '정상적으로 로그인 처리되었습니다.',
        })
      })
    },

    LOGIN({ commit, dispatch, rootState }, { payload }) {
      const { email, password } = payload
      commit('SET_STATE', {
        loading: true,
      })

      const login = mapAuthProviders[rootState.settings.authProvider].login
      login(email, password).then(success => {
        if (success) {
          dispatch('LOAD_CURRENT_ACCOUNT').then(() => {
            Vue.prototype.$notification.success({
              message: `${rootState.user.name}님 반갑습니다.`,
              description: '정상적으로 로그인 처리되었습니다.',
            })
          })
        }
        if (!success) {
          commit('SET_STATE', {
            loading: false,
          })
        }
      })
    },
    REGISTER({ commit, dispatch, rootState }, { payload }) {
      const { email, password, name } = payload
      commit('SET_STATE', {
        loading: true,
      })

      const register = mapAuthProviders[rootState.settings.authProvider].register
      register(email, password, name).then(success => {
        if (success) {
          dispatch('LOAD_CURRENT_ACCOUNT')
          Vue.prototype.$notification.success({
            message: 'Succesful Registered',
            description: 'You have successfully registered!',
          })
        }
        if (!success) {
          commit('SET_STATE', {
            loading: false,
          })
        }
      })
    },
    LOAD_CURRENT_ACCOUNT({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        commit('SET_STATE', {
          loading: true,
        })
        const currentAccount = mapAuthProviders[rootState.settings.authProvider].currentAccount
        currentAccount().then(response => {
          if (response) {
            const { id, email, name, avatar, role } = response
            commit('SET_STATE', {
              id,
              name,
              email,
              avatar,
              role,
              authorized: true,
            })
          }
          commit('SET_STATE', {
            loading: false,
          })
          resolve()
        })
      })
    },
    LOGOUT({ commit, rootState }) {
      const logout = mapAuthProviders[rootState.settings.authProvider].logout
      logout().then(() => {
        commit('SET_STATE', {
          id: '',
          name: '',
          role: '',
          email: '',
          avatar: '',
          authorized: false,
          loading: false,
        })
        router.push('/auth/login')
      })
    },
  },
  getters: {
    user: state => state,
  },
}
