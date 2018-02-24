import axios from 'axios'
import store from './store'
import router from './router'

//设置全局axios默认值

axios.defaults.baseURL = 'http://10.0.5.115:5002/api';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//创建一个axios实例
const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

instance.interceptors.request.use = axios.interceptors.request.use;

//request拦截器
instance.interceptors.request.use(
  config => {
    //每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
    // if (store.state.token) {
    //   config.headers.Authorization = `${store.state.token}`;
    // }
    let token=window.sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
//respone拦截器
instance.interceptors.response.use(
  response => {
    // 处理excel文件
    if (response.headers && (response.headers['content-type'] === 'application/octet-stream' || response.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      // downloadUrl(response.request.responseURL)
      // window.open(response.request.responseURL)
      return response.request.responseURL
    }else{
      return response;
    }
  },
  error => { //默认除了2XX之外的都是错误的，就会走这里
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.dispatch('UserLogout'); //可能是token过期，清除它
          router.replace({ //跳转到登录页面
            path: 'login',
            query: {redirect: router.currentRoute.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
          });
      }
    }
    return error.response
  }
);

// download url
// const downloadUrl = url => {
//   let iframe = document.createElement('iframe')
//   iframe.style.display = 'none'
//   iframe.src = url
//   iframe.onload = function () {
//     document.body.removeChild(iframe)
//   }
//   document.body.appendChild(iframe)
// }
// Add a response interceptor
// axios.interceptors.response.use(res => {
//   // 处理excel文件
//   if (res.headers && (res.headers['content-type'] === 'application/octet-stream' || res.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
//     downloadUrl(res.request.responseURL)
//     return
//   }
//   ...
// }, error => {
//   // Do something with response error
//   return Promise.reject(error.response.data || error.message)
// })


export default {

  //用户登录
  userLogin(data) {
    return instance.post('/auth/login', data);
  },
  //company
  getCompanys(per, page) {
    return instance.get('/admin/company?page=' + page + '&per_page=' + per);
  },
  addCompany(data) {
    return instance.post('/admin/company', data);
  },
  delCompany(id) {
    return instance.delete('/admin/company/' + id);
  },
  getCompany(id) {
    return instance.get('/admin/company/' + id);
  },
  setCompany(id,data) {
    return instance.put('/admin/company/' + id, data);
  },
  //prod
  getProds(per, page) {
    return instance.get('/admin/prod?page=' + page + '&per_page=' + per);
  },
  addProd(data) {
    return instance.post('/admin/prod', data);
  },
  delProd(id) {
    return instance.delete('/admin/prod/' + id);
  },
  getProd(id) {
    return instance.get('/admin/prod/' + id);
  },
  setProd(id,data) {
    return instance.put('/admin/prod/' + id, data);
  },
  //period
  getPeriods(per, page) {
    return instance.get('/admin/period?page=' + page + '&per_page=' + per);
  },
  addPeriod(data) {
    return instance.post('/admin/period', data);
  },
  delPeriod(id) {
    return instance.delete('/admin/period/' + id);
  },
  getPeriod(id) {
    return instance.get('/admin/period/' + id);
  },
  setPeriod(id,data) {
    return instance.put('/admin/period/' + id, data);
  },
  //class
  getClasss(per, page) {
    return instance.get('/admin/class?page=' + page + '&per_page=' + per);
  },
  addClass(data) {
    return instance.post('/admin/class', data);
  },
  delClass(id) {
    return instance.delete('/admin/class/' + id);
  },
  getClass(id) {
    return instance.get('/admin/class/' + id);
  },
  setClass(id,data) {
    return instance.put('/admin/class/' + id, data);
  },
  //transaction
  getTransactions(per, page, filter) {
    if(filter){
      return instance.get('/transaction/?page=' + page + '&per_page=' +per +filter);
    }else{
      return instance.get('/transaction/?page=' + page + '&per_page=' +per);
    }
  },
  addTransaction(data) {
    return instance.post('/transaction/', data);
  },
  delTransaction(id) {
    return instance.delete('/transaction/' + id);
  },
  getTransaction(id) {
    return instance.get('/transaction/' + id);
  },
  setTransaction(id,data) {
    return instance.put('/transaction/' + id, data);
  },
  upLoad(data){
    return instance.post('/transaction/upload/',data)
  },
  delFile(id){
    return instance.delete('/transaction/file/' + id)
  },
  download(){
    return instance.get('/transaction/download/')
  },
  downfile(id){
    return instance.get('/transaction/file/' + id)
  }

}
