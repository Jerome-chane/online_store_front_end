<template>
  <div>
    <!-- <button class="btn btn-info" @click="showForm">Add Book</button> -->
    <div class="form">
      <form>
        <div class="items">
          <span>
            Title:
            <input
              placeholder="name..."
              v-model="product.name"
              required="required"
              minlength="3"
            />
          </span>

          <span>
            Category:
            <input
              placeholder="category..."
              v-model="product.category"
              required="required"
              minlength="2"
            />
          </span>
          <br />
          <span>
            Description:
            <input
              placeholder="description..."
              v-model="product.description"
              required="required"
              minlength="3"
            />
          </span>
          <span>
            Price:
            <input
              type="number"
              min="1"
              placeholder="Price..."
              v-model="product.price"
              required="required"
            />
          </span>
          <span>
            Stock:
            <input
              type="number"
              min="1"
              placeholder="stock..."
              v-model="product.stock"
              required="required"
            />
          </span>

          <span>
            Images:
            <input placeholder="cover(optional)" v-model="product.cover" />
          </span>
          <br />
          <span>
            Detail:
            <input placeholder="detail(optional)" v-model="product.detail" />
          </span>

          <!-- <p
            v-if="productAlreadyExist"
            class="alert alert-info"
          >This product already exists, please try again</p>-->
          <br />
          <input type="submit" value="Confirm" @click="check" class="btn btn-warning" />
          <button class="btn btn-danger" @click="hideForm">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      product: {
        name: "",
        category: "",
        description: "",
        images: [],
        stock: 1,
        quantity: 1,
        price: 1
      },
      Form: false
    };
  },
  methods: {
    addProduct() {
      console.log(this.product);
      this.$store.dispatch("addProduct", this.product);
    },
    showForm() {
      this.Form = true;
    },
    hideForm() {
      this.$router.push("/");
    },

    check(event) {
      if (
        this.product.name.length >= 3 &&
        this.product.category.length >= 2 &&
        this.product.description.length >= 3
      ) {
        console.log("confimed");
        event.preventDefault();
        this.addProduct();
        // this.hideForm();
      } else {
        console.log("unable to add product");
      }
    }
  }
};
</script>

<style scoped>
span {
  margin: 10px;
}
input {
  margin: 10px;
}
.items {
  display: block;
}
</style>