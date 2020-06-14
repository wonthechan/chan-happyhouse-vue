<template>
  <a-dropdown class="ml-4" :trigger="['click']" placement="bottomLeft">
    <div :class="$style.dropdown">
      <a-badge>
        <a-avatar shape="square" icon="user" size="large" :class="$style.avatar" />
      </a-badge>
    </div>
    <a-menu slot="overlay">
      <a-menu-item>
        <div>
          <strong>{{ $t('topBar.profileMenu.hello') }}, {{ user.name || 'Anonymous' }}</strong>
        </div>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <a variant="primary" v-b-modal.modal-5>마이 페이지</a>
        <b-modal id="modal-5"
          title="내 정보"
          hide-footer="true"
          centered>
          <div class="mb-5">
            <b-card bg-variant="light">
              <a-form class="mb-4" :form="form">
                <label> 아이디</label>
                <a-form-item>
                  <a-input
                    size="large"
                    readonly="true"
                    :placeholder="id"
                    v-decorator="['id', {rules: [{ required: true, message: 'Please input your full id' }]}]"
                  />
                </a-form-item>
                <label> 이름</label>
                <a-form-item>
                  <a-input
                    size="large"
                    :placeholder="name"
                    v-decorator="['name', {rules: [{ required: true, message: 'Please input your name' }]}]"
                v-model="name"
                  />
                </a-form-item>
                <label> 전화번호</label>
                <a-form-item>
                  <a-input
                    size="large"
                    :placeholder="phone"
                    v-decorator="['phone', {rules: [{ required: true, message: 'Please input your phone number' }]}]"
                  v-model="phone"
                  />
                </a-form-item>
                <label> 주소</label>
                <a-form-item>
                  <a-input
                    size="large"
                  :placeholder="address"
                    v-decorator="['address', {rules: [{ required: true, message: 'Please input your address' }]}]"
                  v-model="address" />
                </a-form-item>
                <label> 비밀번호</label>
                <a-form-item>
                  <a-input
                    size="large"
                    type="password"
                    v-decorator="['password', {rules: [{ required: true, message: 'Please input your password' }]}]"
                  v-model="password" />
                </a-form-item>
              </a-form>
            </b-card>
          </div>
          <b-button variant="success" @click="updateUser">수정하기</b-button>
          <b-button variant="danger" @click="deleteUser">삭제하기</b-button>
        </b-modal>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <a href="javascript: void(0);" @click="logout">
          <i class="fe fe-log-out mr-2"></i>
          로그 아웃
        </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>
<script>
import { mapState } from 'vuex'
import http from '@/util/http-common.js'
import Vue from 'vue'
export default {
  computed: {
    ...mapState(['user']),
    loading() {
      return this.$store.state.user.loading
    },
  },
  data: function () {
    return {
      form: this.$form.createForm(this),
      count: 7,
      id: this.$store.state.user.id,
      name: this.$store.state.user.name,
      address: this.$store.state.user.address,
      phone: this.$store.state.user.phone,
      password: this.$store.state.user.password,
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/LOGOUT')
    },
    updateUser() {
      var values = { id: this.id, password: this.password, address: this.address, name: this.name, phone: this.phone }
      this.$store.dispatch('user/UPDATE', { payload: values })
      this.$bvModal.hide('modal-5')
    },
    deleteUser() {
      http
        .delete('/users/delete', {
          uid: this.id,
          upassword: this.password,
        })
        .then(({ data }) => {
          if (data === 'success') {
            alert('탈퇴 완료')

            this.$bvModal.hide('modal-5')
            this.$store.dispatch('user/LOGOUT')
            Vue.prototype.$notification.success({
              mmessage: '탈퇴 완료',
              description: '탈퇴가 완료되었습니다.',
            })
          } else {
            Vue.prototype.$notification.error({
              mmessage: '잘못된 비밀번호입니다.',
              description: '잘못된 비밀번호입니다.',
            })
          }
        })
    },
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
