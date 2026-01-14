<template>
  <div class="flex-center cursor-pointer p-1 hover:bg-primary-100" @click="appStore.toggleMenuDrawer(true)">
    <SvgIcon icon="i-line-md:close-to-menu-alt-transition" class="text-xl text-primary"></SvgIcon>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
const appStore = useAppStore()
</script>

<style scoped></style>
