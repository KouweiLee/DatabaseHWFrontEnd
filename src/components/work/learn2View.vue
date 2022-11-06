<template>
    <footer class="footer_guide border-1px">
        <!-- 当路由改变时，导航栏样式发生变化，判断布尔值来开启样式 -->
        <span class="guide_item" :class="{on:'/msite'===$route.path}" @click="goTo('/msite')">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </span>
        <span class="guide_item" :class="{on:'/search'===$route.path}" @click="goTo('/search')">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </span>
        <span class="guide_item" :class="{on:'/order'===$route.path}"  @click="goTo('/order')">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </span>
        <span class="guide_item" :class="{on:'/profile'===$route.path}"  @click="goTo('/profile')">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </span>
    </footer>
</template>
<script>
    export default {
        name:"learn2View",
        methods:{
            goTo(path){
                this.$router.replace(path)
            }
        }
    };
</script>