<template>
  <div>
    {{config}}
    <ImageViewer :url="config.url" :x="config.x" :y="config.y" />
  </div>
</template>

<script>
import ImageViewer from '@/components/ImageViewer.vue'

export default {
  components: {
    ImageViewer
  },

  computed: {
    config() {
      console.log(this.$route.params.config)
      return JSON.parse(window.atob(decodeURIComponent(this.$route.params.config)))
      // return this.$route.params.config
    }
  }
}
</script>
