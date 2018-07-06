<template>
  <div class="home">
    <!-- <h1 class="title">{{ name }}</h1> -->
    <h1>Vuex Demo</h1>
    <div class="counter">计数器: <span class="num">{{ count }}</span></div>
    <div class="counter">计数器2(比计数器1多5): <span class="num">{{ twoCount }}</span></div>
    <button class="add" @click="add1">按我加1(mutation触发)</button>
    <button class="add" @click="add1x">按我加1(action触发)</button>
    <button class="add" @click="add2">按我加2</button>
    <button class="minus" @click="minus">按我减1</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      name: 'homeView'
    }
  },
  /* 写法1： 直接使用计算属性 */
  // computed: {
  //   count () {
  //     return this.$store.state.count
  //   }
  // },

  /* 写法2： 使用mapState辅助函数简化书写过程 */
  // computed: mapState({
  //   // 箭头函数可使代码更简练
  //   count: state => state.count,
  // }),

  /* 写法3：当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组,更加简单 */
  computed: {
    ...mapState({
        count: state => state.vuexDemo.count
    }),
    ...mapGetters([
      'twoCount'
    ])
  },

  methods: {
    ...mapActions({
        actionA: 'add'  // 将 `this.actionA()` 映射为 `this.$store.dispatch('increment')`
    }),
    add1 () {
      this.$store.commit('add',1)
    },
    add1x () {
    //   this.$store.dispatch('add')
      this.actionA()
    },
    add2 () {
      this.$store.commit('add',2)
    },
    minus () {
      this.$store.commit('minus',1)
    }
  }
}
</script>

<style scoped>
  .home {
    width: 90%;
    margin: 0 auto;
    text-align: center;
  }
  .counter {
    margin: 10px 0;
    font-size: 50px;
  }
  .num {
    color: palevioletred;
  }
  button {
    width: 20%;
    height: 50px;
    border-radius: 15px;
    cursor: pointer;
  }
</style>

