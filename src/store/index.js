import { createStore } from 'vuex'

export default createStore({
  state: {
  //数据存放的位置
	title:[],
  },
  mutations: {
	  title2(state,ti){//名字不能和actions里重复
		  state.title=ti;
	  },
  },
  actions: {
	  title(context,ti){
		  context.commit('title2',ti);
	  },
  },
  modules: {

  }
})
