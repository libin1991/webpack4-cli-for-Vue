<template>
    <div class="wrap">
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
                v-for="e of data"
                :key="e.id"
            >
                {{ `${ e.name }的学号是${ e.id },来自${ e.from }` }}
            </li>
        </ul>
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
        
        
    </div>
</template>

<script>
export default {
    /* 子组件，用之前需要导入 */
    components: {}, 

    /* 数据中心 */
    data () {
        return {
            x : 'hello',
            a : 0,
            seen : false,
            data : [
                { name: '小明', id: '001', from: '徐汇' },
                { name: '小花', id: '002', from: '静安' },
                { name: '小华', id: '003', from: '黄埔' },
            ],
            msg : 'Hello',
            rawHtml : '<span style="color: red">This should be red</span>',
            title: 'lalala~'
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
        addOne () {
            console.log('add')
            this.a++
        },
        minusOne () {
            console.log(12345)
            this.a--
        },
        toggleShow () {
            this.seen = !this.seen
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
        }
        >input {
            width: 280px;
            height: 35px;
            font-size: 20px;
        }
    }
</style>
