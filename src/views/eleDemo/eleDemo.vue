  <template>

    <div>

      <div style="margin-bottom: 20px;">
        <el-button
          size="small"
          @click="addTab(data)"
        >
          add tab
        </el-button>
      </div>

      <el-tabs v-model="data" type="card" closable @tab-remove="removeTab" @tab-click="handleCilck">
        <el-tab-pane
          v-for="(item) in arr"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          {{item.content}}
        </el-tab-pane>
      </el-tabs>
      
    </div>
  </template>

<script>
  export default {
    data() {
      return {
        data: '2',
        arr: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
    },
    methods: {
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.arr.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.data = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.arr;
        let activeName = this.data;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      },
      handleCilck (x, e) {
        console.log(x, e)
      }

    }
  }
</script>