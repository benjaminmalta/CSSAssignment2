<template>
    <div class="columns is-gapless" >
      <div class="column">
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
  </div>
    <div class="column is-one-fifth ">
      <button class="button is-link" @click="$router.push({name:'ViewCountries'})" >Back</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      response: {},
      country: ''
    }
  },
  created () {
    console.log(this.$route.params.country)
    this.getData(this.$route.params.country)
  },
  methods: {
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
    }
  }
}
</script>
