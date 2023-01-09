<template>
  <v-row>
    <v-row>
      <v-col cols="10">
        <v-autocomplete
          label="Products"
          placeholder="Start typing to search"
          :search-input.sync="search"
          :loading="isLoading"
          :items="itemsSearch"
          item-text="title"
          item-value="id"
          v-model="selectedSearch"
          return-object
          hide-no-data
        ></v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-menu>
          <template v-slot:activator="{ on: category }">
            <v-btn v-on="category" color="primary"> Category </v-btn>
          </template>

          <v-list>
            <v-list-item-group v-model="categoryId">
              <v-list-item
                v-for="(category, index) in categories"
                :key="index"
                :value="category.id"
                :disabled="category.id == categoryId"
              >
                <v-list-item-title>{{ category.title }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" v-for="(product, index) in filteredProducts" :key="index">
        <v-card :title="product.title" ripple="true">
          <v-card-action>
            <v-img
              :src="require(`@/assets/images/products/${product.thumbnail}`)"
            >
            </v-img>
          </v-card-action>
          <v-card-text align="center" class="product-title">
            {{ product.title }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      categoryId: false,
      categories: [
        { id: false, title: 'All' },
        { id: 1, title: 'Smartphone' },
        { id: 2, title: 'Camera' },
        { id: 3, title: 'Televisi' },
      ],
      products: [
        {
          id: 1,
          title: 'Asus Zenfone',
          thumbnail: 'asus-zenfone.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 2,
          title: 'Canon EOS 700d',
          thumbnail: 'canon-eos-700d.png',
          price: 2000000,
          categoryId: 2,
        },
        {
          id: 3,
          title: 'Canon EOS 750d',
          thumbnail: 'canon-eos-750d.png',
          price: 2000000,
          categoryId: 2,
        },
        {
          id: 4,
          title: 'Iphone 6 Silver',
          thumbnail: 'iphone-6-silver.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 5,
          title: 'Lenovo A7000',
          thumbnail: 'Lenovo-A7000.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 6,
          title: 'LG LED TV 32',
          thumbnail: 'lg-32-led-tv-32LF550A.png',
          price: 2000000,
          categoryId: 3,
        },
        {
          id: 7,
          title: 'LG LED TV 32',
          thumbnail: 'lg-led-tv32-32LF520A.png',
          price: 2000000,
          categoryId: 3,
        },
        {
          id: 8,
          title: 'MI 4I',
          thumbnail: 'mi-4i.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 9,
          title: 'Nikon d3200',
          thumbnail: 'nikon-d3200.png',
          price: 2000000,
          categoryId: 2,
        },
        {
          id: 10,
          title: 'Nikon d5200',
          thumbnail: 'nikon-d5200.png',
          price: 2000000,
          categoryId: 2,
        },
        {
          id: 11,
          title: 'Samsung Galaxy A3',
          thumbnail: 'samsung-galaxy-A3.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 12,
          title: 'Samsung Galaxy A8',
          thumbnail: 'samsung-galaxy-A8.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 13,
          title: 'Samsung Galaxy Grand Prime',
          thumbnail: 'samsung-galaxy-grand-prime.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 14,
          title: 'Samsung Galaxy Note 3',
          thumbnail: 'samsung-galaxy-note-3.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 15,
          title: 'Sharp LED TV 32',
          thumbnail: 'sharp-32-led-32LE265i.png',
          price: 2000000,
          categoryId: 3,
        },
        {
          id: 1,
          title: 'Asus Zenfone',
          thumbnail: 'asus-zenfone.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 2,
          title: 'Canon EOS 700d',
          thumbnail: 'canon-eos-700d.png',
          price: 2000000,
          categoryId: 2,
        },
        {
          id: 3,
          title: 'Canon EOS 750d',
          thumbnail: 'canon-eos-750d.png',
          price: 2000000,
          categoryId: 2,
        },
        {
          id: 4,
          title: 'Iphone 6 Silver',
          thumbnail: 'iphone-6-silver.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 5,
          title: 'Lenovo A7000',
          thumbnail: 'Lenovo-A7000.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 6,
          title: 'LG LED TV 32',
          thumbnail: 'lg-32-led-tv-32LF550A.png',
          price: 2000000,
          categoryId: 3,
        },
        {
          id: 7,
          title: 'LG LED TV 32',
          thumbnail: 'lg-led-tv32-32LF520A.png',
          price: 2000000,
          categoryId: 3,
        },
        {
          id: 8,
          title: 'MI 4I',
          thumbnail: 'mi-4i.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 9,
          title: 'Nikon d3200',
          thumbnail: 'nikon-d3200.png',
          price: 2000000,
          categoryId: 2,
        },
        {
          id: 10,
          title: 'Nikon d5200',
          thumbnail: 'nikon-d5200.png',
          price: 2000000,
          categoryId: 2,
        },
        {
          id: 11,
          title: 'Samsung Galaxy A3',
          thumbnail: 'samsung-galaxy-A3.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 12,
          title: 'Samsung Galaxy A8',
          thumbnail: 'samsung-galaxy-A8.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 13,
          title: 'Samsung Galaxy Grand Prime',
          thumbnail: 'samsung-galaxy-grand-prime.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 14,
          title: 'Samsung Galaxy Note 3',
          thumbnail: 'samsung-galaxy-note-3.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 15,
          title: 'Sharp LED TV 32',
          thumbnail: 'sharp-32-led-32LE265i.png',
          price: 2000000,
          categoryId: 3,
        },
        {
          id: 1,
          title: 'Asus Zenfone',
          thumbnail: 'asus-zenfone.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 2,
          title: 'Canon EOS 700d',
          thumbnail: 'canon-eos-700d.png',
          price: 2000000,
          categoryId: 2,
        },
        {
          id: 3,
          title: 'Canon EOS 750d',
          thumbnail: 'canon-eos-750d.png',
          price: 2000000,
          categoryId: 2,
        },
        {
          id: 4,
          title: 'Iphone 6 Silver',
          thumbnail: 'iphone-6-silver.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 5,
          title: 'Lenovo A7000',
          thumbnail: 'Lenovo-A7000.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 6,
          title: 'LG LED TV 32',
          thumbnail: 'lg-32-led-tv-32LF550A.png',
          price: 2000000,
          categoryId: 3,
        },
        {
          id: 7,
          title: 'LG LED TV 32',
          thumbnail: 'lg-led-tv32-32LF520A.png',
          price: 2000000,
          categoryId: 3,
        },
        {
          id: 8,
          title: 'MI 4I',
          thumbnail: 'mi-4i.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 9,
          title: 'Nikon d3200',
          thumbnail: 'nikon-d3200.png',
          price: 2000000,
          categoryId: 2,
        },
        {
          id: 10,
          title: 'Nikon d5200',
          thumbnail: 'nikon-d5200.png',
          price: 2000000,
          categoryId: 2,
        },
        {
          id: 11,
          title: 'Samsung Galaxy A3',
          thumbnail: 'samsung-galaxy-A3.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 12,
          title: 'Samsung Galaxy A8',
          thumbnail: 'samsung-galaxy-A8.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 13,
          title: 'Samsung Galaxy Grand Prime',
          thumbnail: 'samsung-galaxy-grand-prime.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 14,
          title: 'Samsung Galaxy Note 3',
          thumbnail: 'samsung-galaxy-note-3.png',
          price: 2000000,
          categoryId: 1,
        },
        {
          id: 15,
          title: 'Sharp LED TV 32',
          thumbnail: 'sharp-32-led-32LE265i.png',
          price: 2000000,
          categoryId: 3,
        },
      ],
      search: null,
      isLoading: false,
      itemsSearch: [],
      selectedSearch: null,
    }
  },
  methods: {
    resetSearchCategory() {
      this.categoryId = false
    },
  },
  computed: {
    filteredProducts() {
      if (this.categoryId) {
        return this.products.filter((s) => s.categoryId == this.categoryId)
      } else if (this.selectedSearch) {
        return this.products.filter((s) => s.title == this.selectedSearch.title)
      }

      return this.products
    },
  },
  watch: {
    search(val) {
      this.isLoading = true
      setTimeout(() => {
        this.itemsSearch = this.products.filter((e) => {
          this.isLoading = false
          this.resetSearchCategory
          return e.title
        })
      }, 1000)
    },
  },
}
</script>
<style lang="scss" scoped>
.product-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
