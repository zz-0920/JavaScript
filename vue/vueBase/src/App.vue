<template>
  
  <div>
    <!-- <h1>{{ count }}</h1>
    <button @click="handleAdd">add</button> -->
  </div>

  <div @click="changeFlag">
    <!-- <h2 v-if="flag">abc</h2>
    <h2 v-else>def</h2> -->
  </div>

  <div>
    <!-- <h2 v-bind:class="{red: flag}" @click="changeFlag">abc</h2> -->
  </div>

  <div>
    <ul>
      <!-- <li v-for="item in list" :key="item">{{ item }}</li> -->
    </ul>
  </div>

  <div>
    <!-- <h2 v-show="show">hello</h2>
    <button @click="show = !show">change</button> -->
  </div>

  <div>
    <input type="text" v-model="msg">
    <button>提交</button>
    <h2>{{ msg }}</h2>
  </div>

</template>

<script setup lang="js">
// let count = 0

// const handleAdd = () => {
//   count++
//   console.log(count);
// }

import { ref, reactive } from 'vue'

const count = ref(0)
const state = reactive({
  count: 0,
  age: 21
})

const handleAdd = () => {
  count.value++
  state.count++
  console.log(state.count);
  console.log(count.value);
}

let flag = ref(true)

const changeFlag = () => {
  flag.value = !flag.value
}

const list = ref(['a', 'b', 'c'])

let show = ref(true)

const msg = ref('')
</script>

<style lang="css" scoped>
.red {
  color: red;
}
</style>