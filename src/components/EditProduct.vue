<template>
  <div>
    <br />
    <br />
    <br />
    <!-- <div v-if="product">
      Name:
      <input :placeholder="product.name" v-model="product.name" />
      <p>
        Category:
        <input :placeholder="product.category" v-model="product.category" />
      </p>
      <p>
        Description:
        <input :placeholder="product.description" v-model="product.description" />
      </p>
      <p>
        Stock:
        <input :placeholder="product.stock" v-model="product.stock" type="number" />
      </p>
      <p>
        Price:
        <input :placeholder="product.price" v-model="product.price" type="number" />Euros
      </p>
    </div>-->
    <!-- Default form contact -->

    <form class="text-center border border-light p-5" action="#!">
      <p class="h4 mb-4">{{product.name}}</p>

      <!-- Name -->
      <input
        type="text"
        id="name"
        class="form-control mb-4"
        :placeholder="product.name"
        v-model="product.name"
      />

      <!-- Email -->
      <input
        type="text"
        id="category"
        class="form-control mb-4"
        :placeholder="product.category"
        v-model="product.category"
      />

      <!-- Subject -->
      Price
      <input
        type="number"
        id="price"
        class="form-control mb-4"
        :placeholder="product.price"
        v-model="product.price"
      />
      Stock
      <input
        type="number"
        id="stock"
        class="form-control mb-4"
        :placeholder="product.stock"
        v-model="product.stock"
      />

      <!-- Message -->
      <div class="form-group">
        <textarea
          class="form-control rounded-0"
          id="exampleFormControlTextarea2"
          rows="3"
          :placeholder="product.description"
          v-model="product.description"
        ></textarea>
      </div>

      <!-- Copy -->
      <!-- <div class="custom-control custom-checkbox mb-4">
        <input type="checkbox" class="custom-control-input" id="defaultContactFormCopy" />
        <label
          class="custom-control-label"
          for="defaultContactFormCopy"
        >Send me a copy of this message</label>
      </div>-->

      <!-- Send button -->
      <button class="btn btn-info btn-block" @click="send">Send</button>
    </form>
    <!-- Default form contact -->
    <p class="btn btn-info" @click="goBack">Go back</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["product_id"],
  data() {
    return {
      product: null,
      new_product: {
        name: "",
        category: "",
        description: "",
        images: [],
        stock: 1,
        quantity: 1,
        price: 1
      }
    };
  },
  methods: {
    viewProduct(id) {
      this.$router.push({
        name: "Product Detail",
        params: { product_id: id }
      });
    },
    goBack() {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters(["sellerProducts"])
  },
  created() {
    this.sellerProducts.forEach(product => {
      if (product.id == this.product_id) {
        this.product = product;
        console.log(product);
      }
    });
  }
};
</script>

<style>
</style>