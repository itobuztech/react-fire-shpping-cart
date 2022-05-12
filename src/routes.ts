export const routes = {
  home: '/',
  login: '/login',
  registration: '/register',
  emailVerification: '/email-verification',
  phoneNumberVerification: '/phone-number-verification',
  forgetPassword: '/forget-password',
  listScreen: '/list-screen',
  productListForm: '/product-list-form', //for admin
  productListEdit: {
    match:'/product-list-edit/:productId',
    build: (productId: string) => 
      `/product-list-edit/${productId}`
  }, // for admin
  categoryListForm: '/category-list-form', // for admin
  productCart: '/product-cart',
  orderList: '/order-list',
  orderDetails: '/order-details',
  productCategoryList: '/product-category-list',
  cartItem: '/product-cart',
  checkoutScreen: '/checkout-screen',
  productDetailsScreen:'/product-detailsScreen',
  oderListScreen: '/order-list-screen', //for admin
  productListScreen: '/product-list-screen', //for admin
  categoryListScreen: '/category-list-screen', //for admin
  userProfile: '/user-profile',
  logOut: '/logout'
};
