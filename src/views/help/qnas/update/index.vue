<template>
  <div class="card">
    <div class="card-header card-header-flex">
      <div class="d-flex flex-column justify-content-center mr-auto">
        <h5 class="mb-0">공지사항 수정</h5>
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
                수정
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

export default {
  name: 'noticeUpdate',
  components: {
    quillEditor,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      noticeId: -1,
      noticeTitle: '',
      noticeWriter: '',
      noticeContent: '',
      noticeDate: '',
    }
  },
  created() {
    // 특정 공지사항 가져오기 (DB)
    http.get(`/vue/api/notices/${this.$route.params.id}`)
      .then(({ data }) => {
        this.noticeId = data.no
        this.noticeTitle = data.title
        this.noticeWriter = data.uid
        this.noticeContent = data.content
        this.noticeDate = data.regdt
        this.form.setFieldsValue({ noticeTitle: this.noticeTitle })
      })
      .catch((data) => {
        this.$notification.error({
          message: '불러오기 실패',
          description:
            '게시글 정보를 불러오는 도중에 문제가 발생하였습니다.',
        })
        this.moveToListPage()
      })
  },
  methods: {
    moveToListPage() {
      this.$router.push('/help/notices/list')
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) { // 정상적으로 입력이 된 경우
          this.noticeTitle = values.noticeTitle
          this.updateNotice()
        }
      })
    },
    // 공지사항 등록하기
    updateNotice() {
      http.put(`/vue/api/notices/${this.noticeId}`, { no: this.noticeId, uid: this.noticeWriter, title: this.noticeTitle, content: this.noticeContent })
        .then(({ data }) => {
          console.log(data)
          if (data === 'success') {
            this.$notification.success({
              message: '수정 성공!',
              description: '공지사항이 정상적으로 수정되었습니다.',
            })
          } else {
            this.$notification.error({
              message: '수정 실패',
              description: '수정 도중에 문제가 발생하였습니다.',
            })
          }
          this.moveToListPage()
        })
        .catch((data) => {
          console.log(data)
          this.$notification.error({
            message: '수정 실패',
            description: '수정 도중에 문제가 발생하였습니다.',
          })
          this.moveToListPage()
        })
    },
  },
}
</script>

<style scoped>
</style>
