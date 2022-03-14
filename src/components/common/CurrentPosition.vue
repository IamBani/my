<template>
    <div class="current-container">
    <span>当前位置：</span>
    <!-- <template v-for="(item,index) in positionArr">
      <span @click="currentClick(item)" :class="{'selected':index === (positionArr.length-1)}">{{item.name}}</span>
      <template v-if="index !== (positionArr.length-1)"> / </template>
    </template> -->

  </div>
</template>
<script>
export default {
    name:'CurrentPosition',
    data(){
        return{
        
        }
    },
    props:{
          //  positionArr: Array
    },
    mounted(){},
    methods:{
          currentClick(item) {
        this.$router.push({path: item.path});
      }
    }

}
</script>
<style scoped lang="scss">
.current-container {
    min-width: 180px;
        // min-width: 290px;
    padding: 5px 10px;
    line-height: 30px;
    position: relative;
    z-index: 2;
    span {
      color: #999;
      cursor: pointer;
    }
    .selected {
      color: #3383fe;
    }
  }
</style>