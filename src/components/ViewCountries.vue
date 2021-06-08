/* eslint-disable vue/require-v-for-key */
<template>
<div class="columns">
  <div class="column">
    <table class="table is-fullwidth">
        <thead>
            <tr>
                <th>No. </th>
                <th>Countries</th>
                <th>View</th>
            </tr>
            <tr class="country-list" v-for="(country, index) in countryList" :key=country>
                <td>{{index + 1}}</td>
                <td>{{country}}</td>
                <td><button class="button is-link" @click="$router.push({name:'ViewDetails', params: {country}})">View</button></td>
            </tr>
        </thead>
    </table>
</div>
<div class="column">
<button class="button is-link" @click="$router.go(-1)" >Back to Home</button>
</div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    this.getData()
  },
  data () {
    return {
      countryList: []

    }
  },
  methods: {
    getData () {
      const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/countries',
        headers: {
          'x-rapidapi-key': '30296793f0msh474dd261353ae25p1e4039jsnb39ad416498e',
          'x-rapidapi-host': 'covid-193.p.rapidapi.com'
        }
      }

      axios.request(options).then(response => {
        this.countryList = response.data.response
        console.log(response.data)
      }).catch(function (error) {
        console.error(error)
      })
    }
  }

}
</script>
