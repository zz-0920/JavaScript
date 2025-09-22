<script setup lang="js">
import { onBeforeMount, ref } from 'vue';

let list = ref([])
onBeforeMount(() => {
    fetch('https://mock.mengxuegu.com/mock/66585c4db462b81cb3916d3e/songer/songer')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            list.value = data.data
        })
})
const handleClick = (item) => {
    console.log(item);
    list.value = list.value.filter((cur) => cur.name !== item.name)
    console.log(list.value);
}
</script>

<template>
    <div>
        <!-- <h2>{{list}}</h2> -->
    </div>
    <div>
        <ul>
            <li v-for="(item, index) in list" :key="index" @click="handleClick(item)">{{ item.name }}</li>
        </ul>
    </div>
</template>

<style lang="css" scoped></style>
https://mock.mengxuegu.com/mock/66585c4db462b81cb3916d3e/songer/songer