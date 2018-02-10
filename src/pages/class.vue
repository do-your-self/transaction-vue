<template>
 <div>
    <el-button size="small" @click="open">添加</el-button>
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column
        label="id">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.prod_id }}</span>
        </template>
      </el-table-column>      
      <el-table-column
        label="">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.class_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.amount_from }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.amount_to }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.return_rate }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" header-align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="open(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="remove(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="pageSize"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="40%">

      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="公司">
          <el-input v-model="form.class_name"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.amount_from"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.amount_to"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.return_rate"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.prod_id"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commit">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>

import api from '../axios.js'

export default {
  name: 'Class',
  data () {
    return {
      labelPosition: 'right',
      loading: true,
      tableData: [],
      dialogVisible: false,
      title: '',
      currentPage: 1,
      pages: 0,
      pageSize: [],
      total: 0,
      listId: null,
      form: {
        "id": null,
        "class_name": "",
        "amount_from": 0,
        "amount_to": 0,
        "return_rate": 0,
        "prod_id": 0 
      },
      operate:''
    }

  },

  beforeCreate(){
    api.getClasss(10,1).then((response) => {
      this.getData(response);
    });
  },

  methods: {
    getData: function(response){      //拿到返回的数据
      if(response){
        let resp = response.data.items;
        this.loading = false;
        this.tableData = resp;
        this.currentPage =  response.data.page;
        this.pageSize = [response.data.per_page];
        this.total = response.data.total;
        this.pages = response.data.pages;
      }
    },
    open(index,rows) {
      if(rows){
        this.form.name=rows.name;
        this.form.id=rows.id;
        this.operate="edit"
        this.title = '编辑';

      }else{
        this.operate="add"
        this.title = '新增'
      }
      this.dialogVisible=true;
    },
    commit(){
      this.dialogVisible=false;
      if(this.operate=="edit"){
        api.setClass(this.form.id,{"name":this.form.name}).then((response) => {
          this.getData(response);
          this.$message({
            type: 'success',
            message: '修改成功'
          });
        });

      }else{
        api.addClass({"name":this.form.name}).then((response) => {
          this.getData(response);
          this.$message({
            type: 'success',
            message: '添加成功'
          });
        });
      }
    },
    remove(index,rows) {
      api.delClass(rows.id).then((response) => {
      });
      api.getClasss(10,this.currentPage).then((response) => {
        this.getData(response);
        this.$message({
          type: 'success',
          message: '删除成功'
        });
      });
    },
    handleCurrentChange(val) {
      this.loading=true;
      api.getClasss(10,val).then((response) => {
        this.getData(response);
      });
    }
  }


}
</script>

<style scoped>
</style>
