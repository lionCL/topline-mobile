//对token操作的封装

//定义键
const token = 'user'

//token的保存
function setAuthor(value) {
  window.localStorage.setItem(token, JSON.stringify(value))
}

//token的获取
function getAuthor() {
  return window.localStorage.getItem(token) ? JSON.parse(window.localStorage.getItem(token)) : null
}

//token的清除
function removeAuthor() {
  window.localStorage.removeItem(token)
}

//暴露接口
export { setAuthor, getAuthor, removeAuthor }
