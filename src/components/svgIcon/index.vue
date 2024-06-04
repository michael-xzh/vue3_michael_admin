<script setup lang='ts'>
defineProps({
    iconName: {
        type: String,
        defult: ''
    },
    color: {
        type: String,
        defult: ''
    },
    width: {
        type: String,
        default: '16px'
    },
    height: {
        type: String,
        default: '16px'
    }
})
</script>

<template>
    <svg :style="{ width, height }">
        <use :xlink-href="'#icon-' + iconName" :fill="color"></use>
    </svg>
</template>

<style scoped lang="scss"></style>
