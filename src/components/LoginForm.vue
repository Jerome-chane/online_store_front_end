<template>
  <div class="login_form">
    <div v-if="showLoginForm == true">
      <!-- Default form login -->

      <form class="text-center border border-light p-5">
        <div class="close">
          <img @click="close" src="../assets/close.png" />
        </div>
        <p class="h4 mb-4">Sign in</p>

        <!-- Email -->
        <!-- type="email" -->
        <input
          id="defaultLoginFormEmail"
          class="form-control mb-4"
          placeholder="E-mail"
          required="required"
          minlength="3"
          v-model="e_mail"
        />

        <!-- Password -->
        <input
          type="password"
          id="defaultLoginFormPassword"
          class="form-control mb-4"
          required="required"
          minlength="3"
          placeholder="Password"
          v-model="pwd"
        />

        <div class="d-flex justify-content-around">
          <div>
            <!-- Remember me -->
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember" />
              <label class="custom-control-label" for="defaultLoginFormRemember">Remember me</label>&nbsp;
            </div>
          </div>
          <div>
            <!-- Forgot password -->
            &nbsp;
            <a href>Forgot password?</a>
          </div>
        </div>

        <!-- Sign in button -->

        <button class="btn btn-info btn-block my-4" @click="login">Sign In</button>

        <!-- Register -->
        <p>
          Not a member?
          <a href @click="register">Register</a>
        </p>

        <!-- Social login -->
        <!-- <p>or sign in with:</p> -->

        <!-- <a href="#" class="mx-2" role="button">
        <i class="fab fa-facebook-f light-blue-text"></i>
      </a>
      <a href="#" class="mx-2" role="button">
        <i class="fab fa-twitter light-blue-text"></i>
      </a>
      <a href="#" class="mx-2" role="button">
        <i class="fab fa-linkedin-in light-blue-text"></i>
      </a>
      <a href="#" class="mx-2" role="button">
        <i class="fab fa-github light-blue-text"></i>
        </a>-->
      </form>
      <!-- Default form login -->
    </div>
    <!-- Default form register -->
    <div v-if="showRegisterForm">
      <form class="text-center border border-light p-5">
        <div class="close">
          <img @click="close" src="../assets/close.png" />
        </div>
        <p class="h4 mb-4">Sign up</p>

        <div class="form-row mb-4">
          <div class="col">
            <!-- First name -->
            <input
              type="text"
              id="defaultRegisterFormFirstName"
              class="form-control"
              placeholder="First name"
              v-model="person.firstName"
            />
          </div>
          <div class="col">
            <!-- Last name -->
            <input
              type="text"
              id="defaultRegisterFormLastName"
              class="form-control"
              placeholder="Last name"
              v-model="person.lastName"
            />
          </div>
        </div>

        <!-- E-mail -->
        <!-- type="email" -->
        <input
          id="defaultRegisterFormEmail"
          class="form-control mb-4"
          placeholder="E-mail"
          v-model="person.email"
        />

        <!-- Password -->
        <input
          type="password"
          id="defaultRegisterFormPassword"
          class="form-control"
          placeholder="Password"
          aria-describedby="defaultRegisterFormPasswordHelpBlock"
          v-model="person.password"
        />
        <small
          id="defaultRegisterFormPasswordHelpBlock"
          class="form-text text-muted mb-4"
        >At least 8 characters and 1 digit</small>

        <div class="custom-control custom-checkbox">
          <input type="checkbox" id="sell" value="seller" v-model="role" />
          <label for="sell">Register as Seller</label>

          <small
            id="defaultRegisterFormPasswordHelpBlock"
            class="form-text text-muted mb-4"
          >You will have the right to sell items</small>
        </div>
        <!-- Newsletter -->
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="defaultRegisterFormNewsletter" />
          <label
            class="custom-control-label"
            for="defaultRegisterFormNewsletter"
          >Subscribe to our newsletter</label>
        </div>

        <!-- Sign up button -->
        <button class="btn btn-info my-4 btn-block" @click="signup">Sign Up</button>

        <hr />

        <!-- Terms of service -->
        <p>
          By clicking
          <em>Sign up</em> you agree to our
          <a href target="_blank">terms of service</a>
        </p>
      </form>
    </div>
    <!-- Default form register -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      role: [],
      person: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "customer"
      },
      e_mail: "",
      pwd: ""
    };
  },
  methods: {
    close() {
      this.$store.commit("setLoginForm", false);
      this.$store.commit("setRegisterForm", false);
    },
    signup(event) {
      event.preventDefault();
      if (this.role == "seller") {
        this.person.role = "seller";
      } else this.person.role = "customer";
      this.$store.dispatch("signUp", this.person);
    },
    register(event) {
      event.preventDefault();
      this.$store.commit("setLoginForm", false);
      this.$store.commit("setRegisterForm", true);
    },
    login(event) {
      if (this.e_mail.length >= 3 && this.pwd.length >= 2) {
        this.$store.commit("syncEmail", this.e_mail);
        this.$store.commit("syncPwd", this.pwd);
        event.preventDefault();
        this.$store.dispatch("login");
      } else console.log("unable to logIn");
    }
  },
  computed: {
    ...mapGetters([
      "logged",
      "email",
      "password",
      "user",
      "showLoginForm",
      "showRegisterForm",
      "userAlreadyExist"
    ])
  }
};
</script>

<style scoped>
.close img {
  height: 20px;
}
.login_form {
  justify-content: center;
  display: flex;
}
</style>