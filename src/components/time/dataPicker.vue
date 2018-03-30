<style lang="less">
@primary-color: #FDA729;
.home-calendar-section {
  background: #fff;
  .header{
    line-height: 60px;
    padding: 0 30px;
    position: relative;
    border-bottom: 1px solid #eee;
    .current-date {
      font-weight: 500;
      padding: 0 10px;
    }
    .middle-right{
      right: 30px;
    }
    .today{
      width: 54px;
      height: 20px;
      padding: 0;
      line-height: 18px;
    }
  }
}
.calendar-grid-section {
  position: relative;
  background-color: #fff;
  margin-bottom: 20px;
  float: left;
  width: 315px;
  .header{
    line-height: 68px;
    border: none;
  }
  .calendar-body{
    padding: 0 20px;
    margin-top: -10px;
  }
  .mark-unit() {
    background-repeat: no-repeat;
    background-position: 50% 72%;
    background-size: 100% auto;
  }

  .calendar-row {
    span {
      width: 14%;
      display: inline-block;
      height: 42px;
      line-height: 42px;
      text-align: center;
      position: relative;
      font-size: 14px;
      &.today i{
        .mark-unit;
        background: #eee;
        //color: @primary-color !important;
      }
      &.marked::after {
        content: ' ';
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background: @primary-color;
        display: inline-block;
        top: 31px;
        left: 50%;
        transform: translate(-50%);
        position: absolute;
      }
      i {
        display: inline-block;
        height: 32px;
        width: 32px;
        margin: 1px auto 0;
        line-height: 30px;
        border-radius: 50%;
      }
    }
  }
  .calendar-row:first-child {
    font-size: 0.9em;

  }
  .calendar-row:not(:first-child) {
    color: #d3d3d3;
    span {
      cursor: pointer;
      &.selected i, &:hover i {
        .mark-unit;
        // background-image: url("/src/images/svg/calendar-outline.svg");
        background: @primary-color;
        border-radius: 50%;
        color: #FFF !important;
      }
    }
    i {
      font-style: normal;
    }
  }
}
</style>

<template>
<div class="home-calendar-section clear-after">
  <div>选中的日期：{{selectedDates}}</div>
  <div class="calendar-grid-section">
    <div class="header">
      <a class="gray-color" @click="changeMonth(-1)"><i class="icon-left"></i></a>
      <span class="current-date">{{month}}</span>
      <a class="gray-color" @click="changeMonth(1)"><i class="icon-right"></i></a>
      <button class="h-btn today" @click="changeToday">今天</button>
    </div>
    <div class="calendar-body">
      <div class="calendar-row dark3-color">
        <span v-for="h in headers" :key="h">周{{h}}</span>
      </div>
      <div v-for="days in monthDaysList" :key="days" class="calendar-row lower">
        <span @click="switchDate(day.dateStr,day.thisMonth,day.lastMonth)" v-for="day in days" :key="day" :class="{'dark-color': day.thisMonth, 'selected': selectedDateStr==day.dateStr, 'today': day.isToday, 'marked': inArray(day.dateStr, selectedDates) }">
          <i v-if="day.tip" v-tooltip :content="day.tip">{{day.text}}</i>
          <i v-else>{{day.text}}</i>
        </span>
      </div>
    </div>
  </div> 
</div>
</template>

<script>
import manba from 'manba';

manba.config({
  formatString: {
    "mn": "YYYY年M月"
  },
})
export default {
  data() {
    let deadlineAt = this.$route.query.deadlineAt;
    return {
      headers: ['日','一','二','三','四','五','六'],
      monthDaysList: [],
      nowMonth: manba(deadlineAt).format(),
      selectedDateStr: manba(deadlineAt).format('l'),
      nowDate: manba().startOf(manba.DAY),
      selectedDates:[],
    }
  },
  computed:{
    month(){
      return manba(this.nowMonth).format('mn');
    }
  },
  methods: {
    refreshAll(index = 0) {
      this.getAllTodos(index);
    },
    changeMonth(index) {
      this.nowDate = manba(this.nowDate).add(index, manba.MONTH);
      this.refreshAll(index);
    },
    changeToday(){
      this.nowDate = manba().startOf(manba.DAY);
      this.refreshAll(0);
    },
    switchDate:async function(dateStr,thisMonth,lastMonth) {
      if(thisMonth==false){
        if(lastMonth==true){
          await this.getAllTodos(-1);
        }else{
          await this.getAllTodos(1);
        }
      }
      this.selectedDateStr = dateStr;
      this.toggleValue(this.selectedDates, dateStr);
    },
    getAllTodos:async function (offset) {
      const that = this;
      //  parent -> child: todo/home might trigger the getAllTodos to switch month
      if((offset == 1 || offset == -1)) {
        this.nowMonth = manba(this.nowMonth).add(offset, manba.MONTH).format();
        this.monthDaysList = this.getMonthDays(this.nowMonth);
        this.selectedDateStr = manba(this.nowMonth).format('l');
      }
      else if(offset == 0){ //切回今天
        this.nowMonth = manba().format();
        this.monthDaysList = this.getMonthDays(this.nowMonth);
        this.selectedDateStr = manba(this.nowMonth).format('l');
      }
      let startedAt = this.monthDaysList[0][0]['date'].toISOString();
      let endedAt = this.monthDaysList[this.monthDaysList.length - 1][6]['date'].add(1, manba.DAY).toISOString();
    },
    getMonthDays(date) { //第一天为周日，我怕影响到其他地方，新建一个，add by caoqi
      let today = manba();
      let distance = manba(date).distance(manba(), manba.MONTH);
      if (this.isArray(distance) && distance.length) {
        return distance.map(d => this.getWeekDays(d));
      } else {
        distance = distance || 0;
        let firstDate = manba().add(distance, manba.MONTH).startOf(manba.MONTH);
        let lastDate = manba().add(distance, manba.MONTH).endOf(manba.MONTH);
        let firstDay = firstDate.day(); // 月首为星期几
        let lastDay = lastDate.day(); // 月尾为星期几
        let monthDays = lastDate.date(); //该月总共有多少天
        let firstGap = firstDay ; // 前补充几天
        let lastGap = lastDay == 6 ? 7 : 13 - lastDay; // // 前补充几天
        let count = firstGap + monthDays + lastGap;
        let result = [];
        for (let i = 0; i < count; i++) {
          let cursor = manba().startOf(manba.DAY).add(distance, manba.MONTH).startOf(manba.MONTH).add(-firstGap + i, manba.DAY);
          if (i % 7 == 0) {
            result.push([]);
          }
          result[result.length - 1].push({
            date: cursor,
            text: cursor.date(),
            isFuture: cursor.distance(today, manba.DAY) >= 0,
            isToday: cursor.distance(today, manba.DAY) == 0,
            dateStr: cursor.format('l'),
            hasTodo: false,
            thisMonth: (i + 1) > firstGap && (i + 1) <= monthDays + firstGap,
            lastMonth: i < firstGap,
          });
        }
        return result;
      }
    },
    isArray(input) {
      return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    },
    toggleValue(list, value) {
      if (!this.isArray(list)) return;
      if (list.includes(value)) {
        list.splice(list.indexOf(value), 1);
      } else {
        list.push(value);
      }
    },
    inArray(value, arr){
      for(let i in arr){
        if(value == arr[i]){
          return true;
        }
      }
      return false;
    }
  },
  beforeMount() {
    this.monthDaysList = this.getMonthDays(this.nowMonth);
  }
};
</script>
