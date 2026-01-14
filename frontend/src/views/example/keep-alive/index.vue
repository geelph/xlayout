<template>
  <NCard class="h-full">
    <NSpace align="center">
      <NText type="primary">当前计数：{{ count }}</NText>
      <NButton type="primary" @click="count++">增加</NButton>
    </NSpace>
  </NCard>
</template>

<script setup lang="ts">
const count = ref(0)
</script>

<style scoped></style>
