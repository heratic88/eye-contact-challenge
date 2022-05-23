<template>
  <div>
    <p>This page is a work in progress! Later you'll be able to place the red dot manually.</p>

    <form @submit='submit'>
      <input required v-model='url' type='url' placeholder='URL'>
      <input required v-model='x' type='number' placeholder='X'>
      <input required v-model='y' type='number' placeholder='Y'>
      <button>Create</button>
    </form>
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
    }
  },

  methods: {
    submit() {
      this.$router.push({ name: 'view', params: { config: this.config } })
    }
  }
}
</script>
