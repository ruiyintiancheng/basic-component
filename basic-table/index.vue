<template>
    <div class="basic-table">
        <el-table ref="basicTable" :data="data" style="width: 100%;"  v-loading="listLoading" element-loading-text="给我一点时间"
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
        <table-column :columns="tableConfig.columns" :rowNum="rowNum" :rowCheck="rowCheck">
          <slot name="firstColumn" slot="firstColumn"></slot>
          <slot name="optionColumn" slot="optionColumn"></slot>
        </table-column>
        </el-table>
        <div v-if="pagenation" class="pagination-container">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[10,20,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
    </div>
</template>
<script>
import tableColumn from './tableColumn'
import { baseSearch } from '@/api/base'
// import getFunction from '@/views/reportManage/aa'
export default {
  props: {
    tableOption: Object, // table配置数据
    pagenation: Boolean, // 是否分页
    rowNum: Boolean, // 是否有序号
    rowCheck: Boolean, // 是否复选
    noHeight: Boolean, // 是否需要高度
    elFunction: Object,
    height: [String, Number]
  },
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
      ramdomClass: ''
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
      // this.total = null
      return new Promise((resove, reject) => {
        baseSearch(url, param).then(response => {
          this.data = response.data.item
          this.total = response.data.total
          if (!page && this.pagenation) {
            this.pageSize = response.data.pageSize
          }
          this.listLoading = false
          resove(this.data)
        }).catch(() => {
          this.listLoading = false
          reject()
        })
      })
    },
    getCurrentData() {
      return this.data
    },
    getDefaultHeight() {
      const formDom = document.querySelector('.form-search')
      const formHeight = formDom ? formDom.offsetHeight + 52 : 0
      return this.height || (this.pagenation ? this.$store.state.app.containHeight - formHeight - 130 : this.$store.state.app.containHeight - formHeight - 100)
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
    }
  }
}
</script>

