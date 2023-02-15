<template>
  <v-row>
    <v-col cols="10" offset="1">
      <v-card class="mb-2">
        <v-toolbar color="primary" dark>Create User</v-toolbar>
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
            <v-selec v-model="form.role" :items="roles" label="Role"></v-selec>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="onSubmit" color="primary" :disabled="isBusy">
            <span v-if="!isBusy"> Save </span>
            <v-progress-circular
              v-else
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  middleware: ['authenticated'],
  data() {
    return {
      isBusy: false,
      emailExist: false,
      form: {
        fullname: '',
        email: '',
        password: '',
        retype_password: '',
        role: '',
      },
      roles: ['employee', 'cashier', 'admin'],
      rules: {
        fullname: [
          (v) => !!v || this.$t('FIELD_REQUIRED', { field: 'Full Name' }),
        ],
        role: [(v) => !!v || this.$t('FIELD_REQUIRED', { field: 'Role' })],
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
    onSubmit() {
      this.isBusy = true
      this.$axios
        .$post('http://localhost:3000/users', this.form)
        .then((response) => {
          this.isBusy = false
          console.log(response)
          this.$router.push('/users')
        })
        .catch((error) => {
          this.isBusy = false
          console.log(error)
          if (error.response.data.message == 'EMAIL_EXIST') {
            this.emailExist = true
            this.$refs.form.validate()
          }
        })
    },
  },
}
</script>
