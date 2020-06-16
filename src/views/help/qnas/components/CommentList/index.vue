<template>
  <div class="card">
    <div class="card-body">
      <h6 class="mb-4 text-uppercase">
        <strong>전체 댓글 {{ this.comments.length }}개</strong>
      </h6>
      <!-- 코멘트 삽입-->
      <template v-for="(comment, index) in comments">
        <div class="d-flex fl ex-nowrap align-items-start pt-4" :key="'comment_' + index">
            <div
            class="mr-4 flex-shrink-0 align-self-start kit__utils__avatar kit__utils__avatar--size64"
            >
            <img src="@/img/img_avatar2.png" alt="avatar2" />
            </div>
            <div class="flex-grow-1">
            <div class="border-bottom">
                <div class="d-flex flex-wrap mb-2">
                <div class="mr-auto">
                    <div class="text-gray-6">
                    <span class="text-dark font-weight-bold">{{ comment.uid }}</span> posted
                    </div>
                    <div>{{ comment.date }}</div>
                </div>
                <!-- 작성자에게만 삭제 버튼이 보임 -->
                <div v-if="comment.uid === $store.state.user.id">
                    <!-- 코멘트 삭제 -->
                    <a-icon type="delete" @click="removeComment(comment.cid)"/>
                </div>
                </div>
                <div class="mb-3">
                    {{ comment.content }}
                </div>
            </div>
            </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import http from '@/util/http-common.js'
export default {
  name: 'commentList',
  props: [
    'boardNo',
  ],
  data() {
    return {
      comments: [],
    }
  },
  created() {
    // 게시글에 등록된 모든 코멘트들을 리스트에 담기
    http.get(`/vue/api/qnas/${this.boardNo}/comments`)
      .then(({ data }) => {
        data.map((item) => {
          this.comments.push({
            cid: item.cid,
            uid: item.uid,
            content: item.content,
            date: item.regdt,
            // date: this.$moment(item.regdt).format('YYYY-MM-DD'), // 날짜 포맷
          })
        })
      })
      .catch((data) => {
        this.$notification.error({
          message: '불러오기 실패',
          description:
            '코멘트 리스트를 불러오는 도중에 문제가 발생하였습니다.',
        })
      })
  },
  methods: {
    removeComment(cid) {
      http.delete(`/vue/api/qnas/${this.boardNo}/comments/${cid}`)
        .then(({ data }) => {
          if (data === 'success') {
            this.$notification.success({
              message: '삭제 성공!',
              description: '댓글이 정상적으로 삭제되었습니다.',
            })
            // 삭제 완료하면 부모 컴포넌트에게 이벤트 보내야함.
            this.$emit('update-comment-event')
          } else {
            this.$notification.error({
              message: '삭제 실패',
              description: '삭제 도중에 문제가 발생하였습니다.',
            })
          }
        })
        .catch((data) => {
          this.$notification.error({
            message: '삭제 실패',
            description: '삭제 도중에 문제가 발생하였습니다.',
          })
        })
    },
  },
}
</script>

<style>
</style>
