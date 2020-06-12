import axios from 'axios'

// axios 객체를 생성
export default axios.create({
  baseURL: 'http://localhost:9999',
  headers: {
    // 'Content-type': 'applicatoin/json',
  },
})
