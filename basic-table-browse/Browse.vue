<template>
    <div class="browse-table">
        <el-table ref="browseTable" :data="data" style="width: 100%;"  v-loading="listLoading" element-loading-text="给我一点时间"
          :height="noHeight?null:(paramNumber(tableConfig['height'])?paramNumber(tableConfig['height']):getDefaultHeight())"
          :max-height="paramNumber(tableConfig['max-height'])"
          :stripe="paramBoolean(tableConfig['stripe'])!==null?paramBoolean(tableConfig['stripe']):true"
          :border="paramBoolean(tableConfig['border'])!==null?paramBoolean(tableConfig['border']):true"
          :size="paramString(tableConfig['size'])"
          :fit="paramBoolean(tableConfig['fit'])!==null?paramBoolean(tableConfig['fit']):true"
          :show-header="paramBoolean(tableConfig['show-header'])!==null?paramBoolean(tableConfig['show-header']):true"
          :highlight-current-row="paramBoolean(tableConfig['highlight-current-row'])!==null?paramBoolean(tableConfig['highlight-current-row']):true"
          :current-row-key="paramString(tableConfig['current-row-key'])"
          :row-class-name="paramObjectName(tableConfig['row-class-name'])"
          :cell-class-name="paramString(tableConfig['cell-class-name'])"
          :cell-style="paramObjectName(tableConfig['cell-style'])"
          :header-row-class-name="paramString(tableConfig['header-row-class-name'])"
          :header-row-style="paramObjectName(tableConfig['header-row-style'])"
          :header-cell-class-name="paramString(tableConfig['header-cell-class-name'])"
          :header-cell-style="paramObjectName(tableConfig['header-cell-style'])"
          :row-key="paramString(tableConfig['row-key'])"
          :empty-text="paramString(tableConfig['empty-text'])"
          :default-expand-all="paramBoolean(tableConfig['default-expand-all'])"
          :expand-row-keys="paramArray(tableConfig['expand-row-keys'])"
          :default-sort="paramObjectName(tableConfig['default-sort'])"
          :tooltip-effect="paramString(tableConfig['tooltip-effect'])"
          :show-summary="paramBoolean(tableConfig['show-summary'])"
          :sum-text="paramString(tableConfig['sum-text'])"
          :summary-method="paramObjectName(tableConfig['summary-method'])"
          :span-method="paramObjectName(tableConfig['span-method'])"
          :select-on-indeterminate="paramBoolean(tableConfig['select-on-indeterminate'])!==null?paramBoolean(tableConfig['select-on-indeterminate']):true"
          @sort-change="sortSearch"
          @selection-change="selectionChange"
        >
        <table-column :columns="tableConfig.columns" :rowNum="rowNum" :chooseFields="chooseColumn" :chooseOption="chooseOption" :rowCheck="rowCheck" v-on:openDialog="openDialog">
          <slot name="firstColumn" slot="firstColumn"></slot>
          <slot name="optionColumn" slot="optionColumn"></slot>
        </table-column>
        </el-table>
        <div v-if="pagenation" class="pagination-container">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[10,20,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
        <el-dialog :title="chooseTitle" v-el-drag-dialog append-to-body :close-on-click-modal='false' :visible.sync="chooseDialog" width="35%" custom-class="dialog-default">
            <!-- 正文部分 -->
            <div class="dialog-contant-default">
                <ul class="ul-condition">
                  <li>
                    <el-select class="input-condition" v-model="firstLi.select">
                      <el-option v-for="(text,value) in conditionOption" :key="value" :label="text" :value="value"></el-option>
                    </el-select>
                    <el-input class="input-condition" v-model="firstLi.text"></el-input>
                    <el-button v-if="otherLi.length === 0" icon="el-icon-plus" @click="addCondition"></el-button>
                  </li>
                  <li v-for="(item,index) in otherLi" :key="index">
                    <template>
                      <el-radio v-model="item.radio" label="and">and</el-radio>
                      <el-radio v-model="item.radio" label="or">or</el-radio>
                    </template><br/>
                    <el-select class="input-condition" v-model="item.select">
                      <el-option v-for="(text,value) in conditionOption" :key="value" :label="text" :value="value"></el-option>
                    </el-select>
                    <el-input class="input-condition" v-model="item.text"></el-input>
                    <el-button v-if="otherLi.length === index+1" @click="addCondition" icon="el-icon-plus"></el-button>
                    <el-button icon="el-icon-minus" @click="reduceCondition(index)"></el-button>
                  </li>
                </ul>
            </div>
            <!-- 底部部分 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="chooseDialog = false">取消</el-button>
                <el-button @click="saveChoose" type="primary">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import tableColumn from './browseColumn'
import { baseSearch } from '@/api/base'
import elDragDialog from '@/directive/el-dragDialog'
// import { deepClone } from '@/utils/index'
// import getFunction from '@/views/reportManage/aa'
export default {
  props: {
    tableOption: Object, // table配置数据
    pagenation: Boolean, // 是否分页
    rowNum: Boolean, // 是否有序号
    rowCheck: Boolean, // 是否复选
    noHeight: Boolean, // 是否需要高度
    elFunction: Object, // 封装方法
    chooseOption: Array, // 筛选条件
    chooseFields: [Array, String] // 字段筛选
  },
  watch: {
    chooseFields(arr) {
      this.chooseColumn = []
      this.$nextTick(() => {
        this.chooseColumn = arr
      })
    }
  },
  directives: { elDragDialog },
  data() {
    return {
      data: [], // table 数据
      listLoading: false, // 加载
      tableParams: {}, // 查询参数
      total: null, // 总数
      pageNo: 1, // 当前页
      pageSize: null, // 总页数
      sortBy: null, // 排序列
      orderBySection: null, // 排序方式
      url: null, // 查询路径
      mulSelect: [], // 选中
      chooseDialog: false, // 弹框
      chooseTitle: null, // 筛选标题
      chooseField: null, // 筛选字段
      conditionOption: { // 筛选条件
        '=': '=',
        '>': '>',
        '<': '<',
        '>=': '>=',
        '<=': '<=',
        'like': 'like'
      },
      firstLi: { // 第一个条件值
        select: null,
        text: null
      }, // 其他条件值
      otherLi: [],
      chooseColumn: []
    }
  },
  components: {
    tableColumn
  },
  computed: {
    tableConfig: function() { // table element属性
      return this.tableOption.tableConfig
    },
    formConfig: function() {
      return this.tableOption.formConfig
    }
    // chooseColumn: function() {
    //   return deepClone(this.tableConfig.columns)
    // }
  },
  methods: {
    getData(url, param, page) { // 获取列表
      this.listLoading = true
      this.tableParams = param || {}
      if (this.pagenation) {
        if (!page) {
          param.pageNo = 1
          this.pageNo = 1
        } else {
          param.pageNo = this.pageNo
        }
      }
      if (this.pageSize !== null) {
        param.pageSize = this.pageSize
      }
      if (this.orderBySection !== null) {
        param.orderBySection = this.orderBySection
      }
      this.url = url
      param.urlMode = 2
      baseSearch(url, param).then(response => {
        this.data = response.data.item
        this.total = response.data.total
        if (!page && this.pagenation) {
          this.pageSize = response.data.pageSize
        }
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    getDefaultHeight() {
      let formHeight = 0
      if (this.formConfig) {
        const arr = Object.keys(this.formConfig)
        if (arr.length === 0) {
          formHeight = 0
        } else {
          const temp = arr.length / 3
          if (Number.isInteger(temp)) {
            formHeight = (arr.length / 3) * 60
          } else {
            formHeight = (Number.parseInt(arr.length / 3) + 1) * 60
          }
        }
      }
      return this.$store.state.app.containHeight - 177 - formHeight
    },
    clearTable() {
      this.data = []
    },
    getOnceData(data) { // 手动传入数据
      this.data = data
    },
    paramString(data) { // 转字符串
      return typeof (data) === 'string' ? data : null
    },
    paramNumber(data) { // 转数字
      if (typeof (data) !== 'number') {
        data = isNaN(Number.parseFloat(data)) ? null : Number.parseFloat(data)
      }
      return data
    },
    paramArray(data) { // 数组
      if (typeof (data) === 'string') {
        data = Array.isArray(JSON.parse(data)) ? JSON.parse(data) : null
      } else {
        data = null
      }
      return data
    },
    paramBoolean(data) { // 转布尔
      if (typeof (data) !== 'boolean') {
        if (data === 'true') {
          data = true
        } else if (data === 'false') {
          data = false
        } else {
          data = null
        }
      }
      return data
    },
    paramObjectName(name) { // 根据对象名找对象
      if (name) {
        return this.elFunction[name]
      } else {
        return null
      }
    },
    handleSizeChange(val) { // 分页
      this.pageSize = val
      this.getData(this.url, this.tableParams, 1)
    },
    handleCurrentChange(val) { // 分页
      this.pageNo = val
      this.getData(this.url, this.tableParams, 1)
    },
    sortSearch(column) { // 排序
      this.orderBySection = column.column.sortBy + ' ' + column.order.split('ending')[0]
      this.getData(this.url, this.tableParams, 1)
    },
    setTableParam() {
      return { data: this.data, total: this.total, pageNo: this.pageNo, pageSize: this.pageSize, url: this.url }
    },
    getTableParam(param) {
      this.data = param.data
      this.total = param.total
      this.pageNo = param.pageNo
      this.pageSize = param.pageSize
      this.url = param.url
    },
    selectionChange(val) { // 获取选中
      this.mulSelect = val
    },
    getSelect() {
      return this.mulSelect
    },
    // 打开列的刷选框(通过column组件调用)
    openDialog(prop, label) {
      this.chooseTitle = label
      this.chooseField = prop
      let opt // 存在的对象
      this.chooseOption.find(function(val, index, arr) { // 存在的字段条件
        if (val.field === prop) {
          opt = val
          return
        }
      })
      if (opt) {
        this.setCondition(opt.first, opt.other)
      } else {
        this.clearCondition()
      }
      this.chooseDialog = true
    },
    // 获取该字段的筛选条件
    setCondition(first, other) {
      this.firstLi = { // 第一个条件值
        select: first.select,
        text: first.text
      }
      this.otherLi = []
      for (const iterator of other) {
        const temp = {
          radio: iterator.radio,
          select: iterator.select,
          text: iterator.text
        }
        this.otherLi.push(temp)
      }
    },
    // 清空该字段筛选条件
    clearCondition() {
      this.firstLi = { // 第一个条件值
        select: null,
        text: null
      }
      // 其他条件值
      this.otherLi = []
    },
    addCondition() {
      this.otherLi.push({
        radio: 'and',
        select: null,
        text: null
      })
    },
    reduceCondition(index) {
      this.otherLi.splice(index, 1)
    },
    // 保存筛选
    saveChoose() {
      this.judgeConditionNull().then(() => {
        let str = ''
        str += `${this.chooseTitle} ${this.firstLi.select} ${this.firstLi.text}`
        for (const iterator of this.otherLi) {
          str += ` ${iterator.radio} ${iterator.select} ${iterator.text}`
        }
        const obj = {
          field: this.chooseField,
          label: this.chooseTitle,
          value: str,
          first: this.firstLi,
          other: this.otherLi
        }
        this.$emit('changeChooseOption', obj)
        this.$Message.success('添加成功')
        this.chooseDialog = false
      }).catch(() => {
        this.$Message.error('保存选项不能为空')
      })
    },
    /**
     * 判断筛选条件是否为空
     */
    judgeConditionNull() {
      return new Promise((resolve, reject) => {
        if (this.firstLi.select === null || this.firstLi.text === null) reject()
        for (const iterator of this.otherLi) {
          if (iterator.select === null || iterator.text === null) reject()
        }
        resolve()
      })
    }
  }
}
</script>

<style scope>
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .ul-condition{
    margin:0 auto;
    width: 450px;
  }
  .ul-condition li{
    margin-top:10px;
  }
  .input-condition{
    width:155px;
  }
</style>
