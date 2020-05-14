<template>
  <Select filterable clearable v-model="dicValue">
      <Option v-for="item in dicData" :value="item.dicValue" :key="item.dicValue">{{ item.dicDisplay }}</Option>
    </Select>
</template>

<script>
  /* eslint-disable */
  import util from '@/libs/util.js';
  export default {
    name: 'CtsiDicSelect',
    model: {
      // 使用model， 这儿2个属性，prop属性说，我要将value作为该组件被使用时,v-model能取到的值，event说，我emit ‘cc’ 的时候，参数的值就是父组件v-model收到的值。
      prop: 'value',
      event: 'changeValue'
    },
    data() {
      return {
        spinShow: false,
        myDicType: this.dicType,
        dicData: []
      }
    },
    props: ['dicType', 'dicGroup', 'value'],
    computed: {
      dicValue: {
        get: function() {
          return this.value; // 将props中的value赋值给currentValue
        },
        set: function(value) {
          this.$emit('changeValue', this.value = value); // 通过$emit触发父组件
        }
      }
    },
    methods: {
      initData() {
        var vm = this;
        util.ajaxMethodWidthParams(util.baseUrl + '/api/cscpDicsByCriteria?dicType=' + this.myDicType, 'GET', {}).then(function(data) {
          vm.dicData = data;
        });
      }
    },
    created() {
      this.initData();
      util.statistic('baseComp', 'ctsi-dic-select', '');
    },
    components: {}
  }
</script>

<style>
  
</style>

