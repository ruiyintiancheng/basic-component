<template>
    <div>
        <div class="form-search">
            <el-form ref="form" :inline="true" :model="searchData" class="demo-form-inline demo-table-expand">
                <template v-for="(option,prop) in options">
                    <!-- <br v-if="index%inputNum===0" :key="index"/> -->
                    <el-form-item  v-if="option.formType === 'hidden'" v-show="false" :key="prop" >
                      <el-input :style="{width:formWidth}" v-model="option['default']">
                      </el-input>
                    </el-form-item>
                    <div :class="'input-both-'+inputNum" :style="{minWidth:minFormWidth}" v-else-if="option.formType === 'text'"   :key="prop">
                    <el-form-item>
                        <span class="input-label">{{option.label}}</span>
                        <el-input :style="{width:formWidth}" v-model="option['default']"
                        :maxlength="paramNumber(option['maxlength'])" 
                        :minlength="paramNumber(option['minlength'])" 
                        :placeholder="paramString(option['placeholder'])"
                        :clearable="paramBoolean(option['clearable'])!==null?paramBoolean(option['clearable']):true"
                        :disabled="paramBoolean(option['disabled'])"
                        :prefix-icon="paramString(option['prefix-icon'])"
                        :suffix-icon="paramString(option['suffix-icon'])"
                        :auto-complete="paramString(option['auto-complete'])"
                        :readonly="paramBoolean(option['readonly'])"
                        :max="option['max']"
                        :min="option['min']"
                        :step="option['step']"
                        :resize="paramString(option['resize'])"
                        :autofocus="paramBoolean(option['autofocus'])"
                        :form="paramString(option['form'])"
                        :label="paramString(option['label'])"
                        :tabindex="paramString(option['tabindex'])"
                        >
                        </el-input>
                    </el-form-item>
                    </div>
                    <div :class="'input-both-'+inputNum" :style="{minWidth:minFormWidth}" v-else-if="option.formType === 'select' || option.formType === 'remoteSelect'" :key="prop">
                    <el-form-item >
                        <span class="input-label">{{option.label}}</span>
                        <el-select :style="{width:formWidth}"  v-model="option['default']"
                        :multiple="paramBoolean(option['multiple'])"
                        :disabled="paramBoolean(option['disabled'])"
                        :value-key="paramString(option['value-key'])"
                        :size="paramString(option['size'])"
                        :clearable="paramBoolean(option['clearable'])!==null?paramBoolean(option['clearable']):true"
                        :collapse-tags="paramBoolean(option['collapse-tags'])!==null?paramBoolean(option['collapse-tags']):true"
                        :multiple-limit="paramNumber(option['multiple-limit'])"
                        :auto-complete="paramString(option['auto-complete'])"
                        :placeholder="paramString(option['placeholder'])"
                        :filterable="paramBoolean(option['filterable'])!==null?paramBoolean(option['filterable']):true"
                        :allow-create="paramBoolean(option['allow-create'])"
                        :filter-method="paramString(option['filter-method'])"
                        :remote="paramBoolean(option['remote'])"
                        :remote-method="paramString(option['remote-method'])"
                        :loading="paramBoolean(option['loading'])"
                        :loading-text="paramString(option['loading-text'])"
                        :no-match-text="paramString(option['no-match-text'])"
                        :no-data-text="paramString(option['no-data-text'])"
                        :popper-class="paramString(option['popper-class'])"
                        :reserve-keyword="paramBoolean(option['reserve-keyword'])"
                        :default-first-option="paramBoolean(option['default-first-option'])"
                        :popper-append-to-body="paramBoolean(option['popper-append-to-body'])!==null?paramBoolean(option['popper-append-to-body']):true"
                        :automatic-dropdown="paramBoolean(option['automatic-dropdown'])"
                        >
                            <el-option v-for="(text,value) in selectOptions[option.formParam]" :key="value" :label="text" :value="value"></el-option>
                        </el-select>
                    </el-form-item>
                    </div>
                    <div :class="'input-both-'+inputNum"  :style="{minWidth:minFormWidth}" v-else-if="option.formType === 'date'" :key="prop">
                    <el-form-item >
                        <span class="input-label">{{option.label}}</span>
                        <el-date-picker :style="{width:formWidth}" v-model="option['default']"
                        :readonly="paramBoolean(option['readonly'])"
                        :disabled="paramBoolean(option['disabled'])"
                        :editable="paramBoolean(option['editable'])"
                        :clearable="paramBoolean(option['clearable'])!==null?paramBoolean(option['clearable']):true"
                        :placeholder="paramString(option['placeholder'])"
                        :start-placeholder="paramString(option['start-placeholder'])"
                        :end-placeholder="paramString(option['end-placeholder'])"
                        :type="paramString(option['type'])?paramString(option['type']):'date'"
                        :format="paramString(option['format'])"
                        :align="paramString(option['align'])"
                        :popper-class="paramString(option['popper-class'])"
                        :picker-options="paramObjectName(paramString(option['picker-options']))"
                        :range-separator="paramString(option['range-separator'])"
                        :value-format="paramString(option['value-format'])?paramString(option['value-format']):(paramString(option['format'])?paramString(option['format']):'yyyy-MM-dd')"
                        :unlink-panels="paramBoolean(option['unlink-panels'])"
                        >
                        </el-date-picker>
                    </el-form-item>
                    </div>
                    <div :class="'input-both-'+inputNum" :style="{minWidth:minFormWidth}" :key="prop" v-else-if="option.formType === 'textRange'">
                        <el-form-item  >
                        <span class="input-label">{{option.label}}</span>                            
                             <el-input class="form-input-range" v-model="option['default']"
                            :maxlength="paramNumber(option['maxlength'])" 
                            :minlength="paramNumber(option['minlength'])" 
                            :placeholder="paramString(option['placeholder'])"
                            :clearable="paramBoolean(option['clearable'])!==null?paramBoolean(option['clearable']):true"
                            :disabled="paramBoolean(option['disabled'])"
                            :prefix-icon="paramString(option['prefix-icon'])"
                            :suffix-icon="paramString(option['suffix-icon'])"
                            :auto-complete="paramString(option['auto-complete'])"
                            :readonly="paramBoolean(option['readonly'])"
                            :max="option['max']"
                            :min="option['min']"
                            :step="option['step']"
                            :resize="paramString(option['resize'])"
                            :autofocus="paramBoolean(option['autofocus'])"
                            :form="paramString(option['form'])"
                            :label="paramString(option['label'])"
                            :tabindex="paramString(option['tabindex'])"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <span class="input-label input-label-range">-</span> 
                             <el-input class="form-input-range" v-model="option['defaultRange']"
                            :maxlength="paramNumber(option['maxlengthRange'])" 
                            :minlength="paramNumber(option['minlengthRange'])" 
                            :placeholder="paramString(option['placeholderRange'])"
                            :clearable="paramBoolean(option['clearableRange'])!==null?paramBoolean(option['clearableRange']):true"
                            :disabled="paramBoolean(option['disabledRange'])"
                            :prefix-icon="paramString(option['prefix-iconRange'])"
                            :suffix-icon="paramString(option['suffix-iconRange'])"
                            :auto-complete="paramString(option['auto-completeRange'])"
                            :readonly="paramBoolean(option['readonlyRange'])"
                            :max="option['maxRange']"
                            :min="option['minRange']"
                            :step="option['stepRange']"
                            :resize="paramString(option['resizeRange'])"
                            :autofocus="paramBoolean(option['autofocusRange'])"
                            :form="paramString(option['formRange'])"
                            :label="paramString(option['labelRange'])"
                            :tabindex="paramString(option['tabindexRange'])"
                            ></el-input>
                        </el-form-item>
                    </div>
                    <div :class="'input-both-'+inputNum" :style="{minWidth:minFormWidth}" :key="prop" v-else-if="option.formType === 'dateRange'">
                        <el-form-item>
                            <span class="input-label">{{option.label}}</span> 
                            <el-date-picker class="form-input-range" v-model="option['default']"
                            :readonly="paramBoolean(option['readonly'])"
                            :disabled="paramBoolean(option['disabled'])"
                            :editable="paramBoolean(option['editable'])"
                            :clearable="paramBoolean(option['clearable'])!==null?paramBoolean(option['clearable']):true"
                            :placeholder="paramString(option['placeholder'])"
                            :start-placeholder="paramString(option['start-placeholder'])"
                            :end-placeholder="paramString(option['end-placeholder'])"
                            :type="paramString(option['type'])?paramString(option['type']):'date'"
                            :format="paramString(option['format'])?paramString(option['format']):'yyyy-MM-dd'"
                            :align="paramString(option['align'])"
                            :popper-class="paramString(option['popper-class'])"
                            :picker-options="paramObjectName(paramString(option['picker-options']),option['defaultRange'])"
                            :range-separator="paramString(option['range-separator'])"
                            :value-format="paramString(option['value-format'])?paramString(option['value-format']):(paramString(option['format'])?paramString(option['format']):'yyyy-MM-dd')"
                            :unlink-panels="paramBoolean(option['unlink-panels'])"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <span class="input-label input-label-range">-</span> 
                            <el-date-picker class="form-input-range" v-model="option['defaultRange']"
                            :readonly="paramBoolean(option['readonlyRange'])"
                            :disabled="paramBoolean(option['disabledRange'])"
                            :editable="paramBoolean(option['editableRange'])"
                            :clearable="paramBoolean(option['clearableRange'])!==null?paramBoolean(option['clearableRange']):true"
                            :placeholder="paramString(option['placeholderRange'])"
                            :start-placeholder="paramString(option['start-placeholderRange'])"
                            :end-placeholder="paramString(option['end-placeholderRange'])"
                            :type="paramString(option['typeRange'])?paramString(option['typeRange']):'date'"
                            :format="paramString(option['formatRange'])?paramString(option['formatRange']):'yyyy-MM-dd'"
                            :align="paramString(option['alignRange'])"
                            :popper-class="paramString(option['popper-classRange'])"
                            :picker-options="paramObjectName(paramString(option['picker-options']),option['default'])"
                            :range-separator="paramString(option['range-separatorRange'])"
                            :value-format="paramString(option['value-formatRange'])?paramString(option['value-formatRange']):(paramString(option['formatRange'])?paramString(option['formatRange']):'yyyy-MM-dd')"
                            :unlink-panels="paramBoolean(option['unlink-panelsRange'])"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <!-- 多选树 -->
                    <div :class="'input-both-'+inputNum" :style="{minWidth:minFormWidth}" v-else-if="option.formType === 'selectTree'" :key="prop">
                    <el-form-item >
                        <span class="input-label selectTreeLabel">{{option.label}}</span>
                        <treeselect :style="{width:formWidth,lineHeight:'18px',float:'right'}" 
                        v-model="option['default']"
                        :placeholder="paramString(option['placeholder'])"
                        :valueConsistsOf="paramString(option['valueConsistsOf']) || 'ALL'"
                        :defaultExpandLevel="5"
                        :clearable="false"
                        :clear-on-select="true"
                        :close-on-select="true"
                        :multiple="paramBoolean(option['multiple']) || true"
                        :limit="1"
                        :limitText="(count) => `+ ${count}`"
                        :options="cascaderOptions[option.formParam]"
                        :disabled="paramBoolean(option['disabled'])"
                        >
                        </treeselect>
                    </el-form-item>
                    </div>
                    <!-- 级联 -->
                    <div :class="'input-both-'+inputNum" :style="{minWidth:minFormWidth}" v-else-if="option.formType === 'cascader'" :key="prop">
                    <el-form-item >
                        <span class="input-label">{{option.label}}</span>
                        <el-cascader :style="{width:formWidth}"  v-model="option['default']" :options="cascaderOptions[option.formParam]"
                        :separator="paramString(option['separator'])"
                        :popper-class="paramString(option['popper-class'])"
                        :placeholder="paramString(option['placeholder'])"
                        :disabled="paramBoolean(option['disabled'])"
                        :clearable="paramBoolean(option['clearable'])!==null?paramBoolean(option['clearable']):true"
                        :expand-trigger="paramString(option['expand-trigger'])?paramString(option['expand-trigger']):'click'"
                        :show-all-levels="paramBoolean(option['show-all-levels'])!==null?paramBoolean(option['show-all-levels']):true"
                        :filterable="paramBoolean(option['filterable'])!==null?paramBoolean(option['filterable']):true"
                        :debounce="paramNumber(option['debounce'])"
                        :change-on-select="paramBoolean(option['change-on-select'])"
                        :size="paramString(option['size'])"
                        :before-filter="paramObjectName(paramString(option['before-filter']))"
                        >
                        </el-cascader>
                    </el-form-item>
                    </div>
                </template>
            </el-form>
            <slot></slot>
            <!-- <el-button @click="clickTest()"></el-button> -->
        </div>
    </div>
</template>
<script>
import { getSearchParam } from '@/utils/index'
import { baseRequest } from '@/api/base'
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: {
    Treeselect
  },
  props: {
    searchFormData: Object, // 资源参数
    inputCount: Number, // 行输入框数
    inputWidth: Number
  },
  computed: {
    inputNum: function() {
      return this.inputCount ? this.inputCount : 3
    },
    formWidth: function() {
      return this.inputWidth ? this.inputWidth + 'px' : 250 + 'px'
    },
    minFormWidth: function() {
      return this.inputWidth ? 0 : '343px'
    },
    options: function() { // 表单参数
      for (const key in this.searchFormData.formConfig) {
        this.searchFormData.formConfig[key].default = this.searchFormData.formConfig[key].default || null
      }
      return this.searchFormData.formConfig
    },
    selectOptions: function() { // 下拉选项
      let temp = this.searchFormData.selectOptions || {}
      if (typeof this.searchFormData.selectOptions === 'string') {
        temp = JSON.parse(temp)
      }
      for (const key in this.options) {
        if (this.options[key].formType === 'remoteSelect') {
          baseRequest(this.options[key].formParam).then(response => {
            temp[this.options[key].formParam] = response.data.item
            this.$forceUpdate()
          })
        }
      }
      return temp
    },
    cascaderOptions: function() { // 下拉选项
      if (this.searchFormData.cascaderOptions) {
        for (const key in this.searchFormData.cascaderOptions) {
          this.searchFormData.cascaderOptions[key] = JSON.parse(this.searchFormData.cascaderOptions[key])
        }
      }
      return this.searchFormData.cascaderOptions
    },
    searchData: function() { // 值
      // const data = {}
      // for (const key in this.options) {
      //   if (this.options[key].formType.includes('Range')) {
      //     data[key] = null
      //     data.paramConvertMap = data.paramConvertMap ? data.paramConvertMap : {}
      //     const map = data.paramConvertMap
      //     map[key + '_start'] = this.options[key].default ? this.options[key].default : null
      //     map[key + '_end'] = this.options[key].defaultRange ? this.options[key].defaultRange : null
      //   } else {
      //     data[key] = this.options[key].default ? this.options[key].default : null
      //   }
      // }
      return getSearchParam(this.options)
    }
  },
  methods: {
    clickTest() {
      console.log(this.searchData)
    },
    searchParam() {
      return this.searchData
    },
    resetForm() {
      for (const x in this.options) {
        this.options[x].default = null
        if (this.options[x].defaultRange) {
          this.options[x].defaultRange = null
        }
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
    paramObjectName(name, prop) { // 根据对象名找对象
      const options = {
        // 设置选择今天以及今天之后的日期
        afterToday: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        // 设置选择今天以及今天以前的日期
        breforeToday: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },
        // 设置选择今天之后的日期（不能选择当天时间）
        afterTodayN: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          }
        },
        // 设置选择今天之前的日期（不能选择当天）
        beforeTodayN: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        // 限制开始日期不能大于结束日期
        maxDateRange: {
          disabledDate: (time) => {
            if (prop && prop !== '') {
              var date = new Date(prop).getTime()
              return time.getTime() > date
            }
          }
        },
        // 限制结束日期不能大于开始日期
        minDateRange: {
          disabledDate: (time) => {
            if (prop && prop !== '') {
              var date = new Date(prop).getTime()
              return time.getTime() < date
            }
          }
        }
      }
      return options[name]
    }
  }
}
</script>