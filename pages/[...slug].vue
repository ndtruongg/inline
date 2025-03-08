<template>
  <TheContainer :max-width="1080">
    <NuxtImg
      placeholder
      placeholder-class="blur-xl"
      alt=""
      :loading="'lazy'"
      :style="{ 'view-transition-name': `item-${111}` }"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/800px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
      class="h-full w-full object-cover"
    />

    <div class="content mx-auto w-full max-w-[800px]">
      <p>
        Với doanh nhân Dmitry ở Siberia, chiến sự Ukraine đem lại nhiều phiền toái hơn bất kỳ điều gì khác, dù ông sống cách nơi giao tranh hàng nghìn km.
  
  Dmitry cho hay doanh thu công ty ngành IT của ông ở thành phố Novosibirsk, vùng Siberia bị ảnh hưởng do các lệnh trừng phạt chưa từng có từ phương Tây áp đặt với Nga trong ba năm chiến sự Ukraine.
  
  "Lệnh trừng phạt khiến mọi thứ khó khăn hơn, vì phần mềm Nga không tốt bằng Mỹ", Dmitry, gần 50 tuổi, nói. Gia đình ông vẫn có điều kiện đi nghỉ mát ở Altai, song ông thừa nhận giá một số mặt hàng ở Nga đã tăng cao, đặc biệt là ôtô, khiến việc tậu một chiếc xe mới trở nên khó khăn hơn, trong khi các thương hiệu từ Trung Quốc xuất hiện nhiều hơn.
  
  Tại Moskva, Viktoria, bà mẹ hai con và có người thân ở Ukraine, cho hay lúc chiến sự mới nổ ra, nhiều người đã sốc và sợ hãi. Nạn tích trữ thuốc đã gây ra tình trạng khan hiếm vật tư y tế vào đầu năm 2022.
      </p>
    </div>
  </TheContainer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.content {
  h2, h3, p {
    width: 600px;
    max-width: 100%;
    margin: 20px auto;
    font-size: 16px;
    line-height: 28px;
  }
}
</style>
