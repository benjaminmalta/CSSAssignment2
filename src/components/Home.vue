<template>
<div class="container" v-if="isUserAuth">
<div class="columns">
<transition name="slide-fade">
  <div id="modal-activity" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
    <header class="modal-card-head">
        <p class="modal-card-title">Are you sure?</p>
      </header>
        <section class="modal-card-body">
        <p class="modal-card-body">You can bookmark the country again after deletion</p>
        </section>
          <footer class="modal-card-foot">
        <button class="button is-danger" @click="deleteFav()">Delete</button>
        <button class="button" @click="closeDeleteModal()">Cancel</button>
      </footer>
    </div>
  </div>
</transition>
  </div>
  <div class="columns">
      <div id="btn-grp" class="buttons is-inline-block" v-for="fav in favorite" :key="fav">
    <transition-group name="list" tag="p">
        <button class="button is-link" @click="getDataWithButton(fav)" >{{fav}}</button>
        <button class="button is-danger is-outlined" @click="openDeleteModal(fav)" ><span class="icon is-small"><i class="fas fa-times"></i></span></button>
    </transition-group>
      </div>
  </div>
    <div class="columns">
      <button class="button is-secondary" @click="retrieveDataFromFireBase()">Retrieve</button>
      <input id="inputField" class="input is-primary" type="text" placeholder="Search Country">
      <button class="button is-primary" @click="getDataWithSearch()">Search</button>
      <button class="button is-link" @click="storeDataInFireBase()" v-if="response.country" >Add To Favorite</button>
    </div>
    <section class="section">

      <div class="notification is-danger" v-if="show" >
        <button class="delete" @click="dontShow()" ></button>
        <p>Not Found</p>
        <p>Please Search Again</p>
      </div>

  <div class="columns" >
    <transition name="fade">
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" v-if="response.country">
        <tr class="is-selected">
          <th>Date</th>
          <td>{{response.date}}</td>
        </tr>
        <tr>
          <th>Country</th>
          <td>{{response.country}}</td>
        </tr>
        <tr>
          <th>Population</th>
          <td>{{response.population}}</td>
        </tr>
        <tr>
          <th>Total Cases</th>
          <td>{{response.total}}</td>
        </tr>
        <tr>
          <th>Active Cases</th>
          <td>{{response.active}}</td>
        </tr>
        <tr>
          <th>Recovered</th>
          <td>{{response.recovered}}</td>
        </tr>
        <tr>
          <th>New Cases</th>
          <td>{{response.newc}}</td>
        </tr>
        <tr>
          <th>New Deaths</th>
          <td>{{response.newdeaths}}</td>
        </tr>
        <tr>
          <th>Total Deaths</th>
          <td>{{response.totaldeaths}}</td>
        </tr>
        <tr>
          <th>Tests</th>
          <td>{{response.tests}}</td>
        </tr>
      </table>
      </transition>
  </div>
    </section>
</div>

</template>
<style scoped>
#btn-grp{
  padding-right: 1%;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import firebase from 'firebase/app'

export default {
  created () {
    console.log('Mounted')
    setTimeout(() => {
      this.waitForAuth()
    },
    1000)
  },
  data () {
    return {
      response: {},
      count: '',
      show: false,
      favorite: [],
      shownCountry: null,
      deleteSelection: ''
    }
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth'])
  },
  methods: {
    ...mapActions(['setAdminStatus']),
    openDeleteModal (fav) {
      this.deleteSelection = fav
      document.getElementById('modal-activity').classList.add('is-active')
    },
    closeDeleteModal () {
      document.getElementById('modal-activity').classList.remove('is-active')
    },
    getDataWithButton (value) {
      var country = value
      // console.log(country)
      this.getData(country)
    },
    getDataWithSearch () {
      var country = document.getElementById('inputField').value
      this.getData(country)
    },
    getData (country) {
      if (!(!country || country.length === 0)) {
        const apiClient = {
          method: 'GET',
          url: 'https://covid-193.p.rapidapi.com/statistics',
          params: { country },
          headers: {
            'x-rapidapi-key': '30296793f0msh474dd261353ae25p1e4039jsnb39ad416498e',
            'x-rapidapi-host': 'covid-193.p.rapidapi.com'
          }
        }
        axios.request(apiClient).then(response => {
          // console.log(response.data)
          // console.log(response.data.response[0].cases.new)
          if (response.status === 200 && response.data.results > 0) {
            this.show = false
            this.response.date = response.data.response[0].day
            this.response.country = response.data.response[0].country
            this.response.population = 0 + response.data.response[0].population
            this.response.total = 0 + response.data.response[0].cases.total
            this.response.active = 0 + response.data.response[0].cases.active
            this.response.recovered = 0 + response.data.response[0].cases.recovered
            this.response.newc = response.data.response[0].cases.new
            this.response.newdeaths = response.data.response[0].deaths.new
            this.response.totaldeaths = 0 + response.data.response[0].deaths.total
            this.response.tests = 0 + response.data.response[0].tests.total
            this.shownCountry = response.data.response[0].country
          } else {
            this.show = true
          }
        }).catch(function (error) {
          console.error(error)
        })
      }
    },
    dontShow () {
      this.show = false
    },
    storeDataInFireBase () {
      this.retrieveDataFromFireBase()
      console.log(this.getUser.uid)
      if (this.shownCountry !== undefined) {
        setTimeout(() => {
          var country = this.shownCountry
          if (!this.favorite.includes(country)) {
            this.favorite.push(country)
          }
          firebase.database().ref('users/' + this.getUser.uid).update({
            favorite: this.favorite
          })
        }, 500)
      }
    },
    retrieveDataFromFireBase () {
      console.log(this.getUser)
      if (this.isUserAuth) {
        var userPrefs = firebase.database().ref('users/' + this.getUser.uid)
        userPrefs.once('value', (snapshot) => {
          const data = snapshot.val()
          if (data.favorite !== undefined) {
            this.favorite = data.favorite
            // console.log(data.userDetails.isAdmin)
            this.setAdminStatus({ isAdmin: data.userDetails.isAdmin })
          }
        })
      }
    },
    deleteFav () {
      this.retrieveDataFromFireBase()
      const fav = this.deleteSelection
      setTimeout(() => {
        var index = this.favorite.indexOf(fav)
        console.log(index)
        this.favorite.splice(index, 1)
        firebase.database().ref('users/' + this.getUser.uid).update({
          favorite: this.favorite
        })
      }, 100)
      this.closeDeleteModal()
    },
    waitForAuth () {
      console.log('Retrieving')
      this.retrieveDataFromFireBase()
    }
  }
}
</script>
