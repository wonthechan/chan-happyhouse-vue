export async function currentAccount() {
  console.log('currentAccount() in kakao/index.js')
  return new Promise((resolve, reject) => {
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: function(res) {
        resolve({ id: res.id, email: res.kakao_account.email, name: res.properties.nickname, role: 'normal_user' })
      },
      fail: function(error) {
        alert(error)
      },
    })
  })
}

export async function logout() {
  return new Promise((resolve, reject) => {
    window.Kakao.Auth.logout(() => {
      console.log(window.Kakao.Auth.getAccessToken())
      resolve()
    })
  })
}
