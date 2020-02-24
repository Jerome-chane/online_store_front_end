<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm navbar-dark bg-dark">
      <a v-if="!user " class="navbar-brand">Welcome Visitor</a>
      <a v-if="user " class="navbar-brand">Welcome {{user.firstName}}</a>

      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href @click="goBack">
            Home
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href>Buy</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href>Sell</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href>Our Sellers</a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Dashboard</a>

          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <span v-if="user!=null"></span>
            <a v-if="user!=null&&user.role =='seller'" class="dropdown-item" href>Sales</a>
            <a
              v-if="user!=null&&user.role =='seller'"
              class="dropdown-item"
              @click="myProducts"
              href
            >My Products</a>

            <a class="dropdown-item" href>Favorites</a>

            <div class="dropdown-divider"></div>

            <a class="dropdown-item" href>Purchase History</a>
          </div>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>-->
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <a v-if="!user" class="nav-link" @click="signUp">Sign Up</a>
        </li>or
        <li>
          <a v-if="!user" class="nav-link" @click="logIn">Log In</a>
          <a v-if="user" class="nav-link" @click="logOut">Log Out</a>
        </li>
      </ul>
      <!-- <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>-->
    </nav>
  </div>
</template>

<script>
import Login from "./Login";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: { Login },
  methods: {
    myProducts() {
      this.$router.push("my-products");
    },
    goBack() {
      this.$router.push("/");
    },
    logOut() {
      this.$store.dispatch("logout");
    },
    signUp() {
      this.$router.push("/");
      this.$store.commit("setLoginForm", false);
      this.$store.commit("setRegisterForm", true);
    },
    logIn() {
      this.$router.push("/");
      this.$store.commit("setLoginForm", true);
      this.$store.commit("setRegisterForm", false);
    },
    goToAdd() {
      if (this.user != null && this.user.role == "seller") {
        this.$router.push("add");
      }
    }
  },
  computed: {
    ...mapGetters(["logged", "user", "showLoginForm", "userAlreadyExist"])
  }
};
</script>

<style>
</style>