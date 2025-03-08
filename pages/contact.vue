<template>
  <TheContainer>
    <div class="mx-auto w-[600px] max-w-full rounded-lg p-10">
      <h2 class="font-title mb-6 text-3xl text-neutral-950">Liên Hệ</h2>
      <form class="space-y-6">
        <div class="flex flex-col">
          <label for="name" class="mb-2 text-lg font-medium text-neutral-950">Họ và Tên</label>
          <input
            type="text"
            id="name"
            name="name"
            class="border-b-2 border-neutral-300 bg-transparent p-3 text-lg transition-colors duration-200 hover:border-logo focus:border-logo focus:outline-none"
            placeholder="Nguyễn Đình Trư"
          />
        </div>
        <div class="flex flex-col">
          <label for="email" class="mb-2 text-lg font-medium text-neutral-950">Địa Chỉ Email</label>
          <input
            type="email"
            id="email"
            name="email"
            class="border-b-2 border-neutral-300 bg-transparent p-3 text-lg transition-colors duration-200 hover:border-logo focus:border-logo focus:outline-none"
            placeholder="email@example.com"
          />
        </div>
        <div class="flex flex-col">
          <label for="message" class="mb-2 text-lg font-medium text-neutral-950">Tin Nhắn</label>
          <textarea
            id="message"
            name="message"
            class="h-[120px] resize-none border-b-2 border-neutral-300 bg-transparent p-3 text-lg transition-colors duration-200 hover:border-logo focus:border-logo focus:outline-none"
            placeholder="Nhập tin nhắn của bạn..."
          ></textarea>
        </div>
        <TheButton
          class="ml-auto mr-auto flex h-20 w-[200px] items-center justify-center rounded-[40px] px-10 text-xl font-semibold"
        >
          Gửi
          <IconsIconSend class="ml-2" />
        </TheButton>
      </form>
    </div>
  </TheContainer>
</template>

<script setup lang="ts">
definePageMeta({
  path: '/lien-he'
})
</script>

<style scoped></style>
