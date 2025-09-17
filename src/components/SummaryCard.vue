<script setup>
defineProps({
  title: {
    type: String,
    default: 'Summary'
  },
  content: {
    type: String,
    default: 'The global small yacht industry is developing towards electrification, intelligence, sharing, and youthfulness. The global small yacht and related water leisure industry will show strong growth momentum by 2030, and the overall market size is expected to reach nearly 80 billion US dollars in economic volume by 2030. Technological innovation and sustainable development concepts will reshape the industry\'s competitive landscape.'
  }
});
</script>

<template>
  <div class="relative w-[599px] h-[210px] overflow-hidden flex flex-col items-start bg-black bg-opacity-10 rounded-lg p-5">
    <div class="absolute top-0 right-0 w-[209px] h-[38px] rounded-[5px] bg-white bg-opacity-30 flex items-center justify-center">
      <span class="text-xl font-normal text-white text-center">{{ title }}</span>
    </div>
    <div class="w-full mt-[47px] flex-1">
      <p class="text-xs font-normal leading-[17px] text-white m-0">{{ content }}</p>
    </div>
  </div>
</template>