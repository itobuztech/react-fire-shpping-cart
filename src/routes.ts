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
  phoneNumberVerification: '/phone-number-verification',
  forgetPassword: '/forget-password',
  listScreen: '/list-screen',
  productListForm: '/product-list-form',
  productCart: '/product-cart',
  cartItem: '/product-cart',
  checkoutScreen: '/checkout-screen',
  productDetailsScreen:'/product-detailsScreen',
  oderListScreen: '/order-list-screen', //for admin
  productListScreen: '/product-list-screen', //for admin
  userProfile: '/user-profile',
  logOut: '/logout',
  myProductList: '/myproduct-list'

};
