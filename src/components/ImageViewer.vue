<template>
  <div id="container" @touchstart="show" @touchend="hide" @mousedown="show" @mouseup="hide" @dragstart="show" @dragend="hide">
    <img ref="image" :src="url" :style="imageStyle">
    <div class="blind" v-show="blind"></div>
    <div class="circle" :style="circleStyle" v-show="loaded && blind"></div>
    <div class="instructions" v-show="!loaded">Loading, please wait</div>
    <div class="instructions" v-show="loaded && blind">Keep your eyes on the red dot and tap and hold to view the image</div>
  </div>
</template>

<script>
export default {
  props: ['url', 'x', 'y'],

  mounted() {
    this.$refs.image.onload = () => { this.onload() }
  },

  data() {
    return {
      loaded: false,
      styled: false,
      blind: true,
    }
  },

  computed: {
    image() {
      return this.$refs.image
    },

    scale() {
      if (!this.loaded) return

      return Math.min(window.innerHeight / this.image.naturalHeight, window.innerWidth / this.image.naturalWidth)
    },

    imageStyle() {
      if (!this.loaded) return

      const w = this.image.naturalWidth * this.scale
      const h = this.image.naturalHeight * this.scale

      const x = (window.innerWidth - w) / 2
      const y = (window.innerHeight - h) / 2

      return `left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px`
    },

    circleStyle() {
      if (!this.styled) return

      const position = this.image.getBoundingClientRect()

      const x = position.x + parseInt(this.x) * this.scale - 5
      const y = position.y + parseInt(this.y) * this.scale - 5

      return `left: ${x}px; top: ${y}px`
    }
  },

  methods: {
    onload() {
      this.loaded = true
    },

    toggle(event) {
      this.blind = !this.blind

      event.preventDefault()
      return false
    },

    show(event) {
      this.blind = false

      event.preventDefault()
      return false
    },

    hide(event) {
      this.blind = true

      event.preventDefault()
      return false
    }
  },

  watch: {
    imageStyle() {
      this.$nextTick(() => {
        this.styled = true
      })
    }
  }
}
</script>

<style scoped>
#container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #000000;
}
img {
  position: fixed;
  z-index: 1;

}

.blind {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  z-index: 10;
}

.circle {
  position: fixed;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff0000;
  z-index: 15;
}

.instructions {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  color: #ffffff;
  text-align: center;
  font-size: 2em;
  font-family: sans-serif;
  z-index: 11;
}
</style>
