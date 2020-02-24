import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Cart from "../components/Cart.vue";
import ProductDetail from "../components/ProductDetail.vue";
import AddProduct from "../components/AddProduct.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  },
  {
    path: "/product/:product_id",
    name: "Product Detail",
    component: ProductDetail,
    props: true
  },
  {
    path: "/add",
    name: "Add",
    component: AddProduct
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
