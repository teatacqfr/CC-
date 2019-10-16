<template>
  <div class="app">
    <transition :name="transitionName">
      <router-view class="child-view" />
    </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'app',
  computed:{
    ...mapState({
      transitionName: state => state.transition.routeTransitionName
    })
  }
}
</script>

