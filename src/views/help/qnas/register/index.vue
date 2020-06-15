<template>
  <div class="card">
    <div class="card-header card-header-flex">
      <div class="d-flex flex-column justify-content-center mr-auto">
        <h5 class="mb-0">새 공지사항 작성</h5>
      </div>
      <div class="d-flex flex-column justify-content-center">
        <a-button icon="left" @click="moveToListPage()">목록으로 돌아가기</a-button>
      </div>
    </div>
    <div class="card-body">
      <a-form :form="form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <div class="row">
              <div class="col-lg-6">
                <a-form-item label="글 제목">
                  <a-input v-decorator="['noticeTitle', { rules: [{ required: true, message: '제목을 입력해주세요' }] }]" placeholder=""/>
                </a-form-item>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="form-group">
              <a-form-item label="글 내용">
                <div class="mb-3" style="height: 430px;">
                  <quill-editor style="height: 350px;" v-model="noticeContent"></quill-editor>
                </div>
              </a-form-item>
            </div>
            <a-form-item>
              <button class="btn btn-success btn-with-addon text-nowrap" type="submit">
                <span class="btn-addon">
                  <i class="btn-addon-icon fe fe-plus-circle"></i>
                </span>
                저장
              </button>
            </a-form-item>
          </div>
        </a-form>
    </div>
  </div>
</template>
<script>
import http from '@/util/http-common.js'
import { quillEditor } from 'vue-quill-editor'
import { mapState } from 'vuex'

export default {
  name: 'noticeRegister',
  components: {
    quillEditor,
  },
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      form: this.$form.createForm(this),
      noticeTitle: '',
      noticeContent: '',
    }
  },
  methods: {
    moveToListPage() {
      // console.log(this.form)
      // this.$router.go(-1)
      this.$router.push('/help/notices/list')
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) { // 정상적으로 입력이 된 경우
          this.noticeTitle = values.noticeTitle
          // console.log(values.noticeTitle)
          // console.log(this.noticeContent)
          // 공지사항 INSERT
          console.log(this.user.name) // 현재 로그인된 사용자 이름
          this.registerNotice()
        }
      })
    },
    // 공지사항 등록하기
    registerNotice() {
      // 카카오로 로그인한 경우 DB에 계정 정보가 없기 때문에 외래키 참조 제약조건에 위반되어 공지사항(notice_board)에 삽입할 수 없음.
      // 일단은 ssafy로 등록함.
      http.post('/vue/api/notices', { uid: 'ssafy', title: this.noticeTitle, content: this.noticeContent })
        .then(({ data }) => {
          if (data === 'success') {
            this.$notification.success({
              message: '등록 성공!',
              description: '공지사항이 정상적으로 등록되었습니다.',
            })
          } else {
            this.$notification.error({
              message: '등록 실패',
              description: '등록 도중에 문제가 발생하였습니다.',
            })
          }
          this.moveToListPage()
        })
        .catch((data) => {
          console.log(data)
          this.$notification.error({
            message: '등록 실패',
            description: '등록 도중에 문제가 발생하였습니다.',
          })
          this.moveToListPage()
        })
    },
  },
}
</script>

<style scoped>
</style>
