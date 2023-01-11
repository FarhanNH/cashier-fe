export const state = () => ({
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
  ],
  categories: [
    { id: false, title: 'All' },
    { id: 1, title: 'Smartphone' },
    { id: 2, title: 'Camera' },
    { id: 3, title: 'Televisi' },
  ],
  categoryId: 0,
})

export const mutations = {
  updateCategoryId(state, categoryId) {
    state.categoryId = categoryId
  },
}
