<template>
  <div id="container" @mousedown="show" @mouseup="hide" @dragstart="show" @dragend="hide">
    <img ref="image" :src="url" :style="imageStyle">
    <div class="blind" v-show="blind"></div>
    <div class="circle" :style="circleStyle" v-show="blind"></div>
    <div class="instructions" v-show="blind">Keep your eyes on the red dot and tap and hold to view the image</div>
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

      const y = position.y + parseInt(this.y) * this.scale
      const x = position.x + parseInt(this.x) * this.scale

      return `left: ${x}px; top: ${y}px`

    }
  },

  methods: {
    onload() {
      this.loaded = true
    },

    toggle() {
      this.blind = !this.blind
    },

    show() {
      this.blind = false
    },

    hide() {
      this.blind = true
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
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #000000;
}
img {
  position: absolute;
  z-index: 1;
}

.blind {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #000000;
  z-index: 10;
}

.circle {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff0000;
  z-index: 15;
}

.instructions {
  position: absolute;
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
