<template>
  <div>
    <NavBar></NavBar>
    <LoginForm></LoginForm>
    <br />
    <br />

    <div class="container">
      <div class="logos">
        <img
          v-if="user && user.role == 'seller'"
          class="add"
          @click="goToAdd"
          src="../assets/add-product.png"
        />
        <img class="cart" @click="goToCart" src="../assets/cart.png" />
      </div>
      <br />
      <br />
      <br />
      <products></products>
    </div>
  </div>
</template>

<script>
import Login from "./Login";
import Products from "../components/Products";
import LoginForm from "../components/LoginForm";
import NavBar from "../components/NavBar";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: { Login, Products, NavBar, LoginForm },
  methods: {
    goToCart() {
      this.$router.push("cart");
    },
    goToAdd() {
      if (this.user != null && this.user.role == "seller") {
        this.$router.push("add");
      }
    }
  },
  computed: { ...mapGetters(["user"]) },
  watch: {},
  created() {
    this.$store.dispatch("getProducts");
  }
};
</script>

<style scoped>
.logos {
  display: flex;
  justify-content: space-between;
}
.cart {
  height: 83px;
  width: 83px;
  border-radius: 7px;
  margin-top: 1%;
}
</style>