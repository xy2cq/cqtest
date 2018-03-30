<style lang="less">
.navigation-div{
	>div{
		height: 500px;
		width: 60%
	}
	.list0{
		background: #333;
	}
	.list1{
		background: #666;
	}
	.list2{
		background: #999;
	}
	.list3{
		background: #ccc;
	}
	.list4{
		background: #eee;
	}
}
.right-navigation{
	position: fixed;
	right: 20px;
	bottom: 200px;
	li{
		display: block;
		cursor: pointer;
		line-height: 30px;
		&.active,&:hover{
			background: #ccc;
		}
	}
}
</style>
<template>
	<div class="navigation-div">
		<div v-for="(item,index) in navigation" :class="['list'+index]" :id="item.key">
				{{item.name}}
		</div>
		<ul class="right-navigation">
			<li v-for="item in navigation" @click="goToList(item.key)" :class="{'active':navigationSelected==item.key}">
				{{item.name}}
			</li>
		</ul>
	</div>
</template>
<script>
import cqtest from "cqtest";
import ScrollIntoView from '../../js/plugin/scrollIntoView';
export default {
	data(){
		return {
			navigation:[
        {
          key:'basicinfo',
          name: '基本信息'
        },
        {
          key:'jobintension',
          name: '求职意向'
        },
        {
          key:'educationexp',
          name: '教育经历'
        },
        {
          key:'workexp',
          name: '工作经历'
        },
        {
          key:'skills',
          name: '技能与语言'
        },
      ],
      navigationSelected:'basicinfo'
		}
	},
	mounted(){
    const that = this;
    document.querySelector(`#app`).onscroll = function(){
      let documentScrollTop = document.querySelector(`#app`).scrollTop;
      for(let item of that.navigation){
        let domScrollTop = that.$el.querySelector(`#${item.key}`).offsetTop;
        let domHeight = that.$el.querySelector(`#${item.key}`).offsetHeight;
        if((domScrollTop + domHeight) > documentScrollTop){
          that.navigationSelected = item.key;
          return false;
        }       
      };
    }
  },
	methods: {
    goToList(key) {
      let dom = this.$el.querySelector(`#${key}`);
      ScrollIntoView(dom, {time: 300, align: {top:0, topOffset: 10}});
      this.navigationSelected  = key;
    },
  }
}
</script>
