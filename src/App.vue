<template>
  <div id="app" class="center">
    <Header />
      <router-view />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    this.$store.dispatch('tryAutoLogin')
  }
}
</script>

<style lang="sass">

@import ./assets/styles/normalize

#app
  text-align: center
  color: #333

.center
  margin: auto
  padding: 0 10px
  max-width: 1200px
  width: 100%

button
  margin: 15px

h1
  font-size: 22px
  font-weight: bold

h2
  font-size: 18px

h3
  font-size: 16px

  
</style>


