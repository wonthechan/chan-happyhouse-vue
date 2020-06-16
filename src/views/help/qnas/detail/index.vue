<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <span class="font-size-30 font-weight-bold">{{ qnaTitle }}</span>
        </div>
        <hr />
        <div class="mb-5">
          <span class="mr-3">
            <a-icon class="mr-1" type="clock-circle" theme="filled" />
            {{ qnaDate }}
          </span>
          <span class="mr-3">|</span>
          <span class="font-weight-bold">
            <a-icon class="mr-1" type="user" />
            {{ qnaWriter }}
          </span>
        </div>
        <div v-html="qnaContent"></div>
      </div>
    </div>
    <div class="mb-4">
      <a-button class="mr-3" icon="left" @click="moveToListPage()">목록으로 돌아가기</a-button>
      <!-- 작성자인 경우에만 수정/삭제 버튼 활성화 -->
      <tempalte v-if="$store.state.user.id === qnaWriter">
        <a-button class="mr-3" icon="edit" @click="moveToUpdatePage()">수정하기</a-button>
        <a-button type="danger" icon="delete" @click="showDeleteConfirm()">삭제하기</a-button>
      </tempalte>
    </div>
    <!-- 코멘트 리스트 커스텀 컴포넌트 삽입 (게시글 id 값을 props으로 넘겨준다) -->
    <comment-list @update-comment-event="updateComments()" :boardNo="$route.params.id" :key="componentKey"/>
    <!----------------------------------------------------------------------->
    <!-- 코멘트 등록 파트 시작 (카카오 유저인 경우 코멘트 달 수 없음)-->
    <template v-if="!isKakaoUser">
      <div class="card">
        <div class="card-body">
          <h5 class="text-dark mb-4">댓글 남기기</h5>
          <a-form :form="form" @submit.prevent="handleSubmit">
            <a-form-item>
              <a-input :placeholder="$store.state.user.id" :disabled="true">
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25);" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-textarea :rows="3" placeholder="내용"
                v-decorator="['commentContent', {rules: [{ required: true, message: '내용을 입력하세요!' }]}]"></a-textarea>
            </a-form-item>
            <a-form-item>
              <button class="btn btn-success btn-with-addon text-nowrap" type="submit">
                  <span class="btn-addon">
                    <i class="btn-addon-icon fe fe-plus-circle"></i>
                  </span>
                  등록
              </button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </template>
    <template v-else>
      카카오 유저인 경우 댓글 기능을 이용할 수 없습니다.
    </template>

    <!-- 코멘트 등록 파트 끝 -->
  </div>
</template>
<script>
import http from '@/util/http-common.js'
import CommentList from '../components/CommentList'

export default {
  name: 'qnaDetail',
  components: {
    CommentList,
  },
  computed: {
    isKakaoUser() {
      return this.$store.state.settings.authProvider === 'kakao'
    },
  },
  data() {
    return {
      qnaTitle: '',
      qnaContent: '',
      qnaDate: '',
      qnaWriter: '',
      qnaId: -1,
      form: this.$form.createForm(this),
      componentKey: 1,
    }
  },
  created() {
    // 게시글 상세정보 받아오기
    http.get(`/vue/api/qnas/${this.$route.params.id}`)
      .then(({ data }) => {
        this.qnaId = data.no
        this.qnaTitle = data.title
        this.qnaWriter = data.uid
        this.qnaContent = data.content
        this.qnaDate = data.regdt
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
      this.$router.push('/help/qnas/list')
    },
    moveToUpdatePage() {
      this.$router.push(`/help/qnas/update/${this.qnaId}`)
    },
    deleteNotice() {
      http.delete(`/vue/api/qnas/${this.$route.params.id}`)
        .then(({ data }) => {
          if (data === 'success') {
            this.$notification.success({
              message: '삭제 성공!',
              description: '공지사항이 정상적으로 삭제되었습니다.',
            })
          } else {
            this.$notification.error({
              message: '삭제 실패',
              description: '삭제 도중에 문제가 발생하였습니다.',
            })
          }
          this.moveToListPage()
        })
        .catch((data) => {
          this.$notification.error({
            message: '삭제 실패',
            description: '삭제 도중에 문제가 발생하였습니다.',
          })
          this.moveToListPage()
        })
    },
    // 삭제 확인 모달
    showDeleteConfirm() {
      this.$confirm({
        title: '정말로 삭제하시겠습니까?',
        content: '삭제된 게시글은 복구할 수 없습니다.',
        okText: '삭제',
        okType: 'danger',
        cancelText: '취소',
        onOk: () => {
          this.deleteNotice()
        },
        onCancel() {
        },
      })
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) { // 정상적으로 입력이 된 경우
          this.registerComment(values.commentContent)
        }
      })
    },
    registerComment(commentContent) {
      http.post(`/vue/api/qnas/${this.$route.params.id}/comments`, { bid: this.$route.params.id, uid: this.$store.state.user.id, content: commentContent })
        .then(({ data }) => {
          if (data === 'success') {
            this.$notification.success({
              message: '등록 성공!',
              description: '정상적으로 등록되었습니다.',
            })
            this.updateComments()
            this.form.resetFields() // 코멘트 입력 Form 초기화
          } else {
            this.$notification.error({
              message: '등록 실패',
              description: '등록 도중에 문제가 발생하였습니다.',
            })
          }
        })
        .catch((data) => {
          console.log(data)
          this.$notification.error({
            message: '등록 실패',
            description: '등록 도중에 문제가 발생하였습니다.',
          })
        })
    },
    // 코멘트 컴포넌트를 리프레쉬하는 효과
    updateComments() {
      this.componentKey += 1
    },
  },
}
</script>

<style scoped>
</style>
