<template>
  <Icon v-if="icon" :icon="formatIcon" :="$attrs"></Icon>
  <div v-if="localIcon" :class="formatLocalIcon" :="$attrs"></div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
const { icon, localIcon } = defineProps<{
  icon?: string
  localIcon?: string
}>()

const formatIcon = computed(() => {
  if (!icon) return ''
  if (icon.startsWith('i-')) {
    return icon.slice(2)
  }
  return icon
})

const formatLocalIcon = computed(() => {
  if (!localIcon) return ''
  if (!localIcon.startsWith('i-')) {
    return `i-${localIcon}`
  }
  return localIcon
})
</script>

<style scoped></style>
