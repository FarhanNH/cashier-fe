<template>
  <v-row>
    <v-col cols="8" class="frame-content px-6">
      <products />
    </v-col>
    <v-col cols="4" class="frame-content white"> ORDERS </v-col>
  </v-row>
</template>

<script>
import Products from '~/components/Products.vue'
export default {
  components: { Products },
  name: 'IndexPage',
}
</script>
