<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <div class="cui__utils__heading mb-0">
              <strong>메인 페이지 제작 중</strong>
            </div>
            <div class="text-muted">메인 페이지 제작 중입니다.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from './data.json'

const tableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Office',
    dataIndex: 'office',
    key: 'office',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    key: 'salary',
    sorter: (a, b) => a.salary - b.salary,
  },
]

export default {
  components: {
  },
  data() {
    return {
      tableData: data.tableData,
      tableColumns,
    }
  },

}
</script>
