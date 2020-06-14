<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <span
            class="font-size-30 font-weight-bold"
          >{{ noticeTitle }}</span>
        </div>
        <hr/>
        <div class="mb-5">
          <span class="mr-3"><a-icon class="mr-1" type="clock-circle" theme="filled" />{{ noticeDate }}</span><span class="mr-3">|</span>
          <span class="font-weight-bold"><a-icon class="mr-1" type="user" />{{ noticeWriter }}</span>
        </div>
        <div v-html="noticeContent">
        </div>
      </div>
    </div>
    <div>
      <a-button class="mr-3 mb-3" icon="edit" @click="moveToUpdatePage()">수정하기</a-button>
      <a-button type="danger" icon="delete" @click="showDeleteConfirm()">삭제하기</a-button><br>
      <a-button icon="left" @click="moveToListPage()">목록으로 돌아가기</a-button>
    </div>
  </div>
</template>
<script>
import http from '@/util/http-common.js'

export default {
  name: 'noticeDetail',
  components: {
  },
  computed: {
  },
  data() {
    return {
      noticeTitle: '',
      noticeContent: '',
      noticeDate: '',
      noticeWriter: '',
      noticeId: -1,
    }
  },
  created() {
    // 게시글 상세정보 받아오기
    http.get(`/vue/api/notices/${this.$route.params.id}`)
      .then(({ data }) => {
        this.noticeId = data.no
        this.noticeTitle = data.title
        this.noticeWriter = data.uid
        this.noticeContent = data.content
        this.noticeDate = data.regdt
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
    moveToUpdatePage() {
      this.$router.push(`/help/notices/update/${this.noticeId}`)
    },
    deleteNotice() {
      http.delete(`/vue/api/notices/${this.$route.params.id}`)
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
  },
}
</script>

<style scoped>
</style>
