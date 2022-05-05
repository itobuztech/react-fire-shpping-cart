export const routes = {
  home: '/',
  login: '/login',
  registration: '/register',
  resetPassword: '/passwordReset',
  categoryCreate: '/category-action',
  categoryEdit: {
    match: '/category-action/:id',
    build: (id: string ) =>
       `/category-action/${id}`
  },
  categoryList: '/categories',
  categoryDetails: {
    match: '/category-details/:id',
    build: (id: string ) =>
       `/category-details/${id}`
  },
  emailVerification: '/email-verification',
  numberVerification: '/number-verification',
  forgetPassword: '/forget-password',
  listScreen: '/list-screen',
  productCart: '/product-cart',
  productDetailsScreen:'/product-detailsScreen',
  logOut: '/logout'
};
