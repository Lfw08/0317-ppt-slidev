---
theme: seriph

title: 滑翔机挑战赛
info: |
class: text-center
drawings:
  persist: false
transition: view-transition
mdc: true
---

# 滑翔机挑战赛 {.inline-block.view-transition-title}
## 2024.4.09
### 高一年级 直升班

---
layout: center
---

# 参赛选手 {.inline-block.view-transition-title}

<div class="multi-column-table">
  <!-- 三个表格列容器 -->
  <div class="table-column" v-for="(chunk, index) in chunkedRows" :key="index">
    <table>
      <tr v-for="(row, rowIndex) in chunk" :key="row.id" :class="'fade-in-row'">
        <td v-for="(cell, cellIndex) in row.cells" :key="cellIndex">{{ cell }}</td>
      </tr>
    </table>
  </div>
</div>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

// 原始表格数据
const originalRows = ref([
  { id: 1, cells: ['高一1班', '李天聪', '朱溥瑶'] },
  { id: 2, cells: ['高一2班', '刘若渊', '胡继慈'] },
  { id: 3, cells: ['高一3班', '谢子衿', '张书溢'] },
  { id: 4, cells: ['高一4班', '张予轩', ''] },
  { id: 5, cells: ['高一5班', '杜嘉朋', '余锦辉'] },
  { id: 6, cells: ['高一6班', '乔婉桐', '周子皓'] },
  { id: 7, cells: ['高一7班', '许铭禹', '李欣颐'] },
  { id: 8, cells: ['高一8班', '李沐阳', '张镱霏'] },
  { id: 9, cells: ['高一9班', '张佳鑫', '温泰然'] },
  { id: 10, cells: ['高一10班', '于子钺', '暴桓安'] },
  { id: 11, cells: ['高一11班', '王语哲', '邓宇晗'] },
  { id: 12, cells: ['高一12班', '陈卓远', '俞博睿'] },
  { id: 13, cells: ['高一13班', '陈天阔', '丁佳明'] },
  { id: 14, cells: ['高一14班', '李奕乐', '张博林'] },
  { id: 15, cells: ['高一15班', '李天艺', '赖诚明'] },
  { id: 16, cells: ['直升1班', '刘晨笛', '胡可晗'] },
  { id: 17, cells: ['直升2班', '卞佳馨', '王嘉翼'] },
])

// 这一页不需要打乱
const shuffleArray = (array) => {
  
  return array
}

// 创建响应式的随机排序数据
const shuffledRows = ref([])

// 分块计算属性
const chunkedRows = computed(() => {
  const chunkSize = Math.ceil(shuffledRows.value.length / 3)
  return [
    shuffledRows.value.slice(0, chunkSize),
    shuffledRows.value.slice(chunkSize, chunkSize * 2),
    shuffledRows.value.slice(chunkSize * 2),
  ]
})

onMounted(() => {
  shuffledRows.value = shuffleArray([...originalRows.value])
  nextTick(() => {
    const rows = document.querySelectorAll('.fade-in-row')
    rows.forEach((row, index) => {
      row.style.animationDelay = `${index * 0.15}s`
    })
  })
})
</script>

<style>
.multi-column-table {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  gap: 30px; /* 列间距 */
  height: 100%; /* 使用父容器的全部高度 */
}

.table-column {
  flex: 1;
  overflow-y: auto; /* 内容过多时显示滚动条 */
  border-right: 1px solid #eee; /* 可选分隔线 */
  padding-right: 15px;
}

.table-column:last-child {
  border-right: none;
  padding-right: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  font-size: 0.9em; /* 适当缩小字体 */
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}

tr:nth-child(even) {
  background-color: #f8f8f8;
}

/* 滚动条样式 */
.table-column::-webkit-scrollbar {
  width: 2px;
}
.table-column::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 4px;
}

/* 定义淡入动画 */
.fade-in-row {
  opacity: 0;
  transform: translateY(-10px);
  animation: fadeIn 0.15s ease-in forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

---
layout: center
---

# 参赛选手(随机顺序) {.inline-block.view-transition-title}

<div class="multi-column-table">
  <!-- 三个表格列容器 -->
  <div class="table-column" v-for="(chunk, index) in chunkedRows" :key="index">
    <table>
      <tr v-for="(row, rowIndex) in chunk" :key="row.id" :class="'fade-in-row'">
        <td v-for="(cell, cellIndex) in row.cells" :key="cellIndex">{{ cell }}</td>
      </tr>
    </table>
  </div>
</div>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

// 原始表格数据
const originalRows = ref([
  { id: 1, cells: ['高一1班', '李天聪', '朱溥瑶'] },
  { id: 2, cells: ['高一2班', '刘若渊', '胡继慈'] },
  { id: 3, cells: ['高一3班', '谢子衿', '张书溢'] },
  { id: 4, cells: ['高一4班', '张予轩', ''] },
  { id: 5, cells: ['高一5班', '杜嘉朋', '余锦辉'] },
  { id: 6, cells: ['高一6班', '乔婉桐', '周子皓'] },
  { id: 7, cells: ['高一7班', '许铭禹', '李欣颐'] },
  { id: 8, cells: ['高一8班', '李沐阳', '张镱霏'] },
  { id: 9, cells: ['高一9班', '张佳鑫', '温泰然'] },
  { id: 10, cells: ['高一10班', '于子钺', '暴桓安'] },
  { id: 11, cells: ['高一11班', '王语哲', '邓宇晗'] },
  { id: 12, cells: ['高一12班', '陈卓远', '俞博睿'] },
  { id: 13, cells: ['高一13班', '陈天阔', '丁佳明'] },
  { id: 14, cells: ['高一14班', '李奕乐', '张博林'] },
  { id: 15, cells: ['高一15班', '李天艺', '赖诚明'] },
  { id: 16, cells: ['直升1班', '刘晨笛', '胡可晗'] },
  { id: 17, cells: ['直升2班', '卞佳馨', '王嘉翼'] },
])

// Fisher-Yates 洗牌算法
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// 创建响应式的随机排序数据
const shuffledRows = ref([])

// 分块计算属性
const chunkedRows = computed(() => {
  const chunkSize = Math.ceil(shuffledRows.value.length / 3)
  return [
    shuffledRows.value.slice(0, chunkSize),
    shuffledRows.value.slice(chunkSize, chunkSize * 2),
    shuffledRows.value.slice(chunkSize * 2),
  ]
})

onMounted(() => {
  shuffledRows.value = shuffleArray([...originalRows.value])
  localStorage.setItem('shuffledRows', JSON.stringify(shuffledRows.value))
  nextTick(() => {
    const rows = document.querySelectorAll('.fade-in-row')
    rows.forEach((row, index) => {
      row.style.animationDelay = `${index * 0.15}s`
    })
  })
})
</script>

<style>
.multi-column-table {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  gap: 20px; /* 列间距 */
  height: 100%; /* 使用父容器的全部高度 */
}

.table-column {
  flex: 1;
  overflow-y: auto; /* 内容过多时显示滚动条 */
  border-right: 1px solid #eee; /* 可选分隔线 */
  padding-right: 15px;
}

.table-column:last-child {
  border-right: none;
  padding-right: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  font-size: 0.9em; /* 适当缩小字体 */
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}

tr:nth-child(even) {
  background-color: #f8f8f8;
}

/* 滚动条样式 */
.table-column::-webkit-scrollbar {
  width: 6px;
}
.table-column::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 4px;
}

/* 定义淡入动画 */
.fade-in-row {
  opacity: 0;
  transform: translateY(-10px);
  animation: fadeIn 0.15s ease-in forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

