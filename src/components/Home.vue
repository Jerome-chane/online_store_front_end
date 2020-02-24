<template>
  <div>
    <Login></Login>
    <div class="logos">
      <!-- v-if="user && user.role == 'seller'" -->
      <img class="add" @click="goToAdd" src="../assets/add-product.png" />
      <img class="cart" @click="goToCart" src="../assets/cart.png" />
    </div>
    <products></products>
  </div>
</template>

<script>
import Login from "./Login";
import Products from "../components/Products";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: { Login, Products },
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