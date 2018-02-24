<template>

    <el-aside :class="[$store.state.isCollapse?'w70':'w250']">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" style="width: 100%;" v-if="$store.state.admin=='admin'" :collapse="$store.state.isCollapse">
            <router-link to="/company">
                <el-menu-item index="1"><i class="el-icon-menu"></i><span slot="title">公司</span></el-menu-item>
            </router-link>
            <router-link to="/prod">
                <el-menu-item index="2"><i class="el-icon-star-on"></i><span slot="title">产品信息</span></el-menu-item>
            </router-link>
            <router-link to="/period">
                <el-menu-item index="3"><i class="el-icon-rank"></i><span slot="title">产品分期信息</span></el-menu-item>
            </router-link>
            <router-link to="/class">
                <el-menu-item index="4"><i class="el-icon-tickets"></i><span slot="title">产品分类信息</span></el-menu-item>
            </router-link>
            <router-link to="/transaction">
                <el-menu-item index="5"><i class="el-icon-tickets"></i><span slot="title">合同录入</span></el-menu-item>
            </router-link>
        </el-menu>
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" style="width: 100%;" v-if="$store.state.admin=='user'" :collapse="$store.state.isCollapse">
            <router-link to="/transaction">
                <el-menu-item index="1"><i class="el-icon-tickets"></i><span slot="title">合同录入</span></el-menu-item>
            </router-link>
        </el-menu>
        
    </el-aside>

</template>

<script>
    export default {
        data(){
            return {
            }
        },
        methods: {
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            }
        }
    }
</script>

<style>
    .w70{
        width:69px!important;
    }
    .w250{
        width:250px!important;
    }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
/*    width: 200px;
    min-height: 400px;*/
  }
.router-link-exact-active.router-link-active li {
    background: #e3eef9;
}
.el-aside{
    overflow: hidden!important;
    background: #fafafa!important;
}
.el-menu-vertical-demo{
    width: 100%;
    height: 100%;
    text-align: left;
    background: #fafafa!important;
}
a{
    text-decoration: none;
}
</style>
