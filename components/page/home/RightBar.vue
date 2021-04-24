<template>
  <aside class="fixed right-8 w-1/5 my-4 text-sm h-screen">
    <div class="about text-center">
      <img
        src="./img/me.jpg"
        alt="avatar"
        class="img w-40 h-40 rounded-full mx-auto"
      />
      <p class="text-xl my-1 font-bold text-blue-800">Howie Chen</p>
      <div class="flex justify-center my-2">
        <a href="https://github.com/howie12207" target="_blank"
          ><img src="./img/github.svg" alt="github" class="mx-4 cursor-pointer"
        /></a>
        <a href="mailto:howie12207@gmail.com">
          <img
            src="./img/gmail.svg"
            alt="gmail"
            class="w-6 h-6 mx-4 cursor-pointer"
        /></a>
      </div>
      <p class="text-left text-indent text-yellow-800 text-sm">
        一年經驗的『前端工程師』，使用Vue框架，後端node搭配mongoDB，歡迎一起分享交流。
      </p>
    </div>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ForestageRightBar',
  data() {
    return {}
  },
  methods: {},
})
</script>

<style lang="scss" scoped>
.title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #7f1d1d;
}
.text-indent {
  text-indent: 2rem;
}
</style>
