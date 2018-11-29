<style lang="less">

</style>
<template>
  <div v-padding="20">
    <Menu :datas="data" className="h-menu-white" v-width="250" @click="onclick"></Menu>
  </div>
</template>
<script>
// import cqtest from "cqtest";
export default {
  data() {
    return {
      data: [
        {
          title: '滚动',
          key: 'ScrollToDom',
        }, {
          title: '地址选择器',
          key: 'localpiker',
        }, {
          title: 'rxjs',
          key: 'rxjsDemo',
        }, {
          title: 'flvjs',
          key: 'flvDemo',          
        }, {
          title: 'DataPicker',
          key: 'DataPicker',          
        }
      ]
    }
  },
  methods:{
    onclick(data) {
        this.$router.push({ name: data.key });
    }
  }
}
</script>
