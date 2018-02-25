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
          <span style="margin-left: 10px">{{ scope.row.prod_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="起始募集期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fund_raise_date_from }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="终止募集期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fund_raise_date_to }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="成立日期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.establish_date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="认购起点(万)">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.start_point }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="递增金额(万)">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.increase_point }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="托管费率">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.custodian_fee_rate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="财务顾问费率">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.advisor_fee_rate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="存续期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.surviva_period }}({{ scope.row.survival_period_unit }})</span>
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
      width="40%"
      :close-on-click-modal="false">

      <el-form :label-position="labelPosition" label-width="150px" :model="form" ref="form" :rules="rules">
        <el-form-item label="产品名称" prop="prod_name">
          <el-input v-model="form.prod_name"></el-input>
        </el-form-item>
        <el-form-item label="募集期" prop="fund_raise_date_from">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="起始募集期" v-model="form.fund_raise_date_from" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="终止募集期" v-model="form.fund_raise_date_to" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label=" 成立日期" prop="establish_date">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.establish_date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="认购起点(万)" prop="start_point">
          <el-input v-model="form.start_point" type="number"></el-input>
        </el-form-item>
        <el-form-item label="递增金额(万)" prop="increase_point">
          <el-input v-model="form.increase_point" type="number"></el-input>
        </el-form-item>
        <el-form-item label="托管费率" prop="">
          <el-input v-model="form.custodian_fee_rate" type="number" step="0.001"></el-input>
        </el-form-item>
        <el-form-item label="财务顾问费率" prop="advisor_fee_rate" step="0.001">
          <el-input v-model="form.advisor_fee_rate" type="number"></el-input>
        </el-form-item>
        <el-form-item label="交易结算费率" prop="settlement_fee_rate" step="0.001">
          <el-input v-model="form.settlement_fee_rate" type="number"></el-input>
        </el-form-item>
        <el-form-item label="存续期" prop="surviva_period">
          <el-input v-model="form.surviva_period" type="number"></el-input>
        </el-form-item>
        <el-form-item label=" 存续期单位(月)" prop="survival_period_unit">
          <el-input v-model="form.survival_period_unit"></el-input>
        </el-form-item>
        <el-form-item label="其他描述信息" prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
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
      pageSize: [10,20,50],
      total: 0,
      listId: null,
      form: {
        "id": null,
        "prod_name": '',
        "fund_raise_date_from": '',
        "fund_raise_date_to": '',
        "establish_date": '',
        "start_point": '',
        "increase_point": '',
        "custodian_fee_rate": '',
        "advisor_fee_rate": '',
        "settlement_fee_rate": '',
        "surviva_period": '',
        "survival_period_unit": '',
        "description": ''
      },
      rules: { //验证规则
        prod_name: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        fund_raise_date_from: [
          { required: true, message: '请选择日期', trigger: 'change'}
        ],
        fund_raise_date_to: [
          { required: true, message: '请选择日期', trigger: 'change'}
        ],
        establish_date: [
          { required: true, message: '请选择日期', trigger: 'change'}
        ],
        start_point: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        increase_point: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        custodian_fee_rate: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        advisor_fee_rate: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        settlement_fee_rate: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        surviva_period: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        survival_period_unit: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        description: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ]
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
        this.total = response.data.total;
        this.pages = response.data.pages;
      }
    },
    open(index,rows) {
      if(rows){
        this.form=rows;
        this.operate="edit"
        this.title = '编辑产品信息';
        api.getProd(this.form.id).then((response) => {
          if(response.statusText=="OK"){
            this.form=response.data
          }
        });

      }else{
        this.form={
          "prod_name": '',
          "fund_raise_date_from": '',
          "fund_raise_date_to": '',
          "establish_date": '',
          "start_point": '',
          "increase_point": '',
          "custodian_fee_rate": '',
          "advisor_fee_rate": '',
          "settlement_fee_rate": '',
          "surviva_period": '',
          "survival_period_unit": '',
          "description": ''
        };
        this.operate="add"
        this.title = '录入产品信息'
      }
      this.dialogVisible=true;
    },
    commit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let opt = JSON.parse(JSON.stringify(this.form));
          opt.start_point=Number(opt.start_point);
          opt.increase_point=Number(opt.increase_point);
          opt.custodian_fee_rate=Number(opt.custodian_fee_rate);
          opt.advisor_fee_rate=Number(opt.advisor_fee_rate);
          opt.settlement_fee_rate=Number(opt.settlement_fee_rate);
          opt.surviva_period=Number(opt.surviva_period);
          opt.establish_date=opt.establish_date.substring(0,10);
          opt.fund_raise_date_from=opt.fund_raise_date_from.substring(0,10);
          opt.fund_raise_date_to=opt.fund_raise_date_to.substring(0,10);
          delete opt.min_amount;
          delete opt.id;
          if(this.operate=="edit"){
            api.setProd(this.form.id,opt).then((response) => {
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
            api.addProd(opt).then((response) => {
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
      api.delProd(rows.id).then((response) => {
        api.getProds(10,this.currentPage).then((response) => {
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
      api.getProds(10,val).then((response) => {
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
