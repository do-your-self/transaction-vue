<template>
<el-container>
  <el-header>
    <Header/>
  </el-header>
  <el-container>
    <Menu/>
    <el-main>
      <router-view></router-view> 
    </el-main>
  </el-container>
</el-container>
</template>

<script>

import api from '../axios.js'
import Header from '../components/header.vue'
import Menu from '../components/menu.vue'

export default {
  name: 'index',
  components: {
    Menu,
    Header
  },

  data () {
    return {
    }
  },
  methods: {
  }

}
</script>

<style >
.el-header{
  padding:0!important;
  margin:0!important;
}
.page {
  text-align:center;
  margin-top:20px;
}
</style>
