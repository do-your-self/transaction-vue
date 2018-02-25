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
        label="产品名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.prod }}</span>
        </template>
      </el-table-column>      
      <el-table-column
        label="产品分类名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.class_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="起始募集期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.amount_from }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="终止募集期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.amount_to }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="回报率">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.return_rate }}</span>
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
        <el-form-item label="产品分类名称" prop="class_name">
          <el-input v-model="form.class_name"></el-input>
        </el-form-item>
        <el-form-item label="产品" prop="prod_id">
          <el-select filterable v-model="form.prod_id" placeholder="请选择产品名称" style="width: 100%;">
            <el-option v-for="list in $store.state.prods" :key="list.id" :label="list.name" :value="list.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始认购金额" prop="amount_from">
          <el-input v-model="form.amount_from" type="number"></el-input>
        </el-form-item>
        <el-form-item label="终止认购金额" prop="amount_to">
          <el-input v-model="form.amount_to" type="number"></el-input>
        </el-form-item>
        <el-form-item label="回报率" prop="return_rate">
          <el-input v-model="form.return_rate" type="number" step="0.001"></el-input>
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
  name: 'Class',
  data () {
    var vaildateNumber=(rule,value,callback)=>{
      if(!value&&value!=0){
        return callback(new Error('不能为空'))
      }
      if (!Number.isInteger(Number(value))) {
        callback(new Error('请输入整数'));
      } else {
        callback();
      }

    };
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
        "id":null,
        "class_name": "",
        "amount_from": "",
        "amount_to": "",
        "return_rate": "",
        "prod_id": "" 
      },
      rules: { //验证规则
        prod_id: [
          { required: true, message: '请选择产品名称', trigger: 'change'}
        ],
        amount_from: [
          { required: true, validator: vaildateNumber, trigger: 'blur'}
        ],
        amount_to: [
          { required: true, validator: vaildateNumber, trigger: 'blur'}
        ],
        return_rate: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        class_name: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ]
      },
      operate:''
    }
  },

  beforeCreate(){
    api.getClasss(10,1).then((response) => {
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
        this.title = '编辑产品分类信息';
        api.getClass(this.form.id).then((response) => {
          if(response.statusText=="OK"){
            this.form=response.data
          }
        });

      }else{
        this.form={
          "class_name": "",
          "amount_from": "",
          "amount_to": "",
          "return_rate": "",
          "prod_id": "" 
        }
        this.operate="add"
        this.title = '录入产品分类信息'
      }
      this.dialogVisible=true;
    },
    commit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let opt = JSON.parse(JSON.stringify(this.form));
          opt.amount_to=Number(opt.amount_to);
          opt.amount_from=Number(opt.amount_from);
          opt.return_rate=Number(opt.return_rate);
          delete opt.id;
          if(this.operate=="edit"){
            delete opt.prod;
            api.setClass(this.form.id,opt).then((response) => {
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
            api.addClass(opt).then((response) => {
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
        }else {
          this.$message({
            type: 'error',
            message: '请按提示输入合法的值'
          });
          return false;
        }
      })
    },
    remove(index,rows) {
      api.delClass(rows.id).then((response) => {
        api.getClasss(10,this.currentPage).then((response) => {
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
      api.getClasss(10,val).then((response) => {
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
