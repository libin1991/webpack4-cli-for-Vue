<template>
    <div class="wrap">
        <div>
            <router-link to="/vuexDemo">Go Vuex Demo</router-link>
        </div>
        <h1 :title="x">Vue文档练习</h1>
        <!-- 声明式渲染 -->
        <h2 v-once>不变的计数器 : {{ a }}</h2>
        <h2>计数器 : {{ a }}</h2>
        <h2>我的值永远比计数器值多一 : {{ b }}</h2>
        <!-- 事件绑定 -->
        <button @click="addOne">按我加1</button> <br>
        <button @click="minusOne">按我减1</button> <br>
        <!-- 条件渲染 -->
        <h2 v-if='seen'>如果我能看得见</h2>
        <button @click="toggleShow">切换显示</button> <br>
        <!-- 循环渲染 -->
        <h2>学生信息统计：</h2>
        <ul>
            <li 
                v-for="e of arrayData"
                :key="e.id"
            >
                {{ `${ e.name }的学号是${ e.id },来自${ e.from }` }}
            </li>
        </ul>
        <button @click="deleteArr">删除数组数据</button>
        <button @click="setArray">添加数组数据</button>
        <!-- 表单和数据双向绑定 -->
        <h2>{{ msg }}</h2>
        <input type="text" v-model="msg">
        <br>
        <!-- 输出Html -->
        <h2>输出html : </h2>
        <h2>Using mustaches: {{ rawHtml }}</h2>
        <h2>Using v-html directive: <span v-html="rawHtml"></span></h2>
        <!-- html特性绑定 -->
        <h2 :title="`大声唱${title}`">鼠标移到我身上看看效果</h2>

        <h1 class="wheel" ref="wheel" @wheel="handleWheel">鼠标滚轮事件测试</h1>
        <div class="xxx" @wheel.prevent="handleWheel2" ref="baba">
            <div class="container" :style="{ marginLeft: left + 'px' }" ref="zzz">
                <div v-for="(e,i) of newArr" :key="i" ref="wheel2">
                    <!-- <span> -->
                        {{ e.name }}
                    <!-- </span> -->
                </div>
            </div>
            <div class="line"></div>
        </div>
        
        <br>
        <button @click="addBread">添加面包屑</button>
        <br>
        <button @click="removeBread">移除面包屑</button>
        
        <div class="xxx" @wheel.prevent="handleWheel2" ref="baba">
            <div class="container" :style="{ marginLeft: ml + 'px' }">
                <div> A </div>
                <div> B </div>
                <div> C</div>
                <div> D </div>
                <div ref="qwer">
                    offsetLeft测试
                </div>
            </div>
            <div class="line"></div>
        </div>
        <br>
        ml:<input type="text" v-model="ml">
        ol:<input type="text" v-model="ol">
        <br>
        <button @click="qwer">获取这个qwer元素属性</button>
    </div>
</template>

<script>
export default {
    /* 子组件，用之前需要导入 */
    components: {}, 

    mounted () {
        
    },

    /* 数据中心 */
    data () {
        return {
            x : 'hello',
            a : 0,
            seen : false,
            arrayData : [],
            msg : 'Hello',
            rawHtml : '<span style="color: red">This should be red</span>',
            title: 'lalala~',
            newArr: [],
            left: 0,
            leftWidth: 0,
            rightWidth: 0,
            totalWidth: 0, 
            ml: 0,
            ol: '',
        }
    },

    /* 计算属性: 适用于一个数据的值依赖于另一个数据的情况，对于任何复杂逻辑，你都应当使用计算属性 */
    computed: {
        /* 数据关系: b 始终等于 a+1 */
        b: function () {
            return this.a + 1
        }
    },

    /* 数据监测，在watch里面登记过的数据每当发生变化时，会执行相应的代码 */
    watch : {
        /**
         * 监测目标： c
         * 参数： newValue = c更新后的值 oldValue = c更新前的值
         * 说明：
         *  监测数据c的状态，每当c发生变化都会发布一条名为cHasChaned的消息(消息里面包含一些数据)
         *所有订阅了该消息的组件都可以访问到消息里面携带的数据
        */
        c: function (newValue,oldValue) {
            // emit一条消息，参数为一个对象
            this.$eventHub.$emit('cHasChaned', {
                new : newValue,
                old : oldValue
            })
            // 用on接收消息 this.$eventHub.$on('cHasChaned', msg => {})
            
        }
    },    

    /* 方法 */
    methods: {
        setArray () {
                // { name: '小明', id: '001', from: '徐汇' },
                // { name: '小花', id: '002', from: '静安' },
                // { name: '小华', id: '003', from: '黄埔' },
          this.arrayData.push({ name: '小明', id: '001', from: '徐汇' })
        },
        addOne () {
            console.log('add')
            this.a++
        },
        minusOne () {
            console.log(12345)
            this.a--
        },
        deleteArr () {
            // this.$delete(this.data, 1)
            this.arrayData.splice(0,1)
        },
        toggleShow () {
            this.seen = !this.seen
        },
        handleWheel (e) {
            const obj = this.$refs.wheel

            console.log(`鼠标滚轮测试: ${obj.offsetWidth}`)
        },
        addBread (e) {
            const sumWidth = this.$refs.baba.offsetWidth
            const leftWidth = this.$refs.zzz.offsetWidth
            let offset = leftWidth - sumWidth
            console.log('宽度为：', sumWidth)
            console.log(`
                sumWidth = ${sumWidth}
                leftWidth = ${leftWidth}
                offset = ${offset}
            `)

            this.newArr.push({ name: '大众出行', id: '001'})

            // this.left -= leftWidth >= sumWidth && 70 
        },
        removeBread (e) {
            this.newArr.splice(0,1)
        },
        handleWheel2 (e) {
            let sign = e.wheelDelta // 鼠标滚轮向上还是向下滚动的标志
            // const offset = this.$refs.wheel2[0].offsetWidth // 设定一个偏移量
            const offset = 15 // 设定一个偏移量
            if (sign > 0) {
                this.left -= offset
            } else {
                this.left += offset
            }
            // const obj = this.$refs.wheel2[0]
            // const offset = 70
            // console.log(`鼠标的滚轮事件e = ${e}`)
            // // console.log(`这个ref = ${obj.offsetWidth}`)
            // this.left -= offset
            // console.log(e.wheelDelta)
            // this.$refs.zzz.scrollLeft -= 70
        },
        qwer (e) {
            const obj = this.$refs.qwer
            console.log(`obj =`, obj)
            console.log(`obj的offsetLeft = ${obj.offsetLeft}`)
            this.ol = obj.offsetLeft
        }
    }   
    

}
</script>

<style lang="less" scoped>
    .wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        >button {
            padding: 15px 30px;
            border-radius: 8px;
            cursor: pointer;
        }
        >input {
            width: 280px;
            height: 35px;
            font-size: 20px;
        }
        >.wheel {
            width: 500px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background-color: palevioletred;
        }
        >.xxx {
            position: relative;
            width: 1000px;
            height: 40px;
            background-color: palegoldenrod;
            display: flex;
            .container {
                border: 1px solid black;
                align-self: center;
                display: flex;
                >div {
                    height: 25px;
                    line-height: 25px;
                    padding: 5px;
                    margin: 5px;
                    background-color: palevioletred;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
            .line {
                flex: 1;
                height: 1px;
                background-color: #000;
                align-self: center;
            }
        }
        
        
    }
</style>
