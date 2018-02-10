<template>
 <div>
    <el-button size="small" @click="open">添加</el-button>
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column
        label="id">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="prod名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.prod_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fund_raise_date_from }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fund_raise_date_to }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.establish_date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.start_point }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.increase_point }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.custodian_fee_rate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.advisor_fee_rate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.surviva_period }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.survival_period_unit }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.description }}</span>
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
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.fund_raise_date_from" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.fund_raise_date_to" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.fund_raise_date_to" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.start_point"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.increase_point"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.custodian_fee_rate"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.advisor_fee_rate"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.settlement_fee_rate"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.surviva_period"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.survival_period_unit"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.survival_period_unit"></el-input>
        </el-form-item>
        <el-form-item label="description">
          <el-input type="textarea" v-model="form.description"></el-input>
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
  name: 'Prod',
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
        "prod_name": '',
        "fund_raise_date_from": '',
        "fund_raise_date_to": '',
        "establish_date": '',
        "start_point": 0,
        "increase_point": 0,
        "custodian_fee_rate": 0,
        "advisor_fee_rate": 0,
        "settlement_fee_rate": 0,
        "surviva_period": 0,
        "survival_period_unit": '',
        "description": ''
      },
      operate:''
    }

  },

  beforeCreate(){
    api.getProds(10,1).then((response) => {
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
        api.setProd(this.form.id,{"name":this.form.name}).then((response) => {
          this.getData(response);
          this.$message({
            type: 'success',
            message: '修改成功'
          });
        });

      }else{
        api.addProd({"name":this.form.name}).then((response) => {
          this.getData(response);
          this.$message({
            type: 'success',
            message: '添加成功'
          });
        });
      }
    },
    remove(index,rows) {
      api.delProd(rows.id).then((response) => {
      });
      api.getProds(10,this.currentPage).then((response) => {
        this.getData(response);
        this.$message({
          type: 'success',
          message: '删除成功'
        });
      });
    },
    handleCurrentChange(val) {
      this.loading=true;
      api.getProds(10,val).then((response) => {
        this.getData(response);
      });
    }
  }


}
</script>

<style scoped>
</style>
