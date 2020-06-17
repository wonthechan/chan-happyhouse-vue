/* eslint-disable handle-callback-err */
import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import http from '@/util/http-common.js'

import * as firebase from '@/services/firebase'
import * as jwt from '@/services/jwt'
import * as kakao from '@/services/kakao'

const mapAuthProviders = {
  // 밑에 firebase랑 jwt는 나중에 뺄 예정
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
    address: '',
    phone: '',
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

    // 로그인 성공 후 db 저장된 사용자 정보로 갱신
    LOGIN_v2({ commit, dispatch, rootState }, { payload }) {
      const { id, email, name, avatar, address, phone, role } = { id: payload.uid, email: payload.uid.concat('@happyhouse.com'), address: payload.uaddress, phone: payload.uphone, name: payload.uname, role: 'normal_user' }
      commit('SET_STATE', {
        id,
        name,
        email,
        avatar,
        address,
        phone,
        role,
        authorized: true,
      })
      Vue.prototype.$notification.success({
        message: `${rootState.user.name}님 반갑습니다.`,
        description: '정상적으로 로그인 처리되었습니다.',
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
      http
        .post('/users/join', {
          uid: payload.id,
          upassword: payload.password,
          uphone: payload.phone.replace(/-/gi, ''),
          uaddress: payload.address,
          uname: payload.name,
        })
        .then(({ data }) => {
          console.log(data)
          if (data === 'success') {
            Vue.prototype.$notification.success({
              message: 'Succesful Registered',
              description: 'You have successfully registered!',
            })
          } else {
            Vue.prototype.$notification.error({
              message: 'Register Failure',
              description: '같은 id 의 사용자가 존재합니다.',
            })
          }
        })
        .catch((error) => {
          Vue.prototype.$notification.error({
            message: 'Register Failure',
            description: '등록 중 문제가 발생하였습니다.',
          })
        })
      router.push('/auth/login')
    },
    UPDATE({ commit, dispatch, rootState }, { payload }) {
      const { id, email, name, avatar, address, phone, role } = { id: payload.id, email: payload.id.concat('@happyhouse.com'), address: payload.address, phone: payload.phone, name: payload.name, role: 'normal_user' }
      commit('SET_STATE', {
        id,
        name,
        email,
        avatar,
        address,
        phone,
        role,
        authorized: true,
      })
      Vue.prototype.$notification.success({
        mmessage: '수정 완료',
        description: '정보 수정이 완료되었습니다.',
      })
    },
    // 현재 사용자의 계정 정보 불러와서 store의 state에 저장
    LOAD_CURRENT_ACCOUNT({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        commit('SET_STATE', {
          loading: true, // 현재 사용자의 계정 정보를 불러오는 동안 로딩화면이 지속
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
          address: '',
          phone: '',
        })
        router.push('/auth/login')
      })
    },
  },
  getters: {
    user: state => state,
  },
}
