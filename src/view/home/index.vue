<template>
    <div>
        <el-input v-model="input2" style="width: 240px" placeholder="Type something" :prefix-icon="Lock" />
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
const input2 = ref('')
</script>
<style scoped lang="scss"></style>
