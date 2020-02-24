<template>
  <div class="container">
    <h1>Shopping Cart</h1>

    <div class="items">
      <div v-for="(product, index) in cart" :key="index">
        <div class="row">
          <div class="col-6">
            <!-- <img class="cover" :src="book.cover" /> -->
            <p>{{product.name}}</p>
          </div>
          <div class="col-6">
            <p>
              Quantity:
              <input v-model="product.quantity" type="number" min="0" />
            </p>
            <p>Price: {{product.price}}€</p>

            <span class="btn btn-danger" @click="remove(index)">Remove</span>
          </div>
        </div>
        <hr />
      </div>
      <p id="total_price" v-if="this.cart.length>0">Total: {{total}}€</p>
      <p v-if="discount != total">Discounted Price: {{discount}}€</p>
      <p v-if="this.cart.length==0" class="alert alert-info">Your shopping cart is empty</p>
      <br />
      <div class="actions">
        <p class="btn btn-info" @click="goBack">Go Back</p>
        <p class="btn btn-success" @click="buy">Confirm</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return { tot: 0 };
  },
  computed: {
    ...mapGetters(["cart"]),
    total() {
      // Calculates the total price based on each product price and quantity
      this.tot = 0;
      this.cart.forEach(product => {
        this.tot += product.price * product.quantity;
      });
      return this.tot;
    },
    discount() {
      // Calculates the dicounted price. Each time there are 4 units, get 1 free
      let newTotal = 0;
      this.cart.forEach(product => {
        let freeUnits = 0;
        if (product.quantity >= 4) {
          freeUnits = Math.floor(product.quantity / 4);
        }
        newTotal += product.price * (product.quantity - freeUnits);
      });
      return newTotal;
    }
  },
  methods: {
    buy() {
      this.$store.dispatch("buy");
    },
    goBack() {
      this.$router.push("/");
    },
    remove(index) {
      this.$store.commit("removeItem", index);
    }
  }
};
</script>

<style scoped>
.discounted_price {
  text-decoration: line-through;
}
.cover {
  height: 130px;
}
.actions {
  display: flex;
  justify-content: space-around;
}
</style>