---
layout: center
theme: unicorn

transition: view-transition
mdc: true
---

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const number = ref('加载中...')
const animatedNumber = ref(number.value)
const show = ref(true)
let timer = null

const fetchNumber = async () => {
  try {
    const res = await fetch('http://localhost:3001/number')
    const newValue = await res.text()
    if (newValue !== number.value) {
      show.value = false
      setTimeout(() => {
        number.value = newValue
        animatedNumber.value = newValue
        show.value = true
      }, 150) // 动画时长
    }
  } catch {
    number.value = ''
    animatedNumber.value = ''
  }
}

onMounted(() => {
  fetchNumber()
  timer = setInterval(fetchNumber, 500)
})

onUnmounted(() => {
  clearInterval(timer)
})

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

# 剩余数量 {.inline-block.view-transition-title}
##
<transition name="fade">
  <span v-if="show" class="inline-block view-transition-number" style="font-size:7em">{{ animatedNumber }}</span>
</transition>

