<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card class="mb-2">
        <v-toolbar color="primary" dark>Login</v-toolbar>
        <v-card-text>
          <v-alert v-if="message" color="red lighten-2" dark>
            {{ message }}
          </v-alert>
          <v-form>
            <v-text-field
              name="email"
              label="Email"
              type="email"
              :rules="rules.email"
              v-model="form.email"
            />
            <v-text-field
              name="password"
              label="Password"
              type="password"
              :rules="rules.password"
              v-model="form.password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="onSubmit" color="primary" :disabled="isBusy">
            <span v-if="!isBusy"> Login </span>
            <v-progress-circular
              v-else
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>
      <p>
        Belum punya akun?
        <v-btn to="/register" text color="primary">Register</v-btn>
      </p>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      isBusy: false,
      message: '',
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          (v) => !!v || 'Email is required',
          (v) => /.+@.+/.test(v) || 'Email invalid',
        ],
        password: [(v) => !!v || 'Password is required'],
      },
    }
  },
  methods: {
    storeWelcomeScreen() {
      localStorage.setItem('welcomeScreen', true)
    },
    onSubmit() {
      this.isBusy = true
      this.$axios
        .$post('http://localhost:3000/auth/login', this.form)
        .then((response) => {
          this.isBusy = false
          console.log(response)
          if (!localStorage.welcomeScreen) {
            this.storeWelcomeScreen()
          }
          this.$router.push('/dashboard')
        })
        .catch((error) => {
          this.isBusy = false
          console.log(error.response)
          this.message = error.response.data.message
        })
    },
  },
}
</script>
