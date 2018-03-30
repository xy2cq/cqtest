import VueRouter from 'vue-router';
const Welcome = resolve => require.ensure([], require => require('../components/welcome/index.vue'), 'components');
const DataPicker = resolve => require.ensure([], require => require('../components/time/dataPicker.vue'), 'components');

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
    }]
  };

  let router = new VueRouter(routerParam);
  return router;
}

export default initRouter;
