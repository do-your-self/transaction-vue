<template>

    <el-aside width="250px">
    <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" style="width: 100%;" v-if="$store.state.admin=='admin'">
        <router-link to="/company">
            <el-menu-item index="1"><i class="el-icon-menu"></i>公司</el-menu-item>
        </router-link>
        <router-link to="/prod">
            <el-menu-item index="2"><i class="el-icon-star-on"></i>产品信息</el-menu-item>
        </router-link>
        <router-link to="/period">
            <el-menu-item index="3"><i class="el-icon-rank"></i>产品分期信息</el-menu-item>
        </router-link>
        <router-link to="/class">
            <el-menu-item index="4"><i class="el-icon-tickets"></i>产品分类信息</el-menu-item>
        </router-link>
    </el-menu>
    <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" style="width: 100%;" v-if="$store.state.admin=='user'">
        <router-link to="/transaction">
            <el-menu-item index="1"><i class="el-icon-tickets"></i>交易记录</el-menu-item>
        </router-link>
    </el-menu>
        
    </el-aside>

</template>

<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            }
        }
    }
</script>

<style>
.router-link-exact-active.router-link-active li {
    background: #e3eef9;
}
.el-aside{
    overflow: hidden;
}
.el-menu-vertical-demo{
    width: 100%;
    height: 100%;
    text-align: left;
    background: #fafafa;
}
a{
    text-decoration: none;
}
</style>
