<template>
  <div class="bgimg">
    <el-row>
      <el-col :span="6" class="login">
        <p class="title">投后管理系统登录</p>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" style="margin-top:20px;">
          <el-form-item placeholder="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item placeholder="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" @keyup.enter.native="keyup"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" style="width:100%;margin-top:30px;">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import api from '../axios.js'

export default {
  name: 'Login',
  data () {
    return {
      activeName: 'login', //选项卡
      loginForm: {        //表单v-model的值
        username: '',
        password: ''
      },
      rules: { //验证规则
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur'},
          { min: 4, max: 16, message: '用户名在4到16位之间', trigger: 'blur,change'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'},
          { min: 4, max: 16, message: '密码在4到16位之间', trigger: 'blur,change'}
        ]
      }

    }
  },
  methods: {
    keyup(e){
      if(e.keyCode=="13"){
        this.submitForm('loginForm');
      }
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){ //验证通过
          let opt = this.loginForm;
          api.userLogin(opt)
          .then(({ data }) => {
            if(data.success){
              this.$message({
                type: 'success',
                message: '登录成功'
              });
              const {token, admin}=data
              this.$store.dispatch('UserLogin', token);
              this.$store.dispatch('User', data.name);
              // window.sessionStorage.setItem('user', data.name);
              window.sessionStorage.setItem('token', token);
              if(data.admin){
                this.$store.dispatch('Admin', 'admin');
                //跳转到指定的路由
                this.$router.push({
                   path:'/company'
                });
              }else{
                this.$store.dispatch('Admin', 'user');
                //跳转到指定的路由
                this.$router.push({
                   path:'/transaction'
                });
              }
            }else{
              this.$message({
                type: 'info',
                message: '用户名或密码错误'
              });
            }
          }).catch((err) => {
            console.log(err);
          });
        }else{
          //验证不通过
          return false;
        }
      });
    }
}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  background: url(../assets/bgimg.jpg);
}
.login {
  position: relative;
  left: 50%;
  margin-top: 200px;
  background: rgba(0,0,0,.3);
  padding: 20px 50px;
  border-radius: 3px; 
  min-height: 350px;
}
.title {
  color: #fff;
  font-size: 20px;
  text-align: center;
}
</style>
