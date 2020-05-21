<template>
    <div>
        <el-form v-if="exsit" ref="form" :model="item" :rules="rules" label-position="left" :label-width="(labelWidth?labelWidth:100)+'px'" class="baseUpdate-form" :style="formStyle">
            <slot name="firstOption"></slot>
            <template v-for="(option,prop) in options">
                <el-form-item  v-if="option.formType === 'hidden'" v-show="false"  :prop="prop" :key="prop" >
                    <el-input class="form-input" v-model="item[prop]">
                    </el-input>
                </el-form-item>
                <el-form-item  v-else-if="option.formType === 'text'" :label="option.label" :prop="prop" :key="prop">
                    <el-input class="form-input" v-model.trim="item[prop]" :style="inputStyle"
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
                <el-form-item  v-else-if="option.formType === 'textarea'" :label="option.label" :prop="prop" :key="prop" >
                    <el-input class="form-input" v-model="item[prop]" type="textarea" :style="inputStyle"
                    :maxlength="paramNumber(option['maxlength'])"  
                    :minlength="paramNumber(option['minlength'])" 
                    :placeholder="paramString(option['placeholder'])"
                    :clearable="paramBoolean(option['clearable'])!==null?paramBoolean(option['clearable']):true"
                    :disabled="paramBoolean(option['disabled'])"
                    :size="paramString(option['size'])"
                    :prefix-icon="paramString(option['prefix-icon'])"
                    :suffix-icon="paramString(option['suffix-icon'])"
                    :rows="paramNumber(option['rows'])!==null?paramNumber(option['rows']):3"
                    :autosize="paramBoolean(option['autosize'])"
                    :auto-complete="paramString(option['auto-complete'])"
                    :readonly="paramBoolean(option['readonly'])"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item v-else-if="option.formType === 'select' || option.formType === 'remoteSelect'" :label="option.label" :prop="prop" :key="prop">
                    <el-select class="form-input"  v-model="item[prop]" :style="inputStyle"
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
                    @change="(value) => paramFunctionName(paramString(option['change']),value)"
                    >
                        <el-option v-for="(text,value) in selectOptions[option.formParam]" :key="value" :label="text" :value="value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-else-if="option.formType === 'date'" :label="option.label" :prop="prop" :key="prop">
                    <el-date-picker class="form-input" v-model="item[prop]" :style="inputStyle"
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
                    :picker-options="paramObjectName(paramString(option['picker-options']))"
                    :range-separator="paramString(option['range-separator'])"
                    :value-format="paramString(option['value-format'])?paramString(option['value-format']):(paramString(option['format'])?paramString(option['format']):'yyyy-MM-dd')"
                    :unlink-panels="paramBoolean(option['unlink-panels'])"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item v-else-if="option.formType === 'selectTree'" :label="option.label" :prop="prop" :key="prop">
                     <treeselect class="form-input tree-select" :style="inputStyle"
                        v-model="item[prop]"
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
                <!-- 级联 -->
                    <el-form-item v-else-if="option.formType === 'cascader'" :label="option.label" :prop="prop" :key="prop">
                        <el-cascader class="form-input" v-model="item[prop]" :style="inputStyle"
                        :options="cascaderOptions[option.formParam]"
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
            </template>
            <slot name="lastOption"></slot>
        </el-form>
    </div>
</template>
<script>
import { getValidate } from '@/utils/validate'
import { baseRequest } from '@/api/base'
export default {
  props: {
    // 资源参数
    updateFormData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // 属性为对象或方法(以名称调用)
    elFunction: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // 输入框宽度
    inputWidth: Number,
    // label宽度
    labelWidth: Number
  },
  computed: {
    options: function() { // 表单参数
      this.exsit = false
      this.$nextTick(function() {
        this.exsit = true
      })
      return this.updateFormData.formConfig
    },
    selectOptions: function() { // 下拉选项
    let temp = this.updateFormData.selectOptions || {}
      if (typeof this.updateFormData.selectOptions === 'string') {
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
      if (this.updateFormData.cascaderOptions) {
        for (const key in this.updateFormData.cascaderOptions) {
          this.updateFormData.cascaderOptions[key] = JSON.parse(this.updateFormData.cascaderOptions[key])
        }
      }
      return this.updateFormData.cascaderOptions
    },
    item: function() { // 表单参数
      for (const key in this.updateFormData.formConfig) {
        if (this.updateFormData.item.hasOwnProperty(key)) {
          if (this.updateFormData.formConfig[key].multiple === 'true' || this.updateFormData.formConfig[key].formType === 'cascader' || this.updateFormData.formConfig[key].formType === 'selectTree') {
            if (typeof this.updateFormData.item[key] === 'object') {
              continue
            } else if (typeof this.updateFormData.item[key] === 'string') {
              this.updateFormData.item[key] = this.updateFormData.item[key].split(',')
            } else {
              this.updateFormData.item[key] = []
            }
          } else {
            this.updateFormData.item[key] = this.updateFormData.item[key] !== null ? this.updateFormData.item[key] + '' : null
          }
        } else {
          if (this.updateFormData.formConfig[key].multiple === 'true' || this.updateFormData.formConfig[key].formType === 'cascader' || this.updateFormData.formConfig[key].formType === 'selectTree') {
            this.data[key] = []
          }
        }
      }
      return this.updateFormData.item
    },
    errorMsg: function() { // 错误信息
      const obj = {}
      for (const key in this.updateFormData.item) {
        obj[key] = ''
      }
      return obj
    },
    formData: function() { // 值
      const data = {}
      for (const key in this.options) {
        data[key] = this.item[key] ? this.item[key] : (this.data[key] ? this.data[key] : null)
      }
      return data
    },
    // 输入框样式
    inputStyle: function() {
      let style = {}
      if (Number.isFinite(this.inputWidth)) {
        style = { width: this.inputWidth + 'px' }
      }
      return style
    },
    // form居中
    formStyle: function() {
      let style = {}
      if (Number.isFinite(this.inputWidth) || Number.isFinite(this.labelWidth)) {
        let width = 0
        if (Number.isFinite(this.inputWidth)) {
          width = 125 + (this.inputWidth - 125) / 2
        } else {
          width = 125
        }
        if (Number.isFinite(this.labelWidth)) {
          width = width + (this.labelWidth - 100) / 2
        }
        style = { marginLeft: `calc(50% - ${width}px)` }
      }
      return style
    },
    rules: function() { // 表单基本属性验证规则
      let validate = {}
      if (this.updateFormData.validator) {
        if (typeof (this.updateFormData.validator) === 'string') {
          validate = JSON.parse(this.updateFormData.validator)
        } else {
          validate = this.updateFormData.validator
        }
      }
      const rules = {}
      for (const name in this.updateFormData.formConfig) {
        rules[name] = []
        if (validate.hasOwnProperty(name)) {
          for (const key in validate[name]) {
            rules[name].push(getValidate(key, validate[name][key]))
          }
        }
        rules[name].push(
          {
            validator: (rule, value, callback) => {
              if (this.errorMsg[name]) {
                callback(new Error(this.errorMsg[name]))
              } else {
                callback()
              }
            }
          }
        )
      }
      return rules
    }
  },
  data() {
    return {
      data: {},
      exsit: true
    }
  },
  methods: {
    // 获取表单参数 并验证
    getFormData() {
      return this.formData
    },
    // 发送保存请求
    saveRequest(url, param) {
      param = param || this.getFormData()
      return new Promise((resove, reject) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            baseRequest(url, param).then((response) => {
              if (response.code === 2) {
                const validateMsg = response.data.validateMsg
                for (const key in validateMsg) {
                  if (this.options.hasOwnProperty(key)) {
                    this.errorMsg[key] = validateMsg[key]
                    this.$refs.form.validateField(key)
                    this.errorMsg[key] = ''
                  }
                }
                reject(validateMsg)
              } else {
                resove()
              }
            })
          } else {
            reject()
          }
        })
      })
    },
    // 重置表单
    resetForm() {
      for (const x in this.options) {
        this.options[x].default = null
        if (this.options[x].defaultRange) {
          this.options[x].defaultRange = null
        }
      }
    },
    clearValidate() {
      this.$refs.form.clearValidate()
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
    paramObjectName(name) { // 根据对象名找对象
      if (name) {
        return this.elFunction[name]
      } else {
        return null
      }
    },
    paramFunctionName(name, value) { // 根据对象名找对象
      if (name && this.elFunction[name]) {
        this.elFunction[name](value)
      }
    }
    // paramObjectName(name, prop) { // 根据对象名找对象
    //   const options = {
    //     // 设置选择今天以及今天之后的日期
    //     afterToday: {
    //       disabledDate(time) {
    //         return time.getTime() < Date.now() - 8.64e7
    //       }
    //     },
    //     // 设置选择今天以及今天以前的日期
    //     breforeToday: {
    //       disabledDate(time) {
    //         return time.getTime() > Date.now() - 8.64e6
    //       }
    //     },
    //     // 设置选择今天之后的日期（不能选择当天时间）
    //     afterTodayN: {
    //       disabledDate(time) {
    //         return time.getTime() < Date.now()
    //       }
    //     },
    //     // 设置选择今天之前的日期（不能选择当天）
    //     beforeTodayN: {
    //       disabledDate(time) {
    //         return time.getTime() > Date.now()
    //       }
    //     },
    //     // 限制开始日期不能大于结束日期
    //     maxDateRange: {
    //       disabledDate: (time) => {
    //         if (prop && prop !== '') {
    //           var date = new Date(prop).getTime()
    //           return time.getTime() > date
    //         }
    //       }
    //     },
    //     // 限制结束日期不能大于开始日期
    //     minDateRange: {
    //       disabledDate: (time) => {
    //         if (prop && prop !== '') {
    //           var date = new Date(prop).getTime()
    //           return time.getTime() < date
    //         }
    //       }
    //     }
    //   }
    //   return options[name]
    // }
  }
}
</script>
<style lang="scss">
.form-input.tree-select{
  width: 155px;
  line-height: 18px;
}
</style>


