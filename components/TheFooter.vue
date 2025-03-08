<template>
  <footer>
    <TheContainer :max-width="1080" class="flex flex-col justify-between border-t border-border pb-20 pt-10 lg:flex-row">
      <div class="flex flex-col justify-between">
        <NuxtLink to="/">
          <TheLogo />
        </NuxtLink>

        <DarkModeToggle />
      </div>

      <div class="flex flex-col">
        <p class="mb-5 text-sm uppercase text-description">Thêm</p>

        <nuxt-link to="/" class="mb-4 text-date">Về chúng tôi</nuxt-link>

        <nuxt-link to="/lien-he" class="mb-4 text-date">Liên hệ</nuxt-link>
  
        <nuxt-link to="/" class="mb-4 text-date">Chính sách bảo mật</nuxt-link>
      </div>
    </TheContainer>
  </footer>
</template>
