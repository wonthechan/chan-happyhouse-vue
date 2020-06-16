<template>
  <div class="card">
    <div class="card-header card-header-flex">
      <div class="d-flex flex-column justify-content-center mr-auto">
      </div>
      <div class="d-flex flex-column justify-content-center">
        <a-button type="primary" icon="form" @click.prevent="moveToRegisterPage()">새 QnA 작성</a-button>
      </div>
    </div>
    <div class="card-body">
      <a-table :columns="columns" :dataSource="qnas">
        <!-- 검색 필터 툴팁 설정 -->
        <div
          slot="filterDropdown"
          slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          class="custom-filter-dropdown"
        >
          <a-input
            v-ant-ref="c => searchInput = c"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(selectedKeys, confirm)"
            style="width: 188px; margin-bottom: 8px; display: block;"
          />
          <a-button
            type="primary"
            @click="() => handleSearch(selectedKeys, confirm)"
            size="small"
            style="width: 90px; margin-right: 8px"
          >검색</a-button>
          <a-button
            @click="() => handleReset(clearFilters)"
            size="small"
            style="width: 90px"
          >초기화</a-button>
        </div>
        <!-- 검색 필터 아이콘 설정 -->
        <a-icon
          slot="filterIcon"
          slot-scope="filtered"
          type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <!-- 제목 필터링 후 결과 설정 -->
        <template slot="noticeTitle" slot-scope="text, record">
          <span v-if="searchText">
            <template
              v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
            >
              <a href="javascript: void(0);" @click.prevent="moveToDetailPage(record.key)" :key="i">
              <mark
                v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                :key="i"
                class="highlight"
              >{{fragment}}</mark>
              <template v-else>{{fragment}}</template>
              </a>
            </template>
          </span>
          <template v-else>
            <!-- <span class="font-weight-bold">{{text}}</span> -->
            <a href="javascript: void(0);" @click.prevent="moveToDetailPage(record.key)">{{text}}</a>
          </template>
        </template>
        <!-- 작성자 필터링 후 결과 설정 -->
        <template slot="writer" slot-scope="text">
          <span v-if="searchText">
            <template
              v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
            >
              <mark
                v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                :key="i"
                class="highlight"
              >{{fragment}}</mark>
              <template v-else>{{fragment}}</template>
            </template>
          </span>
          <template v-else>
            <a class="btn btn-sm btn-light" href="javascript: void(0);">{{text}}</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import http from '@/util/http-common.js'
const columns = [
  {
    title: '번호',
    dataIndex: 'key',
    scopedSlots: { customRender: 'key' },
    sorter: (a, b) => a.key - b.key,
    width: 100,
    align: 'center',
  },
  {
    title: '제목',
    className: 'title-area',
    dataIndex: 'noticeTitle',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'noticeTitle',
    },
    onFilter: (value, record) => record.noticeTitle.toLowerCase().includes(value.toLowerCase()),
    ellipsis: true, // 줄을 넘어가는 경우 ...로 처리
  },
  {
    title: '작성자',
    dataIndex: 'writer',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'writer',
    },
    onFilter: (value, record) => record.writer.toLowerCase().includes(value.toLowerCase()),
    width: 200,
    align: 'center',
  },
  {
    title: '등록일',
    dataIndex: 'date',
    scopedSlots: { customRender: 'date' },
    width: 200,
    align: 'center',
  },
]
export default {
  name: 'qnaList',
  data() {
    return {
      searchText: '',
      searchInput: null,
      qnas: [],
      columns,
    }
  },
  created() {
    // 공지사항 가져오기 (DB)
    http.get('/vue/api/qnas')
      .then(({ data }) => {
        data.map((item) => {
          this.qnas.push({
            key: item.no,
            writer: item.uid,
            noticeTitle: item.title,
            date: this.$moment(item.regdt).format('YYYY-MM-DD'), // 날짜 포맷
          })
        })
      })
  },
  methods: {
    handleSearch(selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },
    handleReset(clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    moveToRegisterPage() {
      this.$router.push('/help/qnas/register')
    },
    moveToDetailPage(key) {
      console.log(key)
      this.$router.push(`/help/qnas/detail/${key}`)
    },
  },
}
</script>
<style scoped>
.custom-filter-dropdown {
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>

<style>
th[class*="title-area"] {
  text-align: center !important;
}
td[class*="title-area"] {
  text-align: left !important;
}
</style>
