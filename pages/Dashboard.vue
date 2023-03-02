<template>
  <v-row>
    <v-col cols="10" offset="1">
      <v-card class="mb-2">
        <v-toolbar color="primary" dark>Dashboard</v-toolbar>
        <v-card-text>
          <h2>Hello name,</h2>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ['authenticated'],
  // computed: {
  //   ...mapGetters('auth', {
  //     authenticated: 'authenticated',
  //   }),
  // },
  head: {
    title: 'Dashboard',
  },
}
</script>
