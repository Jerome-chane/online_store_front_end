<template>
  <div>
    <h1>PRODUCTS</h1>
    <div class="products" v-if="products">
      <div v-for="(product,index) in products" :key="index">
        <div class="single_product">
          <p>{{product.name}}</p>
          <p>Category: {{product.category}}</p>
          <p>{{product.description}}</p>
          <p>Stock: {{product.stock}}</p>
          <p>Price: {{product.price}}</p>

          <div v-for="(image,index) in products.images" :key="index">
            <img v-bind:src="image" class="img" />
          </div>
          <p class="btn btn-info" @click="viewProduct(product.id)">View Product</p>
          <p></p>
          <div class="add_to_cart">
            <p>
              <input
                class="add_to_cart_input"
                placeholder="quantity..."
                type="number"
                v-model="product.quantity"
              />
            </p>
            <p class="btn btn-warning" @click="addToCart(product)">Add to Cart</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },

  methods: {
    viewProduct(id) {
      this.$router.push({
        name: "Product Detail",
        params: { product_id: id }
      });
    },
    addToCart(product) {
      if (this.cart.every(item => (item.id == product.id ? false : true))) {
        // check if the book is already in the cart or not IF not book will be added
        this.$store.commit("addToCart", product);
        console.log("added to card");
      } else alert("Item already in Cart");
    }
  },
  computed: {
    ...mapGetters(["products", "cart"])
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
.add_to_cart_input {
  width: 30px;
}
</style>