<template>
<el-container>
  <el-header>
    <Header/>
  </el-header>
  <el-container>
    <el-aside width="200px"><Menu/></el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>

import api from '../axios.js'
import Header from './header.vue'
import Menu from './menu.vue'

export default {
  name: 'Prod',

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

<style scoped>

</style>
