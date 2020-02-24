<template>
  <div>
    <h1>PRODUCT DETAIL PAGE</h1>

    <p class="btn btn-info" @click="goBack">Go back</p>
    <p></p>

    <p>Name: {{product.name}}</p>
    <p>Cathegory: {{product.cathegory}}</p>
    <p>Description: {{product.desciption}}</p>
    <p>Stock: {{product.stock}}</p>
    <p>Price: {{product.price}}</p>
    <div v-for="(image,index) in products.images" :key="index">
      <img v-bind:src="image" class="img" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      product: null
    };
  },
  props: ["product_id"],
  methods: {
    goBack() {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters(["products"])
  },
  created() {
    this.products.forEach(element => {
      // when page is created this function will look for the matching product id in the array of all the products
      if (element.id == this.product_id) {
        this.product = element;
      }
    });
  }
};
</script>

<style>
</style>