<script setup lang="ts">
import { ref } from 'vue'

const question = ref('帮我列出当前目录下的所有文件')
const think = ref('')

const update = async () => {
  // console.log('update', question.value);
  if (!question.value) {
    return
  }
  think.value = '思考中...'
  
  try {
    const res = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: question.value
      })
    })
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    
    const data = await res.json()
    think.value = data.reply || data.error || '无响应'
  } catch (error) {
    console.error('请求失败:', error)
    think.value = `请求失败: ${error.message}`
  }
}
</script>

<template>
  <div class="container">
    <h1>Ollama Tools</h1>
    <label for="input">输入:</label>
    <input type="text" id="input" placeholder="请输入内容" v-model="question">
    <button @click="update">发送</button>
  </div>
  <div class="output">
    <div class="think">{{ think }}</div>
    <div class="list"></div>
  </div>
</template>

<style lang="css" scoped></style>