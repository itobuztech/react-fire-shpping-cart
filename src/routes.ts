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
  productListForm: '/product-list-form', //for admin
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
  logOut: '/logout',
  myProductCreate: '/myproduct-create',
  myProductList: '/myproduct-list',
  myProductEdit: {
    match: '/myproduct-update/:id',
    build: (id: string ) =>
       `/myproduct-update/${id}`
  },
};
