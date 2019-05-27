<template>
  <header>
    <div class="header-top">
      <div class="header-top__wraper center">
        <ul class="header-top__items">
          <li>
            <router-link
              class="header-top__link 
                    header-top__link_padding"
              to="/about"
            >
              About
            </router-link>
          </li>
        </ul>
        <ul class="header-top__items">
          <li v-if="!auth" class="sign-up">
            <router-link class="header-top__link" to="/signin">SignIn</router-link>
          </li>
          <li v-if="auth" class="sign-up">
            <a href="#" class="header-top__link" @click="onLogout">Logout</a>
          </li>
          <li v-if="!auth" class="sign-up dropdown-my">
            <a href="#" class="header-top__link">SignUp</a>
            <div class="my-dropdown-content">
              <ul class="dropdown-my">
                <li class="dropdown-my__item">
                  <router-link to="/signup">
                    <button class="dropdown-my__button">
                      As gamer
                    </button>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      auth: 'isAuthentificate'
    })
  },
  methods: {
    ...mapActions({
      onLogout: 'logout'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass" src="../assets/styles/Header/header.sass"></style>
