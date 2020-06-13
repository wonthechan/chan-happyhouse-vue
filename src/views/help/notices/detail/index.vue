<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <h2
            class="text-dark font-weight-bold"
          >{{ noticeTitle }}</h2>
        </div>
        <hr/>
        <div class="height-100 mb-3">
          <span class="font-weight-bold">{{ noticeWriter }}</span><br>
          <span>{{ noticeDate }}</span> 에 작성됨
        </div>
        <div v-html="noticeContent">
        </div>
      </div>
    </div>
    <div>
      <a-button class="mr-3 mb-3" type="primary" icon="edit" @click="moveToUpdatePage()">수정하기</a-button>
      <a-button type="danger" icon="delete" @click="deleteNotice()">삭제하기</a-button><br>
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
  },
}
</script>

<style scoped>
</style>
