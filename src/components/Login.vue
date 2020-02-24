<template>
  <div class="header">
    <h1 v-if="user">Welcome {{user.name}}</h1>
    <h1 v-if="!user && showLoginForm != true">Welcome Visitor</h1>
    <br />
    <div v-if="showLoginForm != true">
      <form id="demo" class="collapse">
        <input
          v-if="!logged"
          placeholder="email..."
          v-model="email"
          required="required"
          minlength="3"
        />

        <input
          v-if="!logged"
          placeholder="password..."
          v-model="pwd"
          @click="login"
          type="password"
          required="required"
          minlength="2"
        />
      </form>
    </div>

    <button v-if="user" @click="logout" class="btn btn-danger logout">Log Out</button>
    <div class="signup collapse" v-if="showLoginForm == true" id="demo2">
      <div class="inputs">
        <form>
          <span>
            Name:
            <input
              placeholder="Your name..."
              v-model="person.name"
              required="required"
              minlength="3"
            />
          </span>
          <span>
            Email address:
            <input
              placeholder="email..."
              v-model="person.email"
              required="required"
              minlength="3"
            />
          </span>

          <span>
            Password:
            <input
              placeholder="password..."
              v-model="person.password"
              type="password"
              required="required"
              minlength="3"
            />
          </span>
          <select class="custom-select-sm" v-model="person.role">
            <option value="customer">Customer</option>
            <option value="author">Seller</option>
          </select>
          <p
            v-if="userAlreadyExist"
            class="alert alert-info"
          >This username already exists, please try again</p>
          <br />
          <input type="submit" value="Create Account" @click="check" class="btn btn-warning" />
          <button
            class="btn btn-danger"
            data-toggle="collapse"
            data-target="#demo2"
            @click="hideForm"
          >Cancel</button>
        </form>
      </div>
    </div>
    <div v-if="showLoginForm != true">
      <button
        v-if="!user"
        @click="login"
        class="btn btn-success"
        data-toggle="collapse"
        data-target="#demo"
      >Login</button>
      <button
        v-if="!user"
        @click="showForm"
        class="btn btn-info"
        data-toggle="collapse"
        data-target="#demo2"
      >Sign up</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => {
    return {
      person: {
        name: "",
        email: "",
        password: "",
        role: ""
      },
      s: false
    };
  },
  watch: {
    user() {
      if (this.user) {
        this.s = true;
      }
    }
  },
  methods: {
    login(event) {
      if (this.email.length >= 3 && this.pwd.length >= 2) {
        this.$store.dispatch("login");
        event.preventDefault();
      }
    },
    logout() {
      this.$store.dispatch("logout");
    },
    showForm() {
      (this.person.name = ""),
        (this.person.email = ""),
        (this.person.password = ""),
        this.$store.commit("setLoginForm", true);
    },
    hideForm() {
      this.$store.commit("setLoginForm", false);
    },
    check(event) {
      if (
        this.person.name.length >= 3 &&
        this.person.email.length >= 3 &&
        this.person.password.length >= 3
      ) {
        event.preventDefault();
        this.signup();
      } else {
        console.log("denied");
      }
    },
    signup() {
      // console.log(this.user);
      this.$store.dispatch("signUp", this.person);
    }
  },
  computed: {
    email: {
      get() {
        return this.$store.getters.email;
      },
      set(email) {
        this.$store.commit("syncEmail", email);
      }
    },
    pwd: {
      get() {
        return this.$store.getters.password;
      },
      set(pwd) {
        this.$store.commit("syncPwd", pwd);
      }
    },
    ...mapGetters(["logged", "user", "showLoginForm", "userAlreadyExist"])
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin: 30px;
  /* border: solid; */
}

input {
  margin: 10px;
}
button {
  margin: 5px;
  /* height: 15px; */
}
</style>