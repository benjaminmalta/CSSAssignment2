<template>
  <div class="columns">
    <div class="column is-11 is-gapless">
      <table class="table is-fullwidth">
        <thead>
            <tr>
                <th>No. </th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>isAdmin</th>
                <th></th>
            </tr>
            <tr v-for="(user, index) in allUserData" :key="user" class="country-list">
                <td>{{index+1}}</td>
                <td>{{uppercase(user.userDetails.name)}}</td>
                <td>{{uppercase(user.userDetails.surname)}}</td>
                <td>{{user.userDetails.email}}</td>
                <td>{{mobile(user.userDetails.mobileNumber)}}</td>
                <td>{{user.userDetails.isAdmin}}</td>
                <td><button class="button is-link" @click="$router.push({name: 'EditMember', params: {index: this.allUsersUid[index]}} )">Change</button></td>
            </tr>
        </thead>
    </table>
    </div>
    <div class="column is-1">
      <button class="button is-link" @click="$router.go(-1)" >Back </button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data () {
    return {
      allUsersUid: [],
      allUserData: []
    }
  },
  created () {
    this.retrieveDataFromFirebase()
  },
  computed () {
    return {
    }
  },
  methods: {
    mobile (mobile) {
      return ('+365 ' + mobile)
    },
    uppercase (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    retrieveDataFromFirebase () {
      var userPrefs = firebase.database().ref('/')
      userPrefs.once('value', (snapshot) => {
        const data = snapshot.val()
        if (data.users !== undefined) {
          this.allUsersUid = Object.keys(data.users)
          // console.log(this.allUsersUid)
          this.retrieveAllDataFromFirebase()
        }
      })
    },
    retrieveAllDataFromFirebase () {
      var userPrefs = firebase.database().ref('/users')
      userPrefs.once('value', (snapshot) => {
        const data = snapshot.val()
        for (var i = 0; i < this.allUsersUid.length; i++) {
          // console.log(data[this.allUsersUid[i]])
          // this.allUserData = {
          //   name: data[this.allUsersUid[i]].userDetails.name
          // }
          this.allUserData.push(data[this.allUsersUid[i]])
          // this.allUserData.push()
        }

        console.log(this.allUserData)
      })
    },
    test (test, bool) {
      console.log(test + ' ' + bool)
    }
  }

}
</script>

<style>
 /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>
