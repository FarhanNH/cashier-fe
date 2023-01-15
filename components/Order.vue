<template>
  <v-row>
    <v-col cols="12">
      <h2>Order</h2>
      <v-list>
        <v-list-item v-for="(item, index) in cartItems" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ currency(item.price) }} X
              <v-btn
                @click="decrement(item.id)"
                icon
                class="px-0"
                color="primary"
                x-small
              >
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
              {{ item.quantity }}
              <v-btn
                @click="increment(item.id)"
                icon
                class="px-0"
                color="primary"
                x-small
              >
                <v-icon>mdi-chevron-up</v-icon>
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action>
              <v-btn @click="remove(item.id)" icon color="error" x-small>
                <v-icon>mdi-close-thick</v-icon>
              </v-btn>
              {{ currency(itemTotal(item.price, item.quantity)) }}
            </v-list-item-action>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          v-if="cartItems.length"
          class="text-h6 black--text grey lighten-2"
        >
          <v-list-item-content>
            <v-list-item-title>SUB TOTAL</v-list-item-title>
          </v-list-item-content>
          <v-list-action>
            <v-list-item-title>{{ currency(subTotal) }}</v-list-item-title>
          </v-list-action>
        </v-list-item>
        <v-list-group
          v-if="cartItems.length"
          :value="false"
          class="black--text grey lighten-3"
        >
          <template v-slot:activator>
            <v-list-item-content class="text-h6">
              <v-list-title>Additionals</v-list-title>
            </v-list-item-content>
          </template>
          <template v-for="(additional, index) in additionals">
            <v-list-item :key="index">
              <v-list-item-content>
                <v-list-title>{{ additional.title }}</v-list-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-title>{{ currency(additional.value) }}</v-list-title>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list-group>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('carts', {
      increment: 'increment',
      decrement: 'decrement',
      remove: 'remove',
    }),
    currency(value) {
      return Intl.NumberFormat('en-US').format(value)
    },
  },
  computed: {
    ...mapState('carts', {
      items: 'items',
      additionals: 'additionals',
    }),
    ...mapGetters('carts', {
      cartItems: 'cartItems',
      itemTotal: 'itemTotal',
      subTotal: 'subTotal',
    }),
  },
}
</script>
