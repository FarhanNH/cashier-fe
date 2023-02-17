<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card class="mb-2">
        <v-toolbar color="primary" dark>Login</v-toolbar>
        <v-card-text>
          <v-alert v-if="message" color="red lighten-2" dark>
            {{ $t(message) }}
          </v-alert>
          <v-form ref="form">
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
import { mapMutations } from 'vuex'
export default {
  middleware: ['unauthenticated'],
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
          (v) => !!v || this.$t('FIELD_REQUIRED', { field: 'Email' }),
          (v) =>
            /.+@.+/.test(v) || this.$t('FIELD_INVALID', { field: 'Email' }),
        ],
        password: [
          (v) => !!v || this.$t('FIELD_REQUIRED', { field: 'Password' }),
        ],
      },
    }
  },
  methods: {
    ...mapMutations('auth', {
      setAccessToken: 'setAccessToken',
      setRefreshToken: 'setRefreshToken',
      setFullname: 'setFullname',
    }),
    storeWelcomeScreen() {
      localStorage.setItem('welcomeScreen', true)
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.isBusy = true
        this.$axios
          .$post('/auth/login', this.form)
          .then((response) => {
            //login success
            this.isBusy = false

            //store passed welcome screen
            if (!localStorage.welcomeScreen) {
              this.storeWelcomeScreen()
            }

            //store auth data
            this.setAccessToken(response.accessToken)
            this.setRefreshToken(response.refreshToken)
            this.setFullname(response.fullname)

            //redirect to login page
            this.$router.push('/dashboard')
          })
          .catch((error) => {
            this.isBusy = false
            console.log(error.response)
            this.message = error.response.data.message
          })
      }
    },
  },
  mounted() {
    if (this.$route.params.message == 'AUTH_REQUIRED') {
      this.message = 'AUTH_REQUIRED'
    }
  },
}
</script>
