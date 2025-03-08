<template>
    <div class="bg-white">
        <slot />
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ['admin'],
})
</script>