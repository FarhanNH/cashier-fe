export default function ({ $axios, store, redirect }) {
  $axios.onRequest((config) => {
    if (store.getters['auth/authenticated']) {
      config.headers[
        'Authorization'
      ] = `Bearer ${store.state.auth.access_token}`
    }
  })

  $axios.onResponseError((error) => {
    if (error.response.status === 401) {
      return $axios
        .$post('auth/refresh-token', {
          refreshToken: store.state.auth.refresh_token,
        })
        .then((response) => {
          console.log('RESPONSE')
          console.log(response)
          store.commit('auth/setAccessToken', response.accessToken)
          store.commit('auth/setRefreshToken', response.refreshToken)

          const originalRequest = error.config
          originalRequest.headers[
            'Authorization'
          ] = `Bearer ${response.accessToken}`

          return $axios(originalRequest)
        })
        .catch((error) => {
          console.log('ERROR')
          console.log(error.response)
          if (
            error.response.message === 'REFRESH_TOKEN_REQUIRED' ||
            error.response.message === 'REFRESH_TOKEN_EXPIRED' ||
            error.response.message === 'REFRESH_TOKEN_INVALID'
          ) {
            store.commit('auth/logout')
            return redirect('/login')
          }
        })
    }
  })
}
