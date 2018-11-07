<style lang='less'>
.test-list{
  width: 600px;
  margin: 0 auto;
  .test-item{
    margin: 10px;
    p{
      padding:5px;
    }
    input{
      width:300px;
    }
  }
}
</style>
<template>
  <div class="test-list">
    <div class="test-item">
      <Button color="red" @click="creatObservable">Observable(可观察对象)</Button>
      <Button color="red" @click="creatObservable2">Subject简写</Button>
      <Button color="red" @click="unSubscribe">取消订阅</Button>
    </div>
    <div class="test-item">
      <Button color="red" @click="promise">Promise</Button>
      <Button color="red" @click="generator">generator</Button>
    </div>
    <div class="test-item">
      <Button color="blue" @click="operator">operator(操作者)</Button>
      <Button color="green" @click="operator2">operator2(filter过滤)</Button>
    </div>    
    <div class="test-item">
      <p>change触发</p>
      <p><input id="event1" type="text"/></p>
    </div>
    <div class="test-item">
      <p>1s内只触发一次</p>
      <p><input id="event2" type="text"/></p>    
    </div>
    <div class="test-item">
      <p>1s没有变化后才触发</p>
      <p><input id="event3" type="text"/></p>    
    </div>
  </div>
</template>
<script>
import { Observable, Subject, ReplaySubject, from, of, range ,interval, fromEvent } from 'rxjs';
import { map, filter, switchMap, scan ,throttleTime ,debounceTime} from 'rxjs/operators'
export default {
  data() {
    return {
      myObservable:"",
    }
  },
  mounted() {
    this.testFromEvent();
    this.testThrottleTime();
    this.textDebounceTime();
  },
  methods: {
    creatObservable(){
      const myObservable = Observable.create(observer=>{ //创建一个被订阅对象
        observer.next('foo1');
        observer.next('foo2');     
        setTimeout(()=>{
          observer.next('foo4');    
          observer.error('error');             
          observer.complete();   
        },2000)
        observer.next('foo3'); 
      });
      const myObserver = { //创建一个订阅者
        next: value => console.log(value),
        error: value => console.log(value),
        complete: () => console.log('done')
      }
      this.myObservable = myObservable.subscribe(myObserver); //调用订阅
    },
    creatObservable2(){
      const myObservable = new Subject();
      myObservable.subscribe(value => console.log(value),value => console.log(value),value => console.log('done'));
      myObservable.next('foo');
      myObservable.next('foo2');      
      setTimeout(()=>{
        myObservable.next('foo4');    
        myObservable.error('error');             
        myObservable.complete();   
      },2000);
      myObservable.next('foo3');       
    },
    unSubscribe(){
      this.myObservable.unsubscribe();
    },
    promise(){
      const myPromise = new Promise(
        function(resolve,reject){
          let a = 1;
          if(a==1){
            resolve('resolve');
          }else{
            reject('reject')
          }
        }
      );  
      myPromise.then(function(value){
        console.log(value);
      }); 
    },
    generator(){
      function* foo(){
        yield console.log('foo');
        yield console.log('foo2');
        yield console.log('foo3');
        yield console.log('foo4'); 
      }
      let a = foo();
      a.next();
      a.next();
      a.next();
      setTimeout(()=>{
        a.next();
      },2000);
    },
    operator(){
      of(1,2,3).pipe(map(x => x + '!!!')).subscribe(x => console.log(x)); // 来自一个或多个值
      from([4,5,6]).pipe(map(x => x + '!!!')).subscribe(x => console.log(x)); // 来自数组
    },
    operator2(){
      interval(1000)
      .pipe(filter(x => x % 2 === 1), map(x => x + x))
      .subscribe(x => console.log(x));
    },
    testFromEvent(){
      var button = this.$el.querySelector('#event1');
      fromEvent(button,'keyup').subscribe(count => console.log(`Search`));
    },
    testThrottleTime(){
      var button = this.$el.querySelector('#event2');
      fromEvent(button,'keyup').pipe(throttleTime(1000)).subscribe(count => console.log(`Search2`));
    },
    textDebounceTime(){
      var button = this.$el.querySelector('#event3');
      fromEvent(button,'keyup').pipe(debounceTime(1000)).subscribe(count => console.log(`Search3`));
    }
  },
  computed: {
    
  }
}
</script>