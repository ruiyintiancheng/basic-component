<template>
    <div>
      <el-table-column  v-show="false" width="1">
        </el-table-column>
        <el-table-column v-if="!otherTime && rowCheck" width=50  type="selection" align="center" fixed="left"></el-table-column>
        <el-table-column v-if="!otherTime && rowNum" width=50 label="序号" type="index" align="center" fixed="left"></el-table-column>
        <slot name="firstColumn"></slot>
        <template v-for="(column,index) in columns">
          <el-table-column   :key="index" v-if="isChecked(column['prop'])"
          :type="paramString(column['type'])"
          :index="paramString(column['index'])"
          :column-key="paramString(column['prop'])"
          :label="column.label"
          :width="paramString(column['width'])"
          :min-width="200"
          :fixed="column['fixed']==='true'?true:paramString(column['fixed'])"
          :render-header="renderHeader"
          :sort-by="paramString(column['sort-by'])"
          :resizable="paramBoolean(column['resizable'])!==null?paramBoolean(column['resizable'])!==null:true"
          :formatter="paramObjectName(column['formatter'])"
          :show-overflow-tooltip="paramBoolean(column['show-overflow-tooltip'])"
          :align="paramString(column['align'])!==null?paramString(column['align']):'center'"
          :header-align="paramString(column['header-align'])"
          :class-name="paramString(column['class-name'])"
          :label-class-name="paramString(column['label-class-name'])"
          :selectable="paramObjectName(column['selectable'])"
          :reserve-selection="paramBoolean(column['reserve-selection'])"
          :filters="paramArray(column['filters'])"
          :filter-placement="paramString(column['filter-placement'])"
          :filter-multiple="paramBoolean(column['filter-multiple'])!==null?paramBoolean(column['filter-multiple']):true"
          :filter-method="paramObjectName(column['filter-method'])"
          :filtered-value="paramArray(column['filtered-value'])"
          >
          <template slot-scope="scope">
            {{columnData(scope.row,column.prop)}}
          </template>
              <!-- <table-column v-if="column.chirdern && column.chirdern.length!==0" :columns="column.chirdern" :otherTime="true"></table-column> -->
          </el-table-column>
        </template>
        <slot name="optionColumn"></slot>
    </div>
</template>
<script>
import { deepClone } from '@/utils/index'
export default {
  name: 'tableColumn',
  props: {
    columns: Array,
    otherTime: Boolean,
    rowNum: Boolean, // 是否有序号
    rowCheck: Boolean, // 是否复选
    chooseOption: Array, // 选中筛选条件
    chooseFields: [Array, String] // 字段筛选
  },
  methods: {
    columnData(row, prop) { // 查找属性对应列表值
      let obj = deepClone(row)
      if (prop) {
        const arr = prop.split('.')
        for (const iterator of arr) {
          if (typeof (obj[iterator]) === 'string' || typeof (obj[iterator]) === 'number') {
            return obj[iterator]
          } else if (typeof (obj[iterator]) === 'object') {
            if (obj[iterator] === null) {
              return null
            } else {
              obj = obj[iterator]
            }
          } else {
            return null
          }
        }
        return obj[prop]
      } else {
        return null
      }
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
    paramSortable(data) { // 排序
      if (data) {
        if (typeof (data) === 'string') {
          if (data === 'true') {
            data = true
          } else if (data === 'false') {
            data = false
          }
        }
      } else {
        data = null
      }
      return data
    },
    paramObjectName(name) { // 根据对象名找对象
      const options = {
      }
      return options[name]
    },
    renderHeader(h, { column, $index }) {
      return h('div', { class: 'browse-condition' }, [
        h('span', { class: 'choose-current' + this.isChoose(column) }, column.label + ' '),
        h('a', {
          class: 'choose-current' + this.isChoose(column),
          on: {
            click: () => {
              this.openDialog(column)
            }
          }
        }, [
          <svg-icon icon-class='search'/>
        ]),
        h('span', {
          class: 'caret-wrapper'
        }, [
          h('i', {
            class: 'sort-caret ascending',
            on: {
              click: (e) => {
                this.sortClick(e)
              }
            }
          }),
          h('i', {
            class: 'sort-caret descending',
            on: {
              click: (e) => {
                this.sortClick(e)
              }
            }
          })
        ])
      ])
    },
    openDialog(column) {
      this.$emit('openDialog', column.columnKey, column.label)
    },
    sortClick(e) {
      const dom = e.target
      if (dom.classList.contains('current')) {
        dom.classList.remove('current')
      } else {
        for (const iterator of dom.parentNode.children) {
          iterator.classList.remove('current')
        }
        dom.classList.add('current')
      }
    },
    // 判断该字段是否被查询选中
    isChoose(column) {
      return this.chooseOption.find((val) => val.field === column.columnKey) ? ' active' : ''
    },
    // 判断该字段列是否被多选选中
    isChecked(prop) {
      return this.chooseFields.includes(prop)
    }
  }
}
</script>
<style>
.el-table .browse-condition .caret-wrapper .sort-caret.ascending.current{
  border-bottom-color:#409EFF;
}
.el-table .browse-condition .caret-wrapper .sort-caret.descending.current{
  border-top-color:#409EFF;
}
.browse-condition .choose-current.active{
  color: #409EFF;
}
.browse-table .el-table--medium th{
  padding-bottom: 0;
}
</style>


