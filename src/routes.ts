export const routes = {
  home: '/',
  login: '/login',
  registration: '/register',
  emailVerification: '/email-verification',
  phoneNumberVerification: '/phone-number-verification',
  forgetPassword: '/forget-password',
  listScreen: '/list-screen',
  productDetailsScreen: {
    match: '/product-details-screen/:productId',
    build: (productId: string) => `/product-details-screen/${productId}`,
  },
  productListForm: '/product-list-form', //for admin
  productListEdit: {
    match: '/product-list-edit/:productId',
    build: (productId: string) => `/product-list-edit/${productId}`,
  }, // for admin
  categoryListForm: '/category-list-form', // for admin
  categoryListEdit: {
    match: '/category-list-edit/:categoryId',
    build: (categoryId: string) => `/category-list-edit/${categoryId}`,
  }, // for admin
  productCart: '/product-cart',
  orderList: '/order-list',
  orderDetails: '/order-details',
  productCategoryList: '/product-category-list',
  cartItem: '/product-cart',
  checkoutScreen: '/checkout-screen',
  orderScreen: '/order-screen',

  oderListScreen: '/order-list-screen', //for admin
  productListScreen: '/product-list-screen', //for admin
  categoryListScreen: '/category-list-screen', //for admin
  userProfile: '/user-profile',
  logOut: '/logout',
};
