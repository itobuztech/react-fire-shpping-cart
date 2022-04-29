export const routes = {
  login: '/',
  registration: '/register',
  forgetPassword: '/forgetPassword',
  resetPassword: '/passwordReset',
  listScreen: '/listScreen',
  categoryCreate: '/category-action',
  categoryEdit: {
    match: '/category-action/:id',
    build: (id: string ) =>
       `/category-action/${id}`
  },
  categoryList: '/categories'
};