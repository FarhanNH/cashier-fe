<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card class="mb-2">
        <v-toolbar color="primary" dark>Register</v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              name="name"
              label="Full Name"
              type="text"
              :rules="rules.fullname"
              v-model="form.fullname"
            />
            <v-text-field
              name="email"
              label="Email"
              type="email"
              :rules="rules.email"
              v-model="form.email"
              @keydown="resetEmailExist"
            />
            <v-text-field
              name="password"
              label="Password"
              type="password"
              :rules="rules.password"
              v-model="form.password"
            />
            <v-text-field
              name="repassword"
              label="Re-Password"
              type="password"
              :rules="rules.retype_password"
              v-model="form.retype_password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="onSubmit" color="primary" :disabled="isBusy">
            <span v-if="!isBusy"> Register </span>
            <v-progress-circular
              v-else
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>
      <p>
        Sudah punya akun? <v-btn to="/login" text color="primary">Login</v-btn>
      </p>
    </v-col>
  </v-row>
</template>
<script>
export default {
  middleware: ['unauthenticated'],
  data() {
    return {
      isBusy: false,
      emailExist: false,
      form: {
        fullname: '',
        email: '',
        password: '',
        retype_password: '',
      },
      rules: {
        fullname: [
          (v) => !!v || this.$t('FIELD_REQUIRED', { field: 'Full Name' }),
        ],
        email: [
          (v) => !!v || this.$t('FIELD_REQUIRED', { field: 'Email' }),
          (v) =>
            /.+@.+/.test(v) || this.$t('FIELD_INVALID', { field: 'Email' }),
          (v) => !this.emailExist || this.$t('EMAIL_EXIST'),
        ],
        password: [
          (v) => !!v || this.$t('FIELD_REQUIRED', { field: 'Password' }),
          (v) =>
            v.length >= 8 ||
            this.$t('FIELD_MIN', { field: 'Password', min: 8 }),
        ],
        retype_password: [
          (v) =>
            v === this.form.password ||
            this.$t('FIELD_CONFIRM', {
              field: 'Password',
              confirm: 'Re-Password',
            }),
        ],
      },
    }
  },
  methods: {
    resetEmailExist() {
      this.emailExist = false
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.isBusy = true
        this.$axios
          .$post('/auth/register', this.form)
          .then((response) => {
            this.isBusy = false
            console.log(response)
            this.$router.push('/login')
          })
          .catch((error) => {
            this.isBusy = false
            console.log(error)
            if (error.response.data.message == 'EMAIL_EXIST') {
              this.emailExist = true
              this.$refs.form.validate()
            }
          })
      }
    },
  },
}
</script>
