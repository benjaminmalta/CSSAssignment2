<template>
<div class="columns" v-if="!isUserAuth">
    <div class="column is-half is-offset-one-quarter">
      <div class="card">
        <div class="card-content">
          <form>
            <div class="column is-variable">
            <div class="field">
              <label class="label">Name</label>
                 <input type="text" v-model="name" class="input" @blur="v$.name.$touch">
                  <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
              </div>
            <div class="field">
              <label class="label">Surname</label>
              <div class="control">
              <div class="{ error: v$.surname.$errors.length }">
                 <input v-model="surname" class="input" @blur="v$.surname.$touch">
                  <div class="input-errors" v-for="error of v$.surname.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
              </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Mobile</label>
              <div class="{ error: v$.mobile.$errors.length }">
                 <input v-model="mobile" class="input" @blur="v$.mobile.$touch">
                  <div class="input-errors" v-for="error of v$.mobile.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
              </div>
            </div>
            </div>
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
              <label class="label">Repeat Password</label>
              <div class="control">
                <div class="{ error: v$.passwordRepeat.$errors.length }">
                  <input type="password" @blur="v$.passwordRepeat.$touch" class="input" v-model.trim="passwordRepeat" >
                  <div class="input-errors" v-for="error of v$.passwordRepeat.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="field">
              <p class="control">
                <button @click.prevent="signUp()" class="button is-success">
                  Sign Up
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
import { mapActions } from 'vuex'
import { required, minLength, maxLength, alpha, numeric, email, sameAs } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
  data () {
    return {
      name: '',
      surname: '',
      mobile: '',
      email: '',
      password: '',
      passwordRepeat: '',
      validationErrors: [],
      firebaseError: ''
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  validations () {
    return {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(15),
        alpha
      },
      surname: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(15),
        alpha
      },
      mobile: {
        required,
        numeric,
        minLength: minLength(8),
        maxLength: maxLength(15)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(3)
      },
      passwordRepeat: {
        required,
        minLength: minLength(3),
        sameAsPass: sameAs(this.password)
      }
    }
  },
  methods: {
    ...mapActions(['signUpAction']),
    resetError () {
      this.validationErrors = []
    },
    signUp () {
      this.signUpAction({ email: this.email, password: this.password, name: this.name, surname: this.surname, mobileNumber: this.mobile })
      this.$router.push('/home')
      console.log(this.mobile)
    }
  }
}
</script>
