---
theme: unicorn

title: 滑翔机挑战赛
info: |
class: text-center
drawings:
  persist: false
transition: view-transition
mdc: true
---

# 滑翔机挑战赛 {.inline-block.view-transition-title}
## 2025.4.10
### 高二年级

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute"
></iframe>



---
layout: center
---

# 参赛选手 {.inline-block.view-transition-title}


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
  { id: 1, cells: ['高二1班', '周子珺', '蔺一铭'] },
  { id: 2, cells: ['高二2班', '徐上', '周新洋'] },
  { id: 3, cells: ['高二3班', '张睿达', '张迅宁'] },
  { id: 4, cells: ['高二4班', '王曦乐', '胡婉瑄'] },
  { id: 5, cells: ['高二5班', '武成康', '张天泽'] },
  { id: 6, cells: ['高二6班', '王紫云', '石轩宁'] },
  { id: 7, cells: ['高二7班', '李皓轩', '戚家绮'] },
  { id: 8, cells: ['高二8班', '单奕超', '朱钰安'] },
  { id: 9, cells: ['高二9班', '汪楠翔', ''] },
  { id: 10, cells: ['高二10班', '李晓瑜', '张佳宇'] },
  { id: 11, cells: ['高二11班', '王君赫', '贺宣壹'] },
  { id: 12, cells: ['高二12班', '李北宜', '吴亦桐'] },
  { id: 13, cells: ['高二13班', '徐子谦', '曹天泽'] },
  { id: 14, cells: ['高二14班', '杨皓晨', '蔡栩安'] },
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

---
layout: center
---

# 比赛顺序 {.inline-block.view-transition-title}


---
layout: center
---

# 比赛顺序 {.inline-block.view-transition-title}

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
  { id: 1, cells: ['高二1班', '周子珺', '蔺一铭'] },
  { id: 2, cells: ['高二2班', '徐上', '周新洋'] },
  { id: 3, cells: ['高二3班', '张睿达', '张迅宁'] },
  { id: 4, cells: ['高二4班', '王曦乐', '胡婉瑄'] },
  { id: 5, cells: ['高二5班', '武成康', '张天泽'] },
  { id: 6, cells: ['高二6班', '王紫云', '石轩宁'] },
  { id: 7, cells: ['高二7班', '李皓轩', '戚家绮'] },
  { id: 8, cells: ['高二8班', '单奕超', '朱钰安'] },
  { id: 9, cells: ['高二9班', '汪楠翔', ''] },
  { id: 10, cells: ['高二10班', '李晓瑜', '张佳宇'] },
  { id: 11, cells: ['高二11班', '王君赫', '贺宣壹'] },
  { id: 12, cells: ['高二12班', '李北宜', '吴亦桐'] },
  { id: 13, cells: ['高二13班', '徐子谦', '曹天泽'] },
  { id: 14, cells: ['高二14班', '杨皓晨', '蔡栩安'] },
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


---
layout: center
---

<script setup>
import { ref, onMounted } from 'vue'

const title = ref('')
const subtitle = ref('')

onMounted(() => {
  const storedRows = JSON.parse(localStorage.getItem('shuffledRows')) || []
  if (storedRows.length > 0) {
    const firstRow = storedRows[0]?.cells || []
    const secondRow = storedRows[1]?.cells || []
    title.value = `${firstRow[0]} - ${firstRow[1]}   ${firstRow[2]}`
    subtitle.value = `${secondRow[0]} - ${secondRow[1]}   ${secondRow[2]}`
  }
})
</script>

# {{ title }} {.inline-block.view-transition-title}
##
### Next: {{ subtitle }} {.inline-block.view-transition-subtitle}

<iframe
  src="https://lfw08.github.io"
  style="transform: scale(4);"
  class="top-145 right--28 absolute"
></iframe>

---
layout: center
---


<script setup>
import { ref, onMounted } from 'vue'

const title1 = ref('')
const subtitle1 = ref('')

onMounted(() => {
  const storedRows = JSON.parse(localStorage.getItem('shuffledRows')) || []
  if (storedRows.length > 1) {
    const firstRow = storedRows[1]?.cells || []
    const secondRow = storedRows[2]?.cells || []
    title1.value = `${firstRow[0]} - ${firstRow[1]}   ${firstRow[2]}`
    subtitle1.value = `${secondRow[0]} - ${secondRow[1]}   ${secondRow[2]}`
  }
})
</script>

# {{ title1 }}{.inline-block.view-transition-title}
##
### Next: {{ subtitle1 }} {.inline-block.view-transition-subtitle}

<iframe
  src="https://lfw08.github.io"
  style="transform: scale(4);"
  class="top-145 right--28 absolute"
></iframe>

---
layout: center
---

<script setup>
import { ref, onMounted } from 'vue'

const title2 = ref('')
const subtitle2 = ref('')

onMounted(() => {
  const storedRows = JSON.parse(localStorage.getItem('shuffledRows')) || []
  if (storedRows.length > 2) {
    const firstRow = storedRows[2]?.cells || []
    const secondRow = storedRows[3]?.cells || []
    title2.value = `${firstRow[0]} - ${firstRow[1]}   ${firstRow[2]}`
    subtitle2.value = `${secondRow[0]} - ${secondRow[1]}   ${secondRow[2]}`
  }
})
</script>

# {{ title2 }} {.inline-block.view-transition-title}
##
### Next: {{ subtitle2 }} {.inline-block.view-transition-subtitle}

<iframe
  src="https://lfw08.github.io"
  style="transform: scale(4);"
  class="top-145 right--28 absolute"
></iframe>

---
layout: center
---

<script setup>
import { ref, onMounted } from 'vue'

const title3 = ref('')
const subtitle3 = ref('')

onMounted(() => {
  const storedRows = JSON.parse(localStorage.getItem('shuffledRows')) || []
  if (storedRows.length > 3) {
    const firstRow = storedRows[3]?.cells || []
    const secondRow = storedRows[4]?.cells || []
    title3.value = `${firstRow[0]} - ${firstRow[1]}   ${firstRow[2]}`
    subtitle3.value = `${secondRow[0]} - ${secondRow[1]}   ${secondRow[2]}`
  }
})
</script>

# {{ title3 }} {.inline-block.view-transition-title}
##
### Next: {{ subtitle3 }} {.inline-block.view-transition-subtitle}

<iframe
  src="https://lfw08.github.io"
  style="transform: scale(4);"
  class="top-145 right--28 absolute"
></iframe>

---
layout: center
---

<script setup>
import { ref, onMounted } from 'vue'

const title4 = ref('')
const subtitle4 = ref('')

onMounted(() => {
  const storedRows = JSON.parse(localStorage.getItem('shuffledRows')) || []
  if (storedRows.length > 4) {
    const firstRow = storedRows[4]?.cells || []
    const secondRow = storedRows[5]?.cells || []
    title4.value = `${firstRow[0]} - ${firstRow[1]}   ${firstRow[2]}`
    subtitle4.value = `${secondRow[0]} - ${secondRow[1]}   ${secondRow[2]}`
  }
})
</script>

# {{ title4 }} {.inline-block.view-transition-title}
##
### Next: {{ subtitle4 }} {.inline-block.view-transition-subtitle}

<iframe
  src="https://lfw08.github.io"
  style="transform: scale(4);"
  class="top-145 right--28 absolute"
></iframe>

---
layout: center
---


<script setup>
import { ref, onMounted } from 'vue'

const title5 = ref('')
const subtitle5 = ref('')

onMounted(() => {
  const storedRows = JSON.parse(localStorage.getItem('shuffledRows')) || []
  if (storedRows.length > 5) {
    const firstRow = storedRows[5]?.cells || []
    const secondRow = storedRows[6]?.cells || []
    title5.value = `${firstRow[0]} - ${firstRow[1]}   ${firstRow[2]}`
    subtitle5.value = `${secondRow[0]} - ${secondRow[1]}   ${secondRow[2]}`
  }
})
</script>

# {{ title5 }} {.inline-block.view-transition-title}
##
### Next: {{ subtitle5 }} {.inline-block.view-transition-subtitle}

<iframe
  src="https://lfw08.github.io"
  style="transform: scale(4);"
  class="top-145 right--28 absolute"
></iframe>

---
layout: center
---


<script setup>
import { ref, onMounted } from 'vue'

const title6 = ref('')
const subtitle6 = ref('')

onMounted(() => {
  const storedRows = JSON.parse(localStorage.getItem('shuffledRows')) || []
  if (storedRows.length > 6) {
    const firstRow = storedRows[6]?.cells || []
    const secondRow = storedRows[7]?.cells || []
    title6.value = `${firstRow[0]} - ${firstRow[1]}   ${firstRow[2]}`
    subtitle6.value = `${secondRow[0]} - ${secondRow[1]}   ${secondRow[2]}`
  }
})
</script>

# {{ title6 }} {.inline-block.view-transition-title}
##
### Next: {{ subtitle6 }} {.inline-block.view-transition-subtitle}

<iframe
  src="https://lfw08.github.io"
  style="transform: scale(4);"
  class="top-145 right--28 absolute"
></iframe>

---
layout: center
---


<script setup>
import { ref, onMounted } from 'vue'

const title7 = ref('')
const subtitle7 = ref('')

onMounted(() => {
  const storedRows = JSON.parse(localStorage.getItem('shuffledRows')) || []
  if (storedRows.length > 7) {
    const firstRow = storedRows[7]?.cells || []
    const secondRow = storedRows[8]?.cells || []
    title7.value = `${firstRow[0]} - ${firstRow[1]}   ${firstRow[2]}`
    subtitle7.value = `${secondRow[0]} - ${secondRow[1]}   ${secondRow[2]}`
  }
})
</script>

# {{ title7 }} {.inline-block.view-transition-title}
##
### Next: {{ subtitle7 }} {.inline-block.view-transition-subtitle}

<iframe
  src="https://lfw08.github.io"
  style="transform: scale(4);"
  class="top-145 right--28 absolute"
></iframe>

---
layout: center
---


<script setup>
import { ref, onMounted } from 'vue'

const title8 = ref('')
const subtitle8 = ref('')

onMounted(() => {
  const storedRows = JSON.parse(localStorage.getItem('shuffledRows')) || []
  if (storedRows.length > 8) {
    const firstRow = storedRows[8]?.cells || []
    const secondRow = storedRows[9]?.cells || []
    title8.value = `${firstRow[0]} - ${firstRow[1]}   ${firstRow[2]}`
    subtitle8.value = `${secondRow[0]} - ${secondRow[1]}   ${secondRow[2]}`
  }
})
</script>

# {{ title8 }} {.inline-block.view-transition-title}
##
### Next: {{ subtitle8 }} {.inline-block.view-transition-subtitle}

<iframe
  src="https://lfw08.github.io"
  style="transform: scale(4);"
  class="top-145 right--28 absolute"
></iframe>

---
layout: center
---

<script setup>
import { ref, onMounted } from 'vue'

const title9 = ref('')
const subtitle9 = ref('')

onMounted(() => {
  const storedRows = JSON.parse(localStorage.getItem('shuffledRows')) || []
  if (storedRows.length > 9) {
    const firstRow = storedRows[9]?.cells || []
    const secondRow = storedRows[10]?.cells || []
    title9.value = `${firstRow[0]} - ${firstRow[1]}   ${firstRow[2]}`
    subtitle9.value = `${secondRow[0]} - ${secondRow[1]}   ${secondRow[2]}`
  }
})
</script>

# {{ title9 }} {.inline-block.view-transition-title}
##
### Next: {{ subtitle9 }} {.inline-block.view-transition-subtitle}

<iframe
  src="https://lfw08.github.io"
  style="transform: scale(4);"
  class="top-145 right--28 absolute"
></iframe>

---
layout: center
---


<script setup>
import { ref, onMounted } from 'vue'

const title10 = ref('')
const subtitle10 = ref('')

onMounted(() => {
  const storedRows = JSON.parse(localStorage.getItem('shuffledRows')) || []
  if (storedRows.length > 10) {
    const firstRow = storedRows[10]?.cells || []
    const secondRow = storedRows[11]?.cells || []
    title10.value = `${firstRow[0]} - ${firstRow[1]}   ${firstRow[2]}`
    subtitle10.value = `${secondRow[0]} - ${secondRow[1]}   ${secondRow[2]}`
  }
})
</script>

# {{ title10 }} {.inline-block.view-transition-title}
##
### Next: {{ subtitle10 }} {.inline-block.view-transition-subtitle}

<iframe
  src="https://lfw08.github.io"
  style="transform: scale(4);"
  class="top-145 right--28 absolute"
></iframe>

---
layout: center
---


<script setup>
import { ref, onMounted } from 'vue'

const title11 = ref('')
const subtitle11 = ref('')

onMounted(() => {
  const storedRows = JSON.parse(localStorage.getItem('shuffledRows')) || []
  if (storedRows.length > 11) {
    const firstRow = storedRows[11]?.cells || []
    const secondRow = storedRows[12]?.cells || []
    title11.value = `${firstRow[0]} - ${firstRow[1]}   ${firstRow[2]}`
    subtitle11.value = `${secondRow[0]} - ${secondRow[1]}   ${secondRow[2]}`
  }
})
</script>

# {{ title11 }} {.inline-block.view-transition-title}
##
### Next: {{ subtitle11 }} {.inline-block.view-transition-subtitle}

<iframe
  src="https://lfw08.github.io"
  style="transform: scale(4);"
  class="top-145 right--28 absolute"
></iframe>

---
layout: center
---


<script setup>
import { ref, onMounted } from 'vue'

const title12 = ref('')
const subtitle12 = ref('')

onMounted(() => {
  const storedRows = JSON.parse(localStorage.getItem('shuffledRows')) || []
  if (storedRows.length > 12) {
    const firstRow = storedRows[12]?.cells || []
    const secondRow = storedRows[13]?.cells || []
    title12.value = `${firstRow[0]} - ${firstRow[1]}   ${firstRow[2]}`
    subtitle12.value = `${secondRow[0]} - ${secondRow[1]}   ${secondRow[2]}`
  }
})
</script>

# {{ title12 }} {.inline-block.view-transition-title}
##
### Next: {{ subtitle12 }} {.inline-block.view-transition-subtitle}

<iframe
  src="https://lfw08.github.io"
  style="transform: scale(4);"
  class="top-145 right--28 absolute"
></iframe>

---
layout: center
---


<script setup>
import { ref, onMounted } from 'vue'

const title13 = ref('')
const subtitle13 = ref('')

onMounted(() => {
  const storedRows = JSON.parse(localStorage.getItem('shuffledRows')) || []
  if (storedRows.length > 13) {
    const firstRow = storedRows[13]?.cells || []
    const secondRow = storedRows[14]?.cells || []
    title13.value = `${firstRow[0]} - ${firstRow[1]}   ${firstRow[2]}`
    subtitle13.value = `${secondRow[0]} - ${secondRow[1]}   ${secondRow[2]}`
  }
})
</script>

# {{ title13 }} {.inline-block.view-transition-title}

<iframe
  src="https://lfw08.github.io"
  style="transform: scale(4);"
  class="top-145 right--28 absolute"
></iframe>


