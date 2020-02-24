<template>
  <div>
    <NavBar></NavBar>
    <br />
    <div class="container">
      <h1>My Products</h1>
      <div class="products" v-if="sellerProducts">
        <div v-for="(product,index) in sellerProducts" :key="index">
          <div class="single_product">
            <p>{{product.name}}</p>
            <p>Category: {{product.category}}</p>
            <p>{{product.description}}</p>
            <p>Stock: {{product.stock}}</p>
            <p>Price: {{product.price}}</p>

            <div v-for="(image,index) in product.images" :key="index">
              <img v-bind:src="image" class="img" />
            </div>
            <p class="btn btn-info" @click="edit(product.id)">Edit</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: { NavBar },
  methods: {
    edit(id) {
      this.$router.push({
        name: "Edit",
        params: { product_id: id }
      });
    }
  },
  computed: { ...mapGetters(["sellerProducts"]) },
  watch: {
    sellerProducts() {
      console.log("S", this.sellerProducts);
    }
  },
  created() {
    this.$store.dispatch("getSellerProducts");
  }
};
</script>

<style scoped>
.products {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.single_product {
  margin: 30px;
}
</style>