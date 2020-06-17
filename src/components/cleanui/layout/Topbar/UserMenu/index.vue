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
          hide-footer=true
          hide-header=true
          centered>

       <div style="padding: 40px 40px 20px 40px; background: #fff;">
                <table style="border-collapse: collapse; border: 0; width: 100%;">
                  <tbody>
                    <tr>
                      <td>
                        <h2
                          style="margin-bottom: 20px; color: #24222f; font-weight: 600"
                        ><img height="100" src="@/img/img_avatar2.png" /></h2>
                        <p>
                        </p>
                        <br />
                        <h5
                          style="font-size:27px;margin-bottom: 20px; color: #24222f; font-weight: 600"
                        >마이 페이지</h5>
                        <table style="border-collapse: collapse; border: 0; width: 100%;">
                         <tr>
                            <td
                              style="text-align: left; padding: 30px 10px 10px 0px; border-top: 1px solid #d9d7e0;"
                            ><label style="text-align:left;font-size:20px;">아이디</label></td>
                              <td
                              style="width: 10%; text-align: center; padding: 10px 10px; border-top: 1px solid #d9d7e0;"
                            ></td>
                            <td
                              style="width: 50%; text-align: right; padding: 30px 0px 10px 40px; white-space: nowrap; border-top: 1px solid #d9d7e0;"
                            ><a-input size="30" style="font-size:20px;" v-model="user.id" readonly/></td>
                          </tr>
                         <tr>
                            <td
                              style="text-align: left; padding: 30px 10px 10px 0px; border-top: 1px solid #d9d7e0;"
                            ><label style="text-align:left;font-size:20px;">이름</label></td>
                              <td
                              style="width: 10%; text-align: center; padding: 10px 10px; border-top: 1px solid #d9d7e0;"
                            ></td>
                            <td
                              style="width: 50%; text-align: right; padding: 30px 0px 10px 40px; white-space: nowrap; border-top: 1px solid #d9d7e0;"
                            ><a-input size="30" style="font-size:20px;" v-model="user.name" /></td>
                          </tr>
                        <tr>
                            <td
                              style="text-align: left; padding: 30px 10px 10px 0px; border-top: 1px solid #d9d7e0;"
                            ><label style="text-align:left;font-size:20px;">주소</label></td>
                              <td
                              style="width: 10%; text-align: center; padding: 10px 10px; border-top: 1px solid #d9d7e0;"
                            ></td>
                            <td
                              style="width: 50%; text-align: right; padding: 30px 0px 10px 40px; white-space: nowrap; border-top: 1px solid #d9d7e0;"
                            ><a-input size="30" style="font-size:20px;" v-model="user.address" /></td>
                          </tr>
                          <tr>
                            <td
                              style="text-align: left; padding: 30px 10px 10px 0px; border-top: 1px solid #d9d7e0;"
                            ><label style="text-align:left;font-size:20px;">핸드폰 번호</label></td>
                              <td
                              style="width: 10%; text-align: center; padding: 10px 10px; border-top: 1px solid #d9d7e0;"
                            ></td>
                            <td
                              style="width: 50%; text-align: right; padding: 30px 0px 10px 40px; white-space: nowrap; border-top: 1px solid #d9d7e0;"
                            ><a-input size="30" style="font-size:20px;" v-model="user.phone" /></td>
                          </tr>
                          <tr>
                            <td
                              style="text-align: left; padding: 30px 10px 10px 0px; border-top: 1px solid #d9d7e0;"
                            ><label style="text-align:left;font-size:20px;">비밀번호</label></td>
                              <td
                              style="width: 10%; text-align: center; padding: 10px 10px; border-top: 1px solid #d9d7e0;"
                            ></td>
                            <td
                              style="width: 60%; text-align: right; padding: 30px 0px 10px 40px; white-space: nowrap; border-top: 1px solid #d9d7e0;"
                            ><a-input size="30" type="password" style="font-size:20px;" v-model="password"/></td>
                          </tr>
                          <tr>
                            <td
                              style="text-align: left; padding: 10px 10px 10px 0px; border-top: 1px solid #d9d7e0;"
                            >
                            </td>
                            <td
                              style="text-align: left; padding: 10px 10px 10px 0px; border-top: 1px solid #d9d7e0;"
                            ></td>
                            <td
                              style="text-align: left; padding: 10px 10px 10px 0px; border-top: 1px solid #d9d7e0;"
                            >
                            </td>
                          </tr>
                        </table>

                        <br />
                        <br />
                        <h5
                          style="margin-bottom: 20px; color: #24222f; font-weight: 600"
                        ></h5>
                        <table style="border-collapse: collapse; border: 0; width: 100%;">

                           <a-tooltip placement="topLeft">
                              <template slot="title" v-if="password===''">비밀번호를 입력해주세요</template>
                               <a-button @click="updateUser();" type="primary">회원정보 수정</a-button>
                            </a-tooltip>
                           <a-tooltip placement="topLeft">
                             <template slot="title" v-if="password===''">비밀번호를 입력해주세요</template>
                              <a-button @click="deleteUser();" type="danger">회원정보 삭제</a-button>
                            </a-tooltip>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
      password: '',
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/LOGOUT')
    },
    updateUser() {
      var values = { id: this.user.id, password: this.password, address: this.user.address, name: this.user.name, phone: this.user.phone }
      http
        .put('/users/update', {
          uid: this.user.id,
          upassword: this.password,
          uname: this.user.name,
          uphone: this.user.phone,
          uaddress: this.user.address,
        })
        .then(({ data }) => {
          if (data === 'success') {
            this.$store.dispatch('user/UPDATE', { payload: values })
          } else {
            Vue.prototype.$notification.error({
              mmessage: '잘못된 비밀번호입니다.',
              description: '잘못된 비밀번호입니다.',
            })
          }
        })
      this.password = ''
      this.$bvModal.hide('modal-5')
    },
    deleteUser() {
      http
        .delete(`/users/delete/${this.user.id}/${this.password}`)
        .then(({ data }) => {
          if (data === 'success') {
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
            this.password = ''
            this.$bvModal.hide('modal-5')
          }
        })
    },
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
