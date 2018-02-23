<template>
 <div>
 <el-row>
  <el-col :span="2">
    <el-button size="small" @click="open">添加</el-button>
  </el-col>
  <el-col :span="22">
    <el-form :inline="true" :model="filter" class="demo-form-inline">
      <el-form-item>
        <el-select size="mini" clearable filterable v-model="filter.company_id" placeholder="分公司" style="width: 100%;">
          <el-option v-for="list in $store.state.companys" :key="list.id" :label="list.name" :value="list.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select size="mini" clearable filterable v-model="filter.class_id" placeholder="产品名称" style="width: 100%;">
          <el-option v-for="list in $store.state.claarr" :key="list.id" :label="list.name" :value="list.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select size="mini" clearable filterable v-model="filter.prod_id" placeholder="产品分类名称" style="width: 100%;">
          <el-option v-for="list in $store.state.prods" :key="list.id" :label="list.name" :value="list.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select size="mini" clearable filterable v-model="filter.period_id" placeholder="产品分期名称" style="width: 100%;">
          <el-option v-for="list in $store.state.periods" :key="list.id" :label="list.name" :value="list.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
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
        label="认购份额类型" width="120px">
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
      <el-table-column fixed="right" label="操作" header-align="center" width="200px">
        <template slot-scope="scope">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
              <el-button :disabled="!scope.row.can_edit" size="mini" type="primary" icon="el-icon-edit" @click="open(scope.$index, scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="详细信息" placement="bottom">
              <el-button :disabled="!scope.row.can_edit" size="mini" type="primary" icon="el-icon-info" @click="showDetail(scope.$index, scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="上传" placement="bottom">
              <el-button :disabled="!scope.row.can_edit" size="mini" type="primary" icon="el-icon-upload"@click="dialogVisible2 = true"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <el-button :disabled="!scope.row.can_edit" size="mini" type="primary" icon="el-icon-delete" @click="remove(scope.$index, scope.row)"></el-button>
            </el-tooltip>
          </el-button-group>
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
      title="详细信息"
      :visible.sync="dialogVisible3"
      width="30%">
      <p><strong>合同编号</strong>{{form.contract_no}}</p>
      <p><strong>产品名称</strong>{{form.prod}}</p>
      <p><strong>产品期数</strong>{{form.prod_period}}</p>
      <p><strong>认购份额类型</strong>{{form.prod_class}}</p>
      <p><strong>投资人姓名</strong>{{form.investor_name}}</p>
      <p><strong>投资者类型</strong>{{form.investor_type}}</p>
      <p><strong>证件类型</strong>{{form.investor_id_type}}</p>
      <p><strong>证件号码</strong>{{form.investor_id}}</p>
      <p><strong>预期收益率</strong>{{form.return_rate}}</p>
      <p><strong>投资金额</strong>{{form.amount}}</p>
      <p><strong>认购日期</strong>{{form.invest_date}}</p>
      <p><strong>渠道</strong>{{form.channel}}</p>
      <p><strong>分公司</strong>{{form.company}}</p>
      <p><strong>理财师</strong>{{form.advisor_name}}</p>
      <p><strong>账户名称</strong>{{form.account_name}}</p>
      <p><strong>开户行</strong>{{form.bank_name}}</p>
      <p><strong>银行卡号码</strong>{{form.bank_card_no}}</p>
      <p><strong>大额支付号码</strong>{{form.paymaen_no}}</p>
      <p><strong>电话</strong>{{form.phone}}</p>
      <p><strong>地址</strong>{{form.address}}</p>
      <p><strong>公司名称</strong>{{form.company}}</p>
      <p><strong>更新时间</strong>{{form.update_time}}</p>
<!--       <p><strong></strong>{{form.}}</p>
      <p><strong></strong>{{form.}}</p>
      <p><strong></strong>{{form.}}</p> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="30%">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-click-modal="false">

      <el-form :label-position="labelPosition" label-width="150px" :model="form" ref="form" :rules="rules">
        <el-form-item label="合同编号" prop="contract_no">
          <el-input v-model="form.contract_no"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="prod_id">
          <el-select clearable filterable v-model="form.prod_id" placeholder="请选择产品名称" style="width: 100%;" @change="getAmount">
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
        <el-form-item label="投资金额" prop="amount" :placeholer="minamount">
          <el-input v-model="form.amount" type="number">
            <template slot="append">万</template>
          </el-input>
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
    var vaildateNumber=(rule,value,callback)=>{
      if(!value){
        return callback(new Error('不能为空'))
      }
      if (!Number.isInteger(Number(value))) {
        callback(new Error('请输入整数'));
      } else {
        callback();
      }

    };
    return {
      minamount:'',
      labelPosition: 'right',
      loading: true,
      tableData: [],
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      title: '',
      currentPage: 1,
      pages: 0,
      pageSize: [],
      total: 0,
      listId: null,
      filter: {
        company_id:'',
        class_id:'',
        prod_id:'',
        period_id:''
      },
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
          { validator: vaildateNumber, required: true, trigger: 'change'}
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
      let per_page= Math.round(response.data.pages*10);
      if(response.data.total > per_page){
        api.getCompanys(per_page,1).then((response) => {
          if(response.data){
            this.$store.dispatch('Companys', response.data.items);
          }
        });
      }else if(response.data){
        this.$store.dispatch('Companys', response.data.items);
      }
    });
    api.getProds(10,1).then((response) => {
      let per_page= Math.round(response.data.pages*10);
      if(response.data.total > per_page){
        api.getProds(per_page,1).then((response) => {
          if(response.data){
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
      }else if(response.data){
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
    api.getPeriods(10,1).then((response) => {
      let per_page= Math.round(response.data.pages*10);
      if(response.data.total > per_page){
        api.getPeriods(per_page,1).then((response) => {
          if(response.data){
            var periods=[];
            response.data.items.forEach(function(v,k){
              periods.push({
                id:v.id,
                name:v.period_name
              })
            });
            this.$store.dispatch('Periods', periods);
          }
        });
      }else if(response.data){
        var periods=[];
        response.data.items.forEach(function(v,k){
          periods.push({
            id:v.id,
            name:v.period_name
          })
        });
        this.$store.dispatch('Periods', periods);

      }
    });
    api.getClasss(10,1).then((response) => {
      let per_page= Math.round(response.data.pages*10);
      if(response.data.total > per_page){
        api.getClasss(per_page,1).then((response) => {
          if(response.data){
            var clas=[];
            response.data.items.forEach(function(v,k){
              clas.push({
                id:v.id,
                name:v.class_name
              })
            });
            this.$store.dispatch('Claarr', clas);
          }
        });
      }else if(response.data){
        var clas=[];
        response.data.items.forEach(function(v,k){
          clas.push({
            id:v.id,
            name:v.class_name
          })
        });
        this.$store.dispatch('Claarr', clas);
      }
    });
  },

  methods: {
    getAmount(){
      let id=this.form.prod_id;
      if(this.$store.state.minamounts.id){
        this.minamount='投资金额不能小于'+this.$store.state.minamounts.id+'万';
      }else if(this.$store.state.minamounts.id==0){
        this.minamount='';
      }else{
        api.getProd(id).then((response) => {
          if(response.data.min_amount){
            this.minamount='投资金额不能小于'+response.data.min_amount+'万';
            this.$store.dispatch('Minamounts', {id:id,min_amount:response.data.min_amount});
          }else{
            this.minamount='';
            this.$store.dispatch('Minamounts', {id:id,min_amount:0});
          }
        });
      }
      console.log(this.$store.state.minamounts)
      console.log(id)
      console.log(this.$store.state.minamounts['"'+id+'"'])
      console.log(this.$store.state.minamounts[id])
      console.log(this.$store.state.minamounts.id)
      console.log(this.$store.state.minamounts[2])
      console.log(this.$store.state.minamounts["2"])
      console.log(this.minamount)
    },
    showDetail(index,rows) {
      this.dialogVisible3=true;
      this.form=rows;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    onSearch(){
      let filter='';
      for(var k in this.filter){
        if(this.filter[k]){
          filter+='&'+k+'='+this.filter[k];
        }
      }
      api.getTransactions(10,1,filter).then((response) => {
        this.getData(response);
      });
    },
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
        this.title = '编辑(录入合同信息)';
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
        this.title = '新增(录入合同信息)'
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
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.delTransaction(rows.id).then((response) => {
          if(response.data.success){
            api.getTransactions(10,this.currentPage).then((response) => {
              this.getData(response);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            });
          }else{
            this.$message({
              type: 'error',
              message: response.statusText
            }); 
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
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
