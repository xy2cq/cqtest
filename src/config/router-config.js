import VueRouter from 'vue-router';
const Welcome = resolve => require.ensure([], require => require('../components/welcome/welcome.vue'), 'components');
const DataPicker = resolve => require.ensure([], require => require('../components/time/dataPicker.vue'), 'components');
const Test = resolve => require.ensure([], require => require('../components/test/test.vue'), 'components');
const LocalPicker = resolve => require.ensure([], require => require('../components/localpicker/index.vue'), 'components');
const rxjsDemo = resolve => require.ensure([], require => require('../components/rxjsdemo/index.vue'), 'components');
const initRouter = ()=>{
  const routerParam = {
    mode: 'history',
    routes: [{
      path: '/',
      name: 'home',
      component: Welcome
    },{
      path: '/dataPicker',
      name: 'dataPicker',
      component: DataPicker
    },{
      path: '/test',
      name: 'test',
      component: Test
    },{
      path: '/localpicker',
      name: 'localPicker',
      component: LocalPicker
    }, {
      path: '/rxjs',
      name: 'rxjsDemo',
      component: rxjsDemo
    }]
  };

  let router = new VueRouter(routerParam);
  return router;
}

export default initRouter;
