import axios from 'axios'
// export function request(config, success, failure) {
//   // 创建axios实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//   // 发送真正的网络请求
//   instance(config).then(res => {
//     // console.log(res);
//     success(res)
//   }).catch(err => {
//     // console.log(err);
//     failure(err)
//   })
// }

// export function request(config) {
//   // 创建axios实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//   // 发送真正的网络请求
//   instance(config.baseConfig).then(res => {
//     // console.log(res);
//     config.success(res)
//   }).catch(err => {
//     // console.log(err);
//     config.failure(err)
//   })
// }


// export function request(config) {
//   return new Promise((reslove, reject) => {
//     // 创建axios实例
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
//     // 发送真正的网络请求
//     instance(config).then(res => {
//       reslove(res)
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }

export function request(config) {

  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })
  // 2.axios拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config);
    return config
  }, err => {
    console.log(err);
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })
  // 3.发送真正的网络请求
  return instance(config)

}