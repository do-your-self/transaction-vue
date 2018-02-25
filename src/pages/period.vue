<template>
 <div>
    <el-button size="small" @click="open">添加</el-button>
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column
        label="序号"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="产品分期名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.period_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="产品名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.prod }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="当前状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="起息日">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.value_date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="兑付日">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.payment_date }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" header-align="center" width="150px">
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="pageSize"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-click-modal="false">
      <el-form :label-position="labelPosition" label-width="150px" :model="form" ref="form" :rules="rules">
        <el-form-item label="产品分期名称" prop="period_name">
          <el-input v-model="form.period_name"></el-input>
        </el-form-item>
        <el-form-item label="当前状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择活动区域" style="width: 100%;">
            <el-option label="成立" value="成立"></el-option>
            <el-option label="结束" value="结束"></el-option>
            <el-option label="募集期" value="募集期"></el-option>
            <el-option label="无效" value="无效"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起息日" prop="value_date">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.value_date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="兑付日" prop="payment_date">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.payment_date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="产品名称" prop="prod_id">
          <el-select filterable v-model="form.prod_id" placeholder="请选择产品名称" style="width: 100%;">
            <el-option v-for="list in $store.state.prods" :key="list.id" :label="list.name" :value="list.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>

import api from '../axios.js'

export default {
  name: 'Periods',
  data () {
    return {
      labelPosition: 'right',
      loading: true,
      tableData: [],
      dialogVisible: false,
      title: '',
      currentPage: 1,
      pages: 0,
      pageSize: [10,20,50],
      total: 0,
      listId: null,
      form: {
        "id": null,
        "period_name": '',
        "status": '',
        "value_date": '',
        "payment_date": '',
        "prod_id": '',
        "prod": ""
      },
      rules:{
        period_name: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        status: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        value_date: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        payment_date: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        prod_id: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ]
      },
      operate:''
    }

  },

  beforeCreate(){
    api.getPeriods(10,1).then((response) => {
      this.getData(response);
    });
    api.getProds(10,1).then((response) => {
      if(response){
        api.getProds(Math.round(response.data.pages*10),1).then((response) => {
          if(response){
            var prods=[];
            response.data.items.forEach(function(v,k){
              prods.push({
                id:v.id,
                name:v.prod_name
              })
            });
            this.$store.dispatch('Prods', prods);
          }
        });
      }
    });
  },

  methods: {
    getData: function(response){      //拿到返回的数据
      if(response){
        let resp = response.data.items;
        this.loading = false;
        this.tableData = resp;
        this.currentPage =  response.data.page;
        this.total = response.data.total;
        this.pages = response.data.pages;
      }
    },
    open(index,rows) {
      if(rows){
        this.form=rows;
        this.operate="edit"
        this.title = '编辑产品分期信息';

      }else{
        this.form={
          "period_name": '',
          "status": '',
          "value_date": '',
          "payment_date": '',
          "prod_id": ''
        };
        this.operate="add"
        this.title = '录入产品分期信息'
      }
      this.dialogVisible=true;
    },
    commit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let opt = JSON.parse(JSON.stringify(this.form));
          delete opt.id;
          delete opt.prod;
          opt.value_date=opt.value_date.substring(0,10);
          opt.payment_date=opt.payment_date.substring(0,10);
          if(this.operate=="edit"){
            api.setPeriod(this.form.id,opt).then((response) => {
              if(response.data.success){
                this.dialogVisible=false;
                this.getData(response);
                this.$message({
                  type: 'success',
                  message: '修改成功'
                });
              }else{
                this.$message({
                  type: 'error',
                  message: response.statusText
                });
              }
            });

          }else{
            api.addPeriod(opt).then((response) => {
              if(response.data.success){
                this.dialogVisible=false;
                this.getData(response);
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });
              }else{
                this.$message({
                  type: 'error',
                  message: response.statusText
                });
              }
            });
          }

        } else {
          this.$message({
            type: 'error',
            message: '请按提示输入合法的值'
          });
          return false;
        }
      });
    },
    remove(index,rows) {
      api.delPeriod(rows.id).then((response) => {
        api.getPeriods(10,this.currentPage).then((response) => {
          this.getData(response);
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        });
      });
    },
    handleCurrentChange(val) {
      this.loading=true;
      api.getPeriods(10,val).then((response) => {
        this.getData(response);
      });
    },
    handleSizeChange(val) {
      this.loading=true;
      api.getTransactions(val,1).then((response) => {
        this.getData(response);
      });
    }
  }


}
</script>

<style scoped>
</style>
