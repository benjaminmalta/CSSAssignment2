<template>
  <div id="app">
    <navbar />
    <section class="section">
      <div class="container is-desktop">
        <router-view v-slot="{ Component }">
          <transition name="slide-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </section>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-enter-from{
  transform: translateX(-10px);
  opacity: 0;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
</style>

<script>
import Navbar from './components/Navbar.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { Navbar },
  data () {
    return {
      kaas: true
    }
  },
  mounted () {
    this.authAction()
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth'])

  },
  methods: {
    ...mapActions(['authAction'])
  }
}
</script>
