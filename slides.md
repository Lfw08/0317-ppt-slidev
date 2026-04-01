---
theme: unicorn
addons:
  - slidev-component-progress

title: 滑翔机挑战赛
info: |
class: text-center
drawings:
  persist: false
transition: view-transition
mdc: true
layout: cover
css: |
  /* Liquid Glass Base Styles */
  :root {
    --glass-bg-1: rgba(255, 255, 255, 0.15);
    --glass-bg-2: rgba(255, 255, 255, 0.08);
    --glass-border: rgba(255, 255, 255, 0.25);
    --glass-shadow: rgba(0, 0, 0, 0.1);
    --liquid-primary: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    --liquid-secondary: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --liquid-tertiary: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    --liquid-warm: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    --blur-amount: blur(20px);
    --blur-heavy: blur(40px);
  }

  .slide-container {
    background: linear-gradient(135deg, 
      #1a1a2e 0%, 
      #16213e 25%, 
      #0f3460 50%, 
      #1a1a2e 75%, 
      #16213e 100%);
    background-size: 400% 400%;
    animation: liquidFlow 15s ease infinite;
  }

  @keyframes liquidFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Glass Card Effect */
  .glass-card {
    background: var(--glass-bg-1);
    backdrop-filter: var(--blur-amount);
    -webkit-backdrop-filter: var(--blur-amount);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    box-shadow: 
      0 8px 32px 0 var(--glass-shadow),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
  }

  .glass-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: glassShine 3s ease-in-out infinite;
  }

  @keyframes glassShine {
    0% { left: -100%; }
    50%, 100% { left: 100%; }
  }

  /* Liquid Bubble Background */
  .liquid-bubbles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .bubble {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, 
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.1) 50%,
      transparent 70%);
    backdrop-filter: blur(2px);
    animation: floatUp 20s infinite ease-in-out;
  }

  .bubble:nth-child(1) {
    width: 300px;
    height: 300px;
    left: -100px;
    bottom: -100px;
    animation-delay: 0s;
    background: var(--liquid-primary);
    opacity: 0.3;
  }

  .bubble:nth-child(2) {
    width: 200px;
    height: 200px;
    right: -50px;
    top: 10%;
    animation-delay: -5s;
    background: var(--liquid-secondary);
    opacity: 0.25;
  }

  .bubble:nth-child(3) {
    width: 150px;
    height: 150px;
    left: 30%;
    top: -50px;
    animation-delay: -10s;
    background: var(--liquid-tertiary);
    opacity: 0.2;
  }

  .bubble:nth-child(4) {
    width: 250px;
    height: 250px;
    right: 20%;
    bottom: 10%;
    animation-delay: -15s;
    background: var(--liquid-warm);
    opacity: 0.2;
  }

  @keyframes floatUp {
    0%, 100% {
      transform: translateY(0) translateX(0) scale(1);
    }
    25% {
      transform: translateY(-30px) translateX(20px) scale(1.05);
    }
    50% {
      transform: translateY(-50px) translateX(-10px) scale(0.95);
    }
    75% {
      transform: translateY(-20px) translateX(-30px) scale(1.02);
    }
  }

  /* Glass Table Styles */
  .glass-table {
    background: var(--glass-bg-2);
    backdrop-filter: var(--blur-amount);
    -webkit-backdrop-filter: var(--blur-amount);
    border-radius: 16px;
    border: 1px solid var(--glass-border);
    overflow: hidden;
  }

  .glass-table td {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
    transition: all 0.3s ease;
  }

  .glass-table tr:hover td {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(5px);
  }

  .glass-table tr:nth-child(even) td {
    background: rgba(255, 255, 255, 0.08);
  }

  /* Glass Title Effect */
  .glass-title {
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.9) 0%, 
      rgba(255, 255, 255, 0.6) 50%,
      rgba(200, 200, 255, 0.8) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 40px rgba(255, 255, 255, 0.3);
  }

  .glass-subtitle {
    color: rgba(255, 255, 255, 0.7);
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  /* Progress Bar Glass Effect */
  .glass-progress {
    background: var(--glass-bg-1);
    backdrop-filter: var(--blur-amount);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 4px;
  }

  .glass-progress-bar {
    background: var(--liquid-primary);
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
    transition: width 0.5s ease;
  }

  /* Video/Audio Glass Container */
  .glass-media {
    background: var(--glass-bg-1);
    backdrop-filter: var(--blur-amount);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 8px 32px var(--glass-shadow);
  }

  /* Liquid Button Effect */
  .liquid-btn {
    background: var(--liquid-primary);
    border: none;
    border-radius: 50px;
    padding: 12px 32px;
    color: white;
    font-weight: 600;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .liquid-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.5s ease;
  }

  .liquid-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  }

  .liquid-btn:hover::before {
    left: 100%;
  }

  /* Fade Animation with Glass */
  .fade-in-row-glass {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
    animation: fadeInGlass 0.4s ease-out forwards;
  }

  @keyframes fadeInGlass {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Iframe Glass Border */
  .glass-iframe {
    border: 2px solid var(--glass-border);
    border-radius: 16px;
    box-shadow: 
      0 8px 32px var(--glass-shadow),
      inset 0 0 20px rgba(255, 255, 255, 0.1);
    backdrop-filter: var(--blur-amount);
  }
---

<!-- Liquid Glass Background Bubbles -->
<div class="liquid-bubbles">
  <div class="bubble"></div>
  <div class="bubble"></div>
  <div class="bubble"></div>
  <div class="bubble"></div>
</div>

<video 
  controls 
  src= "/video.mp4" 
  class="mx-auto glass-media"
/>


---
layout: center
class: slide-container
---

<div class="glass-media">
  <audio controls src="FS2020.mp3" loop class="w-full"></audio>
</div>

---
layout: center
class: slide-container
---

<div class="glass-card p-12 max-w-4xl mx-auto">
  <h1 class="glass-title text-5xl font-bold mb-6">滑翔机挑战赛</h1>
  <div class="glass-subtitle space-y-2">
    <h3 class="text-2xl">北京师大二附中 第18届科技节</h3>
    <div class="h-4"></div>
    <h4 class="text-xl">高二年级</h4>
    <h4 class="text-lg opacity-80">2025.4.10</h4>
  </div>
</div>

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute glass-iframe"
></iframe>




---
layout: center
class: slide-container
---

<div class="glass-card px-16 py-10">
  <h1 class="glass-title text-4xl font-bold">参赛选手</h1>
</div>


---
layout: center
class: slide-container
---

<div class="glass-card px-12 py-8 mb-8">
  <h1 class="glass-title text-4xl font-bold">参赛选手</h1>
</div>

<div class="multi-column-table">
  <!-- 三个表格列容器 -->
  <div class="table-column" v-for="(chunk, index) in chunkedRows" :key="index">
    <table class="glass-table">
      <tr v-for="(row, rowIndex) in chunk" :key="row.id" :class="'fade-in-row-glass'">
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
    const rows = document.querySelectorAll('.fade-in-row-glass')
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
  padding-right: 15px;
}

.table-column:last-child {
  padding-right: 0;
}

.glass-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 4px;
}

.glass-table td {
  padding: 10px 16px;
  font-size: 0.95em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 8px;
}

/* 滚动条样式 */
.table-column::-webkit-scrollbar {
  width: 6px;
}
.table-column::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}
</style>

---
layout: center
class: slide-container
---

<div class="glass-card px-16 py-10">
  <h1 class="glass-title text-4xl font-bold">比赛顺序</h1>
</div>


---
layout: center
class: slide-container
---

<div class="glass-card px-12 py-8 mb-8">
  <h1 class="glass-title text-4xl font-bold">比赛顺序</h1>
</div>

<div class="multi-column-table">
  <!-- 三个表格列容器 -->
  <div class="table-column" v-for="(chunk, index) in chunkedRows" :key="index">
    <table class="glass-table">
      <tr v-for="(row, rowIndex) in chunk" :key="row.id" :class="'fade-in-row-glass'">
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
    const rows = document.querySelectorAll('.fade-in-row-glass')
    rows.forEach((row, index) => {
      row.style.animationDelay = `${index * 0.15}s`
    })
  })
})
</script>

<style>
.multi-column-table {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
}

.table-column {
  flex: 1;
  overflow-y: auto;
  padding-right: 15px;
}

.table-column:last-child {
  padding-right: 0;
}

.glass-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 4px;
}

.glass-table td {
  padding: 10px 16px;
  font-size: 0.95em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 8px;
}

.table-column::-webkit-scrollbar {
  width: 6px;
}
.table-column::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}
</style>


---
layout: center
class: slide-container
---

<div class="glass-progress w-64 mx-auto mb-8">
  <div class="glass-progress-bar h-4" style="width: 7%;"></div>
</div>

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

<div class="glass-card px-16 py-12 max-w-4xl mx-auto">
  <h1 class="glass-title text-4xl font-bold mb-4">{{ title }}</h1>
  <div class="h-8"></div>
  <h3 class="glass-subtitle text-xl">Next: {{ subtitle }}</h3>
</div>

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute glass-iframe"
></iframe>

---
layout: center
class: slide-container
---

<div class="glass-progress w-64 mx-auto mb-8">
  <div class="glass-progress-bar h-4" style="width: 14%;"></div>
</div>

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

<div class="glass-card px-16 py-12 max-w-4xl mx-auto">
  <h1 class="glass-title text-4xl font-bold mb-4">{{ title1 }}</h1>
  <div class="h-8"></div>
  <h3 class="glass-subtitle text-xl">Next: {{ subtitle1 }}</h3>
</div>

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute glass-iframe"
></iframe>

---
layout: center
class: slide-container
---

<div class="glass-progress w-64 mx-auto mb-8">
  <div class="glass-progress-bar h-4" style="width: 21%;"></div>
</div>

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

<div class="glass-card px-16 py-12 max-w-4xl mx-auto">
  <h1 class="glass-title text-4xl font-bold mb-4">{{ title2 }}</h1>
  <div class="h-8"></div>
  <h3 class="glass-subtitle text-xl">Next: {{ subtitle2 }}</h3>
</div>

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute glass-iframe"
></iframe>

---
layout: center
class: slide-container
---

<div class="glass-progress w-64 mx-auto mb-8">
  <div class="glass-progress-bar h-4" style="width: 29%;"></div>
</div>

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

<div class="glass-card px-16 py-12 max-w-4xl mx-auto">
  <h1 class="glass-title text-4xl font-bold mb-4">{{ title3 }}</h1>
  <div class="h-8"></div>
  <h3 class="glass-subtitle text-xl">Next: {{ subtitle3 }}</h3>
</div>

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute glass-iframe"
></iframe>

---
layout: center
class: slide-container
---

<div class="glass-progress w-64 mx-auto mb-8">
  <div class="glass-progress-bar h-4" style="width: 36%;"></div>
</div>

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

<div class="glass-card px-16 py-12 max-w-4xl mx-auto">
  <h1 class="glass-title text-4xl font-bold mb-4">{{ title4 }}</h1>
  <div class="h-8"></div>
  <h3 class="glass-subtitle text-xl">Next: {{ subtitle4 }}</h3>
</div>

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute glass-iframe"
></iframe>

---
layout: center
class: slide-container
---

<div class="glass-progress w-64 mx-auto mb-8">
  <div class="glass-progress-bar h-4" style="width: 43%;"></div>
</div>

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

<div class="glass-card px-16 py-12 max-w-4xl mx-auto">
  <h1 class="glass-title text-4xl font-bold mb-4">{{ title5 }}</h1>
  <div class="h-8"></div>
  <h3 class="glass-subtitle text-xl">Next: {{ subtitle5 }}</h3>
</div>

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute glass-iframe"
></iframe>

---
layout: center
class: slide-container
---

<div class="glass-progress w-64 mx-auto mb-8">
  <div class="glass-progress-bar h-4" style="width: 50%;"></div>
</div>

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

<div class="glass-card px-16 py-12 max-w-4xl mx-auto">
  <h1 class="glass-title text-4xl font-bold mb-4">{{ title6 }}</h1>
  <div class="h-8"></div>
  <h3 class="glass-subtitle text-xl">Next: {{ subtitle6 }}</h3>
</div>

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute glass-iframe"
></iframe>

---
layout: center
class: slide-container
---

<div class="glass-progress w-64 mx-auto mb-8">
  <div class="glass-progress-bar h-4" style="width: 57%;"></div>
</div>

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

<div class="glass-card px-16 py-12 max-w-4xl mx-auto">
  <h1 class="glass-title text-4xl font-bold mb-4">{{ title7 }}</h1>
  <div class="h-8"></div>
  <h3 class="glass-subtitle text-xl">Next: {{ subtitle7 }}</h3>
</div>

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute glass-iframe"
></iframe>

---
layout: center
class: slide-container
---

<div class="glass-progress w-64 mx-auto mb-8">
  <div class="glass-progress-bar h-4" style="width: 64%;"></div>
</div>


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

<div class="glass-card px-16 py-12 max-w-4xl mx-auto">
  <h1 class="glass-title text-4xl font-bold mb-4">{{ title8 }}</h1>
  <div class="h-8"></div>
  <h3 class="glass-subtitle text-xl">Next: {{ subtitle8 }}</h3>
</div>

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute glass-iframe"
></iframe>

---
layout: center
class: slide-container
---

<div class="glass-progress w-64 mx-auto mb-8">
  <div class="glass-progress-bar h-4" style="width: 71%;"></div>
</div>

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

<div class="glass-card px-16 py-12 max-w-4xl mx-auto">
  <h1 class="glass-title text-4xl font-bold mb-4">{{ title9 }}</h1>
  <div class="h-8"></div>
  <h3 class="glass-subtitle text-xl">Next: {{ subtitle9 }}</h3>
</div>

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute glass-iframe"
></iframe>

---
layout: center
class: slide-container
---

<div class="glass-progress w-64 mx-auto mb-8">
  <div class="glass-progress-bar h-4" style="width: 79%;"></div>
</div>

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

<div class="glass-card px-16 py-12 max-w-4xl mx-auto">
  <h1 class="glass-title text-4xl font-bold mb-4">{{ title10 }}</h1>
  <div class="h-8"></div>
  <h3 class="glass-subtitle text-xl">Next: {{ subtitle10 }}</h3>
</div>

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute glass-iframe"
></iframe>

---
layout: center
class: slide-container
---

<div class="glass-progress w-64 mx-auto mb-8">
  <div class="glass-progress-bar h-4" style="width: 86%;"></div>
</div>


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

<div class="glass-card px-16 py-12 max-w-4xl mx-auto">
  <h1 class="glass-title text-4xl font-bold mb-4">{{ title11 }}</h1>
  <div class="h-8"></div>
  <h3 class="glass-subtitle text-xl">Next: {{ subtitle11 }}</h3>
</div>

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute glass-iframe"
></iframe>

---
layout: center
class: slide-container
---

<div class="glass-progress w-64 mx-auto mb-8">
  <div class="glass-progress-bar h-4" style="width: 93%;"></div>
</div>

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

<div class="glass-card px-16 py-12 max-w-4xl mx-auto">
  <h1 class="glass-title text-4xl font-bold mb-4">{{ title12 }}</h1>
  <div class="h-8"></div>
  <h3 class="glass-subtitle text-xl">Next: {{ subtitle12 }}</h3>
</div>

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute glass-iframe"
></iframe>

---
layout: center
class: slide-container
---

<div class="glass-progress w-64 mx-auto mb-8">
  <div class="glass-progress-bar h-4" style="width: 100%;"></div>
</div>


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

<div class="glass-card px-16 py-12 max-w-4xl mx-auto">
  <h1 class="glass-title text-4xl font-bold mb-4">{{ title13 }}</h1>
</div>

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute glass-iframe"
></iframe>


---
layout: cover
class: slide-container
---

<div class="glass-card px-16 py-12 max-w-3xl mx-auto">
  <h1 class="glass-title text-5xl font-bold mb-6">滑翔机挑战赛</h1>
  <h2 class="glass-subtitle text-2xl mb-4">2025.4.10</h2>
  <h3 class="glass-subtitle text-xl opacity-80">高二年级</h3>
</div>

<iframe
  src="index.html"
  style="transform: scale(4);"
  class="top-145 right--28 absolute glass-iframe"
></iframe>

---
