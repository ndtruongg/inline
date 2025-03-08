<template>
  <article class="overflow-hidden rounded-[30px] bg-white shadow-lg">
    <NuxtLink to="/article">
      <div v-if="!isNoImage" :class="[isBig ? 'aspect-3/2' : 'aspect-square']">
        <NuxtImg
          placeholder
          placeholder-class="blur-xl"
          alt=""
          :loading="'lazy'"
          :style="{ 'view-transition-name': `item-${123}` }"
          src="https://i1-vnexpress.vnecdn.net/2025/02/13/AFP-20241219-36QQ3VB-v1-HighRe-8193-6593-1739456962.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=tv2AF1gwEFCRxMtG7rIrwQ"
          class="h-full w-full object-cover"
        />
      </div>

      <div class="px-7 pb-8 pt-6">
        <h3>
          <NuxtLink to="/article" class="line-clamp-2 text-xl font-semibold">
            Châu Âu bối rối với cuộc điện đàm của ông Trump - ông Putin
          </NuxtLink>
        </h3>

        <p class="mt-4 text-sm text-date">10 tháng 2, 2025</p>

        <p v-if="isNoImage" class="mt-10 text-description">
          iện Kremlin bày tỏ ấn tượng với quan điểm của chính quyền Trump về chấm dứt chiến sự
          Ukraine, khẳng định điều này khác với chính quyền tiền nhiệm. Phát ngôn viên Điện Kremlin
          Dmitry Peskov hôm nay cho biết cuộc điện đàm giữa Tổng thống Nga Vladimir Putin và người
          đồng cấp Mỹ Donald Trump ngày 12/2 là sự kiện rất quan trọng. Hai bên đều thể hiện thiện
          chí chính trị nhằm tìm giải pháp kết thúc xung đột Ukraine thông qua đàm phán.
        </p>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
interface ArticleProps {
  isBig?: boolean
  post: any
}

const props = withDefaults(defineProps<ArticleProps>(), {
  isBig: false
})

const isNoImage = computed(() => {
  return props.post.feature_image === null
})
</script>
