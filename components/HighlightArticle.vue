<template>
  <TheContainer :max-width="1200" class="mt-20">
    <article class="flex flex-col lg:grid lg:grid-cols-9 lg:gap-10">
      <div class="aspect-square overflow-hidden rounded-2xl lg:col-span-4">
        <NuxtLink to="/article/chinh-tri">
          <NuxtImg
            placeholder
            placeholder-class="blur-xl"
            alt=""
            :loading="'lazy'"
            :style="{ 'view-transition-name': `item-${111}` }"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/800px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
            class="h-full w-full object-cover"
          />
        </NuxtLink>
      </div>

      <div class="flex flex-col justify-center p-6 lg:col-span-5 lg:p-0">
        <TheTag class="mb-3">Chính trị</TheTag>

        <h3 class="mt-5">
          <NuxtLink to="/article/chinh-tri" class="text-xl font-semibold lg:text-3xl">
            Châu Âu bối rối với cuộc điện đàm của ông Trump - ông Putin
          </NuxtLink>
        </h3>

        <p class="mt-6 line-clamp-2 text-base text-description lg:mt-8 lg:text-lg">
          Các lãnh đạo châu Âu không được báo trước về cuộc điện đàm giữa ông Trump và ông Putin,
          bối rối khi họ bị gạt khỏi nỗ lực tìm kiếm hòa bình cho Ukraine.
        </p>

        <span class="mt-3 block text-sm text-date lg:mt-6">10 tháng 2, 2025</span>
      </div>
    </article>
  </TheContainer>
</template>
