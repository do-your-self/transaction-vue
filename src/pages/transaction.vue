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
        label="合同编号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.contract_no }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="产品名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.prod }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="产品期数">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.prod_period }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="投资人姓名">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.investor_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="投资者类型">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.investor_type }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="认购份额类型">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.prod_class }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="预期收益率">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.return_rate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="投资金额">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="认购日期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.invest_date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="渠道">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.channel }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="分公司" width="170px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.company }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="理财师">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.advisor_name }}</span>
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

      <el-form :label-position="labelPosition" label-width="150px" :model="form" ref="form" :rules="rules">
        <el-form-item label="合同编号" prop="contract_no">
          <el-input v-model="form.contract_no"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="prod_id">
          <el-select filterable v-model="form.prod_id" placeholder="请选择产品名称" style="width: 100%;">
            <el-option v-for="list in $store.state.prods" :key="list.id" :label="list.name" :value="list.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投资人姓名" prop="investor_name">
          <el-input v-model="form.investor_name"></el-input>
        </el-form-item>
        <el-form-item label="投资者类型" prop="investor_type">
          <el-radio-group v-model="form.investor_type">
            <el-radio label="个人"></el-radio>
            <el-radio label="机构"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="投资金额" prop="amount">
          <el-input v-model="form.amount" type="number"></el-input>
        </el-form-item> 
        <el-form-item label="认购日期" prop="invest_date">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.invest_date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="证件类型" prop="investor_id_type">
          <el-select v-model="form.investor_id_type" placeholder="请选择证件类型" style="width: 100%;">
            <el-option label="身份证" value="身份证"></el-option>
            <el-option label="营业执照" value="营业执照"></el-option>
            <el-option label="其它" value="其它"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="investor_id">
          <el-input v-model="form.investor_id"></el-input>
        </el-form-item>
        <el-form-item label="开户行名称" prop="bank_name">
          <el-input v-model="form.bank_name"></el-input>
        </el-form-item>
        <el-form-item label="账户名称" prop="account_name">
          <el-input v-model="form.account_name"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bank_card_no">
          <el-input v-model="form.bank_card_no"></el-input>
        </el-form-item>
        <el-form-item label="大额支付行号" prop="paymaen_no">
          <el-input v-model="form.paymaen_no"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="通信地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="分公司" prop="company_id">
          <el-select filterable v-model="form.company_id" placeholder="请选择分公司" style="width: 100%;">
            <el-option v-for="list in $store.state.companys" :key="list.id" :label="list.name" :value="list.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="理财师" prop="advisor_name">
          <el-input v-model="form.advisor_name"></el-input>
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
  name: 'Transaction',
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
        "contract_no": "",
        "prod_id": null,
        "investor_name": "",
        "investor_type": "",
        "investor_id_type": "",
        "investor_id": "",
        "amount": null,
        "invest_date": "",
        "account_name": "",
        "bank_name": "",
        "bank_card_no": "",
        "paymaen_no": "",
        "phone": "",
        "address": "",
        "company_id": null,
        "advisor_name": "",
        "channel": "",
        // "return_rate": ""
      },
      rules: { //验证规则
        contract_no: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        prod_id: [
          { required: true, message: '请选择产品名称', trigger: 'change'}
        ],
        investor_name: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        investor_type: [
          { required: true, message: '请选择投资者类型', trigger: 'change'}
        ],
        investor_id_type: [
          { required: true, message: '请选择证件类型', trigger: 'change'}
        ],
        investor_id: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        amount: [
          { required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
        ],
        invest_date: [
          { required: true, message: '请选择日期', trigger: 'change'}
        ],
        account_name: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        bank_name: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        bank_card_no: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        paymaen_no: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        phone: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        address: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ],
        company_id: [
          { required: true, message: '请选择分公司', trigger: 'change'}
        ],
        advisor_name: [
          { required: true, message: '不允许为空', trigger: 'blur'}
        ]
      },
      operate:''
    }

  },

  beforeCreate(){
    api.getTransactions(10,1).then((response) => {
      this.getData(response);
    });
    api.getCompanys(10,1).then((response) => {
      if(response){
        api.getCompanys(Math.round(response.data.pages*10),1).then((response) => {
          if(response){
            this.$store.dispatch('Companys', response.data.items);
          }
        });
      }
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
        this.pageSize = [response.data.per_page||0];
        this.total = response.data.total;
        this.pages = response.data.pages;
      }
    },
    open(index,rows) {
      if(rows){
        this.form=rows;
        this.operate="edit"
        this.title = '编辑';
        api.getTransaction(this.form.id).then((response) => {
          if(response.statusText=="OK"){
            this.form=response.data
          }
        });

      }else{
        this.form={
          "contract_no": "",
          "prod_id": null,
          "investor_name": "",
          "investor_type": "",
          "investor_id_type": "",
          "investor_id": "",
          "amount": null,
          "invest_date": "",
          "account_name": "",
          "bank_name": "",
          "bank_card_no": "",
          "paymaen_no": "",
          "phone": "",
          "address": "",
          "company_id": null,
          "advisor_name": ""
        };
        this.operate="add"
        this.title = '新增'
      }
      this.dialogVisible=true;
    },
    commit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.operate=="edit"){
            const opt={
              "contract_no":this.form.contract_no,
              "prod_id":this.form.prod_id,
              "investor_name":this.form.investor_name,
              "investor_type":this.form.investor_type,
              "investor_id_type":this.form.investor_id_type,
              "investor_id":this.form.investor_id,
              "amount":this.form.amount,
              "invest_date":this.form.invest_date,
              "account_name":this.form.account_name,
              "bank_name":this.form.bank_name,
              "bank_card_no":this.form.bank_card_no,
              "paymaen_no":this.form.paymaen_no,
              "phone":this.form.phone,
              "address":this.form.address,
              "company_id": this.form.company_id,
              "advisor_name":this.form.advisor_name
            };
            opt.invest_date=opt.invest_date.substring(0,10);
            opt.amount=Number(opt.amount);
            api.setTransaction(this.form.id,opt).then((response) => {
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
            let opt = JSON.parse(JSON.stringify(this.form));
            delete opt.id;
            delete opt.prod_class_id;
            opt.invest_date=opt.invest_date.substring(0,10);
            opt.amount=Number(opt.amount);
            api.addTransaction(opt).then((response) => {
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
      api.delTransaction(rows.id).then((response) => {
        api.getTransactions(10,this.currentPage).then((response) => {
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
      api.getTransactions(10,val).then((response) => {
        this.getData(response);
      });
    }
  }


}
</script>

<style scoped>
/*
.page {
  text-align:center;
  margin-top:20px;
}*/
</style>
