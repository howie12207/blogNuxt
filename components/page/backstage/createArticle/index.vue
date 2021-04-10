<template>
  <div>
    <PageBackstageModifyArticle v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CreateArticlePage',
})
</script>
