<template>
  <div class="columns">
<transition name="slide-fade">
  <div id="modal-activity" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
    <header class="modal-card-head">
        <p class="modal-card-title">Are you sure?</p>
      </header>
        <section class="modal-card-body">
        <p class="modal-card-body">You can update again after this.</p>
        </section>
          <footer class="modal-card-foot">
        <button class="button is-danger" @click="updateMember()">Update</button>
        <button class="button" @click="closeUpdateModal()">Cancel</button>
      </footer>
    </div>
  </div>
</transition>
      <div class="column">
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
            <div class="field">
              <label class="label">Is Admin?</label>
              <div class="{ error: v$.isAdmin.$errors.length }">
                 <input v-model="isAdmin" class="input" @blur="v$.isAdmin.$touch">
                  <div class="input-errors" v-for="error of v$.isAdmin.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
              </div>
            </div>
            </div>
            <div class="field">
              <p class="control">
                <button @click.prevent="openUpdateModal()" class="button is-success">Update</button>
                <button class="button is-link" @click="$router.push('/viewmembers')" >Back</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { required, minLength, maxLength, alpha, numeric } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
export default {
  data () {
    return {
      name: '',
      surname: '',
      mobile: '',
      isAdmin: false
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
      isAdmin: {
        required
      }
    }
  },
  created () {
    this.retrieveDataFromFirebase()
  },
  methods: {
    openUpdateModal () {
      document.getElementById('modal-activity').classList.add('is-active')
    },
    closeUpdateModal () {
      document.getElementById('modal-activity').classList.remove('is-active')
    },
    retrieveDataFromFirebase () {
      var userPrefs = firebase.database().ref('users/' + this.$route.params.index)
      userPrefs.once('value', (snapshot) => {
        const data = snapshot.val()
        this.name = data.userDetails.name
        this.surname = data.userDetails.surname
        this.mobile = data.userDetails.mobileNumber
        this.isAdmin = data.userDetails.isAdmin
        // console.log(this.mobile)
      })
    },
    updateMember () {
      firebase.database().ref('users/' + this.$route.params.index + '/userDetails').update({
        name: this.name,
        surname: this.surname,
        mobileNumber: this.mobile,
        isAdmin: this.isAdmin
      })
      this.closeUpdateModal()
    }
  }
}
</script>

<style>

</style>
