<style lang="less">
.locationfilter-dialog {
  width: 730px;
  max-height: calc(~"100vh - 120px");
  .content{
    padding: 60px 50px 42px;
    text-align: center;
    display:flex;    
    flex-direction: column;
    max-height: calc(~"100vh - 170px");
    .h-icon-search{
      right: 21px;
      left: auto;
      font-size: 24px;
      color: #fff;
      cursor: pointer;
    }
    .h-autocomplete{      
      display: inline-block;      
      width:430px;
      height:40px;
      float:left;
      &.focusing{
        box-shadow: none;
      }
    }
    .h-autocomplete-show{
      transition: 1s;
      padding: 0;
      border-radius: 4px 0 0 4px;      
      box-sizing: border-box;
      input{
        height: 38px;
        border-radius: 4px 0 0 4px;
        font-size: 16px;
        padding:0;
        padding-left: 15px;
        margin: 0;
        border: none;
        &:focus{
          box-shadow: none;
        }
      }    
      &.focusing{
        box-shadow: none;
      }
    }
    .auto-btn{
      float:left;
      width:70px;
      height:40px; 
      border-radius: 0 4px 4px 0;
      background: #fb151e;
      color: #FFF;
      box-shadow: none;
      border:none;
      box-sizing: border-box;
    }
  }  
  .filter-content{
    flex:1;
    overflow:auto;
  }
  // .has-choices{
  // }
  .province-item-list {
    position: relative;
    transition: all .2s ease;
    clear: both;
    padding: 10px 0;
    .province{
      text-align: left;
      color: #333;
      font-size: 14px;
      font-family:PingFangSC-Medium;
      line-height:26px;
      cursor: pointer;
    }
    .city-item-list{
      margin-left: -8px;
    }
    &.collapse {
      .expandable {
        display: none;
      }
    }
    li {
      float: left;
      color: #666;
      margin: 0 8px 0px 0;
      line-height: 28px;
      border-radius: 2px;
      cursor: pointer;
      font-size: 14px;
      > p {
        padding: 0 8px;
      }
      &:hover, &.selected {
        color: #FB151E;
      }
      ul {
        display: none;
        position: absolute;
        background: #fff;
        z-index: 1;
        padding: 5px 5px 6px;
        left: 0;
        right: 20px;
        margin-top: 5px;
        border-radius: 4px;
        border: 1px solid #d4d4d4;
        li {
          padding: 0 10px;
        }
        span{
          border-left: 1px solid #d4d4d4;
          border-top: 1px solid #d4d4d4;
          background: #fff;
          position: absolute;
          width: 10px;
          height: 10px;
          transform: rotate(45deg);
          top: -6px;
        }
      }
      // &:hover ul {
      //   display: block;
      //   color: #000;
      // }
    }
  }
  .choice-item-list{
    clear: both;
    text-align: left;
    font-size: 14px;
    color: #999;
    display: inline-block;
    .filter-label{
      float: left;
      padding:6px 10px 6px 0;
      display: inline-block;
      width: 58px;
    }
  }
  .h-btn{
    width: 130px;
    height: 42px;
  }
  .selected-filters {
    color: #666;
    padding-top: 4px;
    padding-left: 8px;
    display: inline-block;
    width: 560px;
    .filtered-item {
      position: relative;
      float: left;
      font-size: 13px;
      line-height: 20px;
      padding: 0 30px 0 10px;
      border: 1px solid #BDBDBD;
      margin: 0 8px 5px 0;
      background: #fff;
      &:hover {
        border-color: #333;
        i {
          background: #333;
        }
      }
      i {
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        line-height: 20px;
        color: #fff;
        text-align: center;
        background: #BDBDBD;
        cursor: pointer;
      }
    }
    .clear-btn {
      float: left;
      color: #FB151E;
      line-height: 22px;
      margin-left: 10px;
      cursor: pointer;
      i {
        margin-right: 7px;
      }
    }
  }
  .ps-babe .underline, .no-result .underline{
    text-decoration: underline;
    color: #333;
    cursor: pointer;
    &:hover{
      color: #fb151e;
    }
  }
  .locationfilter-popup{
    .h-notify-container{
      margin-bottom: 0;
    }
  }
}
</style>

<template>
<div class="locationfilter-dialog">
  <div class="content">
    <div style="width:500px;margin:0 auto;">
      <AutoComplete :option="LocationParam" v-model="keyword" placeholder="城市名" @change="addFilter(keyword)" :mustMatch=false></AutoComplete><button class="auto-btn">搜索</button>
    </div>
    <div class="height20">&nbsp;</div>
    <div class="choice-item-list" v-if="filterParam.locationCode.length">
      <span class="filter-label">已选择</span>
      <div class="selected-filters">      
        <span class="filtered-item" v-for="code in filterParam.locationCode" :key="code">{{code | getlocation2}}<i class="h-icon-close" @click="changeFilter('locationCode', code)">X</i></span>        
        <span class="clear-btn" @click="resetFilter"><i class="h-icon-trash"></i>清空</span>
      </div>
    </div>
    <div class="filter-content" :class="{'has-choices':filterParam.locationCode.length}">
      <div class="province-item-list">
        <p class="province">常用城市</p>
        <ul class="city-item-list clear">
          <li v-for="(loc,index) in hotlocation" :key="loc.location.code" :class="{'selected':inArray(loc.location.code, filterParam.locationCode)}" v-if="index<13">
            <p @click.stop="changeFilterByHot(loc.location.code, loc.districts)">{{loc.location.shortName}}</p>
          </li>
        </ul>
      </div>
      <div v-for="(item, index) in locationFilter" class="province-item-list" :class="['province-'+index]" :key="item.province.code">
        <p class="province"><span @click.stop="removeFilter(item.province.code)">{{item.province.shortName}}</span></p>
        <ul class="city-item-list clear">
          <li v-if="item.province.code!=-1" :class="{'selected':inArray(item.province.code, filterParam.locationCode)}" @click="removeFilter(item.province.code)"><p>不限</p></li>
          <li class="fatherli" v-for="loc in item.city" :key="loc.location.code" :class="{'selected':inArray(loc.location.code, filterParam.locationCode)}" v-if="loc.location.code!=item.province.code">
            <p @click.stop="changeFilter('locationCode',loc.location.code, true, loc.districts, index, $event)">{{loc.location.shortName}}</p>
            <ul v-if="loc.districts.length" class="location-childul">
              <li :class="{'selected':inArray(loc.location.code, filterParam.locationCode)}" @click.stop="changeFilter('locationCode', loc.location.code, false, loc.districts, $event)">不限</li>
              <li v-for="sub in loc.districts" :class="{'selected':inArray(sub.code,filterParam.locationCode)}" @click.stop="changeFilter('locationCode', sub.code, false, loc.location.code, $event)" :key="sub.code">{{sub.shortName}}</li>
              <span>&nbsp;</span>
            </ul>
          </li>
          <li v-if="item.city[0].location.code==item.province.code&&item.city[0].districts.length" v-for="sub in item.city[0].districts" :class="{'selected':inArray(sub.code,filterParam.locationCode)}" :key="sub.code">
            <p @click.stop="changeFilter('locationCode', sub.code, false, item.city[0].location.code, $event)">{{sub.shortName}}</p>
          </li>          
        </ul>
      </div>
    </div>    
    <div class="height20">&nbsp;</div>
    <div class="height10">&nbsp;</div>
    <div>
      <Button @click="cancelChoose">取消</Button>
      <Button class="h-btn-primary" style="margin-left:42px;" @click="getProjects">确定</Button>
    </div>
  </div>
</div>
</template>

<script>
import locationDict from "../../dict/location.json";

export default {
  data() {
    let params = {
        filterParam:{
            locationCode:[],
        },
        hotlocation:[],
        locations:[
            310000,110000,320500,310101,330100,440100,310110,320400,320505,840,420100,410100,140300,120000,310109,310104,659004504,510115,510100,440300,440104,430200,430100,350200,331100,330200,321000,320582,320501,140823,140621,140424,140000,131100,130200,130100,120105,110228,203
        ],
    }
    return {
      params: params,
      keyword: '',
      searchkey: '',
      loading: false,
      filterParam: {
        locationCode:[],
      },
      hotlocation: [],
      locations:[],
      locationFilter: [],
      list: [],
      LocationParam:{
        loadData: this.getLocation,
        keyName: 'shortName',
        titleName: 'shortName',
      },
      allLocation: [],
      mustMatch:false,
    }
  },
  created() {
    this.getLocationDict();
    this.initLocation();
    this.initProvice();
  },
  watch: {
  },
  methods: {
    getLocationDict(){
      let LOCATIONS = {
        ARR: [],
        OBJ: {}
      }
      const deepLoop = arr => {
        for (const item of arr) {
          if (item.children) {
            deepLoop(item.children)
          }
          const obj = {}
          for (const key in item) {
            if (key != 'children') {
              obj[key] = item[key]
            }
          }
          LOCATIONS.ARR.push(obj)
          LOCATIONS.OBJ[obj.code] = obj
        }
      }
      deepLoop(locationDict.body)
      let COUNTRIES = LOCATIONS.ARR.filter(item => item.type == 'country')
      HeyUI.addDict('LOCATIONS', LOCATIONS)
      HeyUI.addDict('COUNTRIES', COUNTRIES)
    },
    inArray(value, arr){
      return arr.some(item=>{return value==item});
    },
    initDefaultLocations(dLocations) {
      let locations = Utils.copy(dLocations)
      let overSeas = []
      const LOC = HeyUI.getDict("LOCATIONS").OBJ;
      for (let i = locations.length-1; i >= 0 ; i--) {
        let l = locations[i]
        if (LOC[l].name == '海外') {
          locations.splice(i, 1)
          continue
        }
        if (LOC[l].type == 'country' && LOC[l].name != '中国') {
          overSeas.push(...locations.splice(i, 1))
        }
      }
      locations.push(...overSeas)
      return locations
    },
    initLocation() {
      const LOC = HeyUI.getDict("LOCATIONS").OBJ;
      let locations = this.initDefaultLocations(this.params.locations);
      let countrys = [];
      let countryContain = {};

      let initOverSea = 0;
      for(let code of locations) {
        let location = Utils.copy(LOC[code]);
        this.allLocation.push(location);
        if(['country', 'province', 'city'].indexOf(location.type) > -1) {
          if (location.type == 'country' && location.name != '中国') {
            let l = Utils.getOverSeaCountry(location)
            location = l.location
            let p = l.parent
            if (!initOverSea) {
              initOverSea = 1;
              countryContain[-1] = []
              countrys.push({location: p});              
            }
          }
          if(!countryContain[code]) {
            countryContain[code] = [];
            countrys.push({
              location
            })
          }
        } else {
          let parent = Utils.getLocationParent(location);
          let pc = parent.code;
          if(!countryContain[pc]) {
            countryContain[pc] = [];
            countrys.push({
              location: parent
            })            
          };
          if(!this.allLocation.some(item => item.code==parent.code)){
            this.allLocation.push(parent);        
          }
          countryContain[pc].push(location);
        }
      }
      for(let country of countrys) {
        country.districts = countryContain[country.location.code] || [];
      }
      this.locations = countrys;
    },
    initProvice() {
      const LOC = HeyUI.getDict("LOCATIONS").OBJ
      let locations = this.initDefaultLocations(this.params.locations);
      let params = [];
      let provinceContain = [];
      for(let code of locations) {
        let province = Utils.getLocationProvince(code);
        let location = Utils.copy(LOC[code]);
        if(!provinceContain[province.code]){
          provinceContain[province.code] = [];
          params.push({
            province: province,
          })
        }
        if(!this.allLocation.some(item=>item.code==province.code)){
          this.allLocation.push(province);        
        }
      }
      for(let loc of this.locations){
        let province = Utils.getLocationProvince(loc.location.code);
        for(let item of params){
          if(item.province.code == province.code){
            if(!item.city){
              item.city=[];
            }
            item.city.push(loc);
          }
        }
      }
      this.locationFilter = params;
    },
    changeFilterByHot(code,relationcodes){
      let codes = this.filterParam['locationCode'];
      relationcodes.map(item=>{
        if(codes.indexOf(item.code)!=-1){
          codes.splice(codes.indexOf(item.code), 1);
        }
      })
      Utils.toggleValue(codes, code);
    },
    changeFilter(type,code,father,relationcodes,index,event) {
      if(father === true){
        $(".province-item-list,.fatherli").css("margin-top",0);
        $(".location-childul").css("display","none");
        let dom = $(event.currentTarget).parent().find("ul")[0];
        let height = 0;
        let left = $(event.currentTarget).position().left+$(event.currentTarget).width()/2-6; //定位小尖头
        if(dom!=undefined){
          $(dom).css('display','block');
          height = $(dom).outerHeight() + 20;
          $($(dom).find("span")[0]).css("left",left+"px");
        }

        let eventTop = $(event.currentTarget).parent().position().top;
        let lis = $(event.currentTarget).parent().parent().find(".fatherli");
        let liTop = false;
        let liTwoTop = "";
        for(let li of lis){;
          if($(li).position().top > eventTop){
            if(!liTwoTop){
              liTwoTop = $(li).position().top;
            }
            if($(li).position().top == liTwoTop){
              $(li).css("margin-top", (height-10)+"px");
            }
            liTop = true;
          }
        }
        if(liTop == false){
          if(index<this.locationFilter.length){
            if ($(".province-"+(index+1))) {
              $(".province-"+(index+1)).css("margin-top",height+"px"); 
            }
          }          
        }
      }else{
        if(Utils.isArray(relationcodes)){
          relationcodes.map(item=>{
            let codes = this.filterParam[type];
            if(codes.indexOf(item.code)!=-1){
              codes.splice(codes.indexOf(item.code), 1);
            }
          })
        }else if(Utils.isString(relationcodes)||Utils.isNumber(relationcodes)){
          let codes = this.filterParam[type];
          if(codes.indexOf(relationcodes)!=-1){
            codes.splice(codes.indexOf(relationcodes), 1);
          }
        }
      }
      
      let codes = this.filterParam[type];
      if(father===true){
        let hasChild = false;
        relationcodes.map(item=>{
          let codes = this.filterParam[type];
          if(codes.indexOf(item.code)!=-1){
            hasChild = true;
          }
        })
        if(hasChild == false){
          Utils.toggleValue(codes, code);
        }
      }else{
        Utils.toggleValue(codes, code);
      }
    },
    addFilter(keyword) {
      let code = "";
      const that =this;
      this.allLocation.map(item=>{
        if(item.shortName==keyword){
          code = item.code;
        }
      });
      let codes = this.filterParam.locationCode;
      if(code!=""){
        if (codes.some(item => item == code)) {
        } else {
          codes.push(code);
        }
      }else{
        if(keyword!=''){
          this.$Message("没找到匹配地址");
        }
      }
    },
    resetFilter() {
      this.filterParam.locationCode = [];
    },
    getLocation:function (filter, callback) {
      let params = [];
      this.allLocation.map((item,index)=>{
        if(item.shortName.indexOf(filter)!=-1){
          params.push(item);
        }
      });
      callback(params);
    },
    getProjects(){
      G.trigger("setPublicLocation",this.filterParam.locationCode);
      this.$emit("close");
    },
    cancelChoose(){
      this.$emit("close");
    },
    removeFilter(code) {
      let currentCodes = this.filterParam.locationCode;
      for (let i = currentCodes.length-1; i >= 0; i--) {
        let p = Utils.getLocationProvince(currentCodes[i])
        if (p.code == code) {
          currentCodes.splice(i, 1)
        }
      }
      currentCodes.push(code);
    },
  },
};
</script>
