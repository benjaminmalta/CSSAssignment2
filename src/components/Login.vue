<template>
<div class="columns" v-if="!isUserAuth">
    <div class="column is-half is-offset-one-quarter">
      <div class="card">
        <div class="card-content">
          <form>
            <div class="field">
              <label class="label">E-mail</label>
              <div class="{ error: v$.email.$errors.length }">
                 <input v-model.trim="email" class="input" @blur="v$.email.$touch">
                  <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="{ error: v$.password.$errors.length }">
                 <input v-model.trim="password" class="input" @blur="v$.password.$touch" type="password">
                  <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
              </div>
            </div>
            <div class="field">
              <p class="control">
                <button @click.prevent="signIn()" class="button is-success">
                  Login
                  </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, minLength, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
  data () {
    return {
      email: null,
      password: null,
      validationErrors: [],
      firebaseError: ''
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  validations () {
    return {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(3)
      }
    }
  },
  computed: {
    ...mapGetters(['isUserAuth'])
  },
  methods: {
    ...mapActions(['signInAction']),
    resetError () {
      this.validationErrors = []
    },
    signIn () {
      this.signInAction({ email: this.email, password: this.password })
      this.$router.push('/home')
    }
  }
}
</script>
