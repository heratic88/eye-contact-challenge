<template>
  <div id="container">
    <p>This page is a work in progress!</p>

    <form @submit="submit">
      <input required v-model="url" type="url" placeholder="URL">
      <input required v-model="x" type="hidden">
      <input required v-model="y" type="hidden">
      <button :disabled="!hasPosition">Create</button>
    </form>

    <img :src="url" @click="updatePosition" ref="image">
    <div class="circle" :style="circleStyle" v-show="hasPosition"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      x: '',
      y: '',
    }
  },

  computed: {
    config() {
      return encodeURIComponent(window.btoa(JSON.stringify({
        url: this.url,
        x: this.x,
        y: this.y,
      })))
    },

    circleStyle() {
      if (!this.hasPosition) return

      const position = this.$refs.image.getBoundingClientRect()

      const x = position.x + parseInt(this.x) - 5
      const y = position.y + parseInt(this.y) - 5

      return `left: ${x}px; top: ${y}px`
    },

    hasPosition() {
      return this.x.length > 0 && this.y.length > 0
    }
  },

  methods: {
    submit() {
      this.$router.push({ name: 'view', params: { config: this.config } })
    },

    updatePosition(event) {
      this.x = String(event.offsetX)
      this.y = String(event.offsetY)
    }
  }
}
</script>

<style scoped>
.circle {
  position: fixed;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff0000;
  z-index: 15;
}
</style>
