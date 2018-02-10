<template>
  <el-menu
  class="el-menu-demo"
  mode="horizontal"
  background-color="#409EFF"
  text-color="#fff"
  active-text-color="#ffd04b">
    <div class="logo">投后管理系统</div>
  <el-menu-item index="1" style="float:right;" @click="logout">登出</el-menu-item>
  <el-menu-item index="2" style="float:right;">{{$store.state.user}}</el-menu-item>
</el-menu>
</template>

<script>
    import api from '../axios.js'
    export default {
        methods: {
            logout() {
                //清除token
                this.$store.dispatch('UserLogout');
                if (!this.$store.state.token) {
                    this.$router.push('/login')
                    this.$message({
                        type: 'success',
                        message: '登出成功'
                    })
                } else {
                    this.$message({
                        type: 'info',
                        message: '登出失败'
                    })
                }
            }
        }
    }
</script>


<style scope>
    .logo{
        float: left;
        width:250px;
        text-align: center;
        height: 60px;
        color: #fff;
        line-height: 60px;
        font-size: 18px;
    }
    .el-menu-demo{
        width: 100%;
        position: absolute;
        z-index: 999;
    }
    .el-menu--horizontal.el-menu--dark .el-menu-item:hover, .el-menu--horizontal.el-menu--dark .el-submenu__title:hover {
        border-bottom: 5px solid #20a0ff;
    }
 
</style>
