<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-button size="mini" @click="open">添加</el-button>
        <el-button size="mini" type="primary" @click="export2Excel">导出</el-button>
      </el-col>
      <el-col :span="20">
        <el-form :inline="true" :model="filter" class="demo-form-inline">
          <el-form-item>
            <el-select size="mini" clearable filterable v-model="filter.company_id" placeholder="分公司" style="width: 100%;">
              <el-option v-for="list in $store.state.companys" :key="list.id" :label="list.name" :value="list.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select size="mini" clearable filterable v-model="filter.prod_id" placeholder="产品名称" style="width: 100%;">
              <el-option v-for="list in $store.state.prods" :key="list.id" :label="list.name" :value="list.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select size="mini" clearable filterable v-model="filter.class_id" placeholder="产品分类名称" style="width: 100%;">
              <el-option v-for="list in $store.state.claarr" :key="list.id" :label="list.name" :value="list.id"></el-option>
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
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" v-if="$store.state.admin=='admin'">
      <el-table-column
        label="序号"
        type="index"
        width="70">
      </el-table-column>
      <el-table-column
        label="产品编号">
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
        label="投资人姓名">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.investor_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="证件号码">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.investor_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="银行卡号码">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.bank_card_no }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="投资金额">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="电话">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
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
              <el-button :disabled="!scope.row.can_edit" size="mini" type="primary" icon="el-icon-upload"@click="upload(scope.$index,scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <el-button :disabled="!scope.row.can_edit" size="mini" type="primary" icon="el-icon-delete" @click="remove(scope.$index, scope.row)"></el-button>
            </el-tooltip>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" v-if="$store.state.admin=='user'">
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
              <el-button :disabled="!scope.row.can_edit" size="mini" type="primary" icon="el-icon-upload"@click="upload(scope.$index,scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <el-button :disabled="!scope.row.can_edit" size="mini" type="primary" icon="el-icon-delete" @click="remove(scope.$index, scope.row)"></el-button>
            </el-tooltip>
          </el-button-group>
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
      title="详细信息"
      :visible.sync="dialogVisible3"
      width="40%">
      <el-row>
        <el-col :span="12"><p><strong>合同编号:</strong>{{form.contract_no}}</p></el-col>
        <el-col :span="12"><p><strong>产品名称:</strong>{{form.prod}}</p></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><p><strong>产品期数:</strong>{{form.prod_period}}</p></el-col>
        <el-col :span="12"><p><strong>认购份额类型:</strong>{{form.prod_class}}</p></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><p><strong>投资人姓名:</strong>{{form.investor_name}}</p></el-col>
        <el-col :span="12"><p><strong>投资者类型:</strong>{{form.investor_type}}</p></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><p><strong>证件类型:</strong>{{form.investor_id_type}}</p></el-col>
        <el-col :span="12"><p><strong>证件号码:</strong>{{form.investor_id}}</p></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><p><strong>预期收益率:</strong>{{form.return_rate}}</p></el-col>
        <el-col :span="12"><p><strong>投资金额:</strong>{{form.amount}}</p></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><p><strong>认购日期:</strong>{{form.invest_date}}</p></el-col>
        <el-col :span="12"><p><strong>渠道:</strong>{{form.channel}}</p></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><p><strong>理财师:</strong>{{form.advisor_name}}</p></el-col>
        <el-col :span="12"><p><strong>分公司:</strong>{{form.company}}</p></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><p><strong>账户名称:</strong>{{form.account_name}}</p></el-col>
        <el-col :span="12"><p><strong>开户行:</strong>{{form.bank_name}}</p></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><p><strong>银行卡号码:</strong>{{form.bank_card_no}}</p></el-col>
        <el-col :span="12"><p><strong>大额支付号码:</strong>{{form.paymaen_no}}</p></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><p><strong>电话:</strong>{{form.phone}}</p></el-col>
        <el-col :span="12"><p><strong>地址:</strong>{{form.address}}</p></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><p><strong>公司名称:</strong>{{form.company}}</p></el-col>
        <el-col :span="12"><p><strong>更新时间:</strong>{{form.update_time}}</p></el-col>
      </el-row>
      <p><strong>上传文件列表</strong></p>
      <el-table
        :data="form.files"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="文件名">
        </el-table-column>
        <el-table-column
          prop="upload_time"
          label="上传日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="upload_user"
          label="上传人">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="download(scope.$index, scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="上传"
      :visible.sync="dialogVisible2"
      width="30%">
      <el-upload
        name="upload_file"
        class="upload-demo"
        action=""
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :file-list="files.list">
        <el-button size="small" type="primary">点击上传</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible2 = false">关闭</el-button>
      </span>
    </el-dialog>


    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="40%"
      :fullscreen="true"
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
        <el-form-item label="投资金额" prop="amount">
          <el-input v-model="form.amount" type="number" :placeholder="minamount">
            <template slot="append">元</template>
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
import downloadjs from 'downloadjs'
export default {
  name: 'Transaction',
  data () {
    var vaildateNumber=(rule,value,callback)=>{
      if(!value){
        return callback(new Error('不能为空'))
      }
      if (!Number.isInteger(Number(value))) {
        return callback(new Error('请输入整数'));
      } 
      if (value < this.min){
        callback(new Error('投资金额不能小于'+this.min+'万'));
      }else {
        callback();
      }

    };
    return {
      list:[],
      minamount:'',
      min:'',
      labelPosition: 'right',
      loading: true,
      tableData: [],
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      title: '',
      currentPage: 1,
      pages: 0,
      pageSize: [10,20,50],
      total: 0,
      filter: {
        company_id:'',
        class_id:'',
        prod_id:'',
        period_id:''
      },
      files: {
        id:'',
        list: []
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
        "channel": ""
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
   DownloadJS:function (blob, filename, mimetype)
    {
        if (!blob) {
            throw {
                name: 'Argument Null Exception',
                nameof: 'blob',
                description: 'The supplied variable is null'
            }
        }

        if (!filename) {
            throw {
                name: 'Argument Null Exception',
                nameof: 'filename',
                description: 'The supplied variable is null'
            }
        }

        if (!mimetype) {
            throw {
                name: 'Argument Null Exception',
                nameof: 'mime',
                description: 'The supplied variable is null'
            }
        }

        if (!Array.isArray(blob)) {
            throw {
                name: 'Type Error',
                nameof: 'blob',
                description: 'Supplied data is not an array'
            }
        }

        // Without the parameter '\ufeff' the charset is changed after blob generation
        // however it does not work in IE11, so wrap it in a try catch
        // '\ufeff' is the UTF-8 BOM

        var objectBlob;

        try{
            objectBlob = new Blob(['\ufeff', blob], { type: mimetype });
        } catch (e)
        {
            var bb = new window.MSBlobBuilder();
            bb.append(['\ufeff']);
            bb.append(blob);
            objectBlob = bb.getBlob();
        }
        

        if (!navigator.msSaveOrOpenBlob) {
            var objUrl = URL.createObjectURL(objectBlob);

            var a = document.createElement('a');
            a.download = filename;
            a.href = objUrl;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            /*In linux the link download element was removed too soon. this way would help.
             * For now this is the better approach I think.
             * */
            setTimeout(function ()
            {
                a.remove();
                a = undefined;
                URL.revokeObjectURL(objUrl);
                return;
            }, 100)
        } else {
            navigator.msSaveOrOpenBlob(objectBlob, filename);
            return;
        }
    },
    download(index,rows){    
      api.downfile(rows.id).then((response) => {
        this.DownloadJS(response, rows.name, "application/octet-stream");
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    export2Excel() {
      api.download().then((response) => {
        this.list=response.data;
        response.data.forEach(function(v,k){
          v['index']=k+1;
        })
        require.ensure([], () => {
          const { export_json_to_excel } = require('../vendor/Export2Excel');
          const tHeader = ['序号','合同编号','产品名称','投资人姓名','投资者类型','证件类型','证件号码','认购份额类型','收益率','期限（月）','投资金额','认购日期','账户名称','开户行名称','银行卡号','大额支付行号','联系方式','通信地址','渠道','分公司','理财师'];
          const filterVal = ["index","contract_no","prod","investor_name","investor_type","investor_id_type","investor_id","prod_class","return_rate","survival_period","amount","invest_date","account_name","bank_name","bank_card_no","paymaen_no","phone","address","channel","company","advisor_name"];
          const list = this.list;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '下载');
        })
      });
    },
    upload(index,rows){
      this.dialogVisible2 = true;
      this.files.id=rows.id;
      this.files.list=rows.files;
    },
    beforeUpload (file) {
      let fd = new FormData()
      fd.append('upload_file', file)
      fd.append('transaction_pk', this.files.id)
      api.upLoad(fd).then((response) => {
        if(response.data.success){
          api.getTransaction(this.files.id).then((response) => {
            if(response.statusText=="OK"){
              this.files.list=response.data.files
              api.getTransactions(10,this.currentPage).then((response) => {
                this.getData(response);
              });
            }
          });
          this.$message({
            type: 'success',
            message: '上传成功'
          });
        }
      })
      return;
    },
    handleRemove(file, fileList) {
      api.delFile(file.id).then((response) => {
        if(response.data.success){
          // api.getTransaction(this.files.id).then((response) => {
          //   if(response.statusText=="OK"){
          //     // this.files.list=response.data.files
          //   }
          // });
          this.$message({
            type: 'success',
            message: '删除成功'
          });

        }
      })
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    getAmount(){
      let id='prod'+this.form.prod_id;
      if(this.$store.state.minamounts[id]){
        this.minamount='投资金额不能小于'+this.$store.state.minamounts[id]+'万';
        this.min=this.$store.state.minamounts[id];
      }else if(this.$store.state.minamounts[id]==0){
        this.minamount='';
        this.min=0;
      }else{
        api.getProd(this.form.prod_id).then((response) => {
          if(response.data.min_amount){
            this.minamount='投资金额不能小于'+response.data.min_amount+'万';
            this.min=response.data.min_amount;
            this.$store.dispatch('Minamounts', {id:id,min_amount:response.data.min_amount});
          }else{
            this.minamount='';
            this.min=0;
            this.$store.dispatch('Minamounts', {id:id,min_amount:0});
          }
        });
      }
    },
    showDetail(index,rows) {
      this.dialogVisible3=true;
      this.form=rows;
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
        this.total = response.data.total;
        this.pages = response.data.pages;
      }
    },
    open(index,rows) {
      if(rows){
        this.form=rows;
        this.operate="edit"
        this.title = '编辑合同信息';
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
        this.title = '录入合同信息'
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
p{
  margin:5px!important;
}
</style>
