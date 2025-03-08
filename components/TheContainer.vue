<template>
  <div class="mx-auto w-full px-5" :style="{ maxWidth: props.maxWidth + 'px' }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  maxWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 1080
})
</script>
