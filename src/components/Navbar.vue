<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand" style="align-items: center;">
      <router-link to="/home">
      <img
        src="https://www.invasivespecies.scot/sites/sisi8/files/styles/hero/public/_hero%20image%20covid.png?itok=i0l-YZwQ"
        style="height: 50px; margin: 20px;"
      />
      </router-link>
      <span class="has-text-weight-medium is-size-4">
      Covid-19 Information
      </span>
    </div>
    <div id="navbarBasicExample" class="navbar-menu is-active">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="!isUserAuth">
            <router-link
              v-for="item of navItems"
              :key="item.name"
              :to="item.to"
              class="button is-primary"
            >
              <span class="icon">
                <i :class="`fas fa-${item.icon}`"></i>
              </span>
              <strong>{{ item.name }}</strong>
            </router-link>
            </template>
            <div class="column">
                  <span class="has-text-weight-medium is-size-10">
                    {{fullEmail}}
                  </span>
                </div>
            <template v-if="isUserAuth">
              <div class="columns">
                <div class="column">
                  <button class="button is-primary" @click="goTo('/viewCountries')">View All Countries</button>
                  <button class="button is-Secondary" v-if="getAdminState" @click="goTo('/viewmembers') ">View Members</button>
                  <button @click="signOut" class="button is-danger">
                    <span class="icon">
                      <i class="fas fa-sign-out-alt"></i>
                    </span>
                    <strong>Log out</strong>
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      navItems: [
        { name: 'Login', to: '/login', icon: 'lock' },
        { name: 'Register', to: '/register', icon: 'key' }
      ]
    }
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth', 'getAdminState']),
    fullEmail () {
      if (this.getUser !== null) {
        return this.getUser.displayName + ' | ' + this.getUser.email
      } else {
        return ''
      }
    }
  },
  methods: {
    ...mapActions(['signOutAction']),
    signOut () {
      this.signOutAction()
      this.$router.push('/home')
    },
    goTo (value) {
      this.$router.push(value)
    }
  }
}
</script>
