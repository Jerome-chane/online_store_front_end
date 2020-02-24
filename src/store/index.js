import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()], // create a persistent state so when page reload data is still here
  state: {
    products: [],
    user: null,
    showLoginForm: false,
    showRegisterForm: false,
    logged: false,
    userAlreadyExist: false,
    cart: [],
    email: "",
    pwd: "",
    sellerProducts: null
  },
  getters: {
    sellerProducts: state => state.sellerProducts,
    products: state => state.products,
    cart: state => state.cart,
    logged: state => state.logged,
    user: state => state.user,
    showLoginForm: state => state.showLoginForm,
    showRegisterForm: state => state.showRegisterForm,
    userAlreadyExist: state => state.userAlreadyExist,
    email: state => state.email,
    password: state => state.pwd
  },
  mutations: {
    setSellerProducts: (state, payload) => (state.sellerProducts = payload),
    setProducts: (state, payload) => (state.products = payload),
    removeItem: (state, payload) => {
      state.cart.splice(payload, 1);
    },
    addToCart: (state, payload) => {
      state.cart.push({
        id: payload.id,
        name: payload.name,
        price: payload.price,
        quantity: payload.quantity
      });
      console.log("cart updated ", state.cart);
    },
    syncEmail: (state, payload) => (state.email = payload),
    syncPwd: (state, payload) => (state.pwd = payload),
    setLoginForm: (state, payload) => (state.showLoginForm = payload),
    setRegisterForm: (state, payload) => (state.showRegisterForm = payload),
    setUserAlreadyExist: (state, payload) => (state.userAlreadyExist = payload),
    setAuthorized: (state, payload) => (state.authorized = payload),
    syncLogged: (state, payload) => {
      state.logged = payload;
      if (payload == false) {
        state.user = null;
      }
    },
    setUser: (state, payload) => {
      state.user = payload;
    }
  },
  actions: {
    signUp({ commit, dispatch }, payload) {
      let ourData = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
        role: payload.role
      };

      fetch(`api/signup`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(ourData)
      })
        .then(newData => {
          return newData.json();
        })
        .then(data => {
          if (data.hasOwnProperty("error")) {
            console.log(" error: ", data);
            commit("setUserAlreadyExist", true);
          } else {
            commit("setUserAlreadyExist", false);
            commit("syncEmail", ourData.email);
            commit("syncPwd", ourData.password);
            commit("setLoginForm", false);
            commit("setRegisterForm", false);
            dispatch("login");
          }
        })
        .catch(error => {
          console.log("Request failure: ", error);
        });
    },

    login({ getters, commit, dispatch }) {
      let ourData = { email: getters.email, pwd: getters.password };
      console.log(ourData);

      fetch(`/api/login`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        body: getBody(ourData)
      })
        .then(data => {
          if (data.status == 200) {
            commit("setLoginForm", false);
            commit("setRegisterForm", false);
            commit("syncLogged", true);
          }
          console.log("Log status", getters.logged);
        })
        .then(newData => {
          dispatch("getProducts");
        })
        .catch(error => {
          console.log("Request failure ", error);
        });
      function getBody(json) {
        var body = [];
        for (var key in json) {
          var encKey = encodeURIComponent(key);
          var encVal = encodeURIComponent(json[key]);
          body.push(encKey + "=" + encVal);
        }
        return body.join("&");
      }
    },
    logout({ commit }) {
      fetch(`api/logout`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        credentials: "include"
      })
        .then(data => {
          if (data.status == 200) {
            commit("syncLogged", false);
          }
        })
        .then(() => {
          commit("setUser", null);
          console.log("log Out successful");
        })
        .catch(error => console.log("Error ", error));
    },
    getProducts({ commit, getters }) {
      fetch(`api/products`, {
        credentials: "include"
      })
        .then(data => {
          return data.json();
        })
        .then(newData => {
          console.log(newData);

          commit("setProducts", newData.products);
          if (newData.user != null) {
            commit("setUser", newData.user);
          }
        })
        .catch(error => console.log(error));
    },
    buy({ getters }) {
      let data = getters.cart;
      console.log(data);

      console.log(JSON.stringify(data));
      fetch(`purchase`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
      })
        .then(data => {
          return data.json();
        })
        .then(newData => {
          console.log(newData);
        })
        .catch(error => console.log(error));
    },
    addProduct({ dispatch, getters }, payload) {
      if (getters.user != null) {
        let data = {
          name: payload.name,
          category: payload.category,
          description: payload.description,
          images: payload.images,
          stock: payload.stock,
          quantity: payload.quantity,
          price: payload.price
        };
        console.log(JSON.stringify(data));

        fetch(`/api/addProduct`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(data)
        })
          .then(newData => {
            console.log(newData);
            return newData.json();
          })
          .then(data => {
            console.log(data);
            if (data.success) {
              dispatch("getProducts");
            }
          })
          .catch(error => {
            console.log("Request failure: ", error);
          });
      } else
        console.log("You must be logged in as seller to add a new product");
    },
    getSellerProducts({ commit }) {
      fetch(`api/seller/products`, {
        credentials: "include"
      })
        .then(data => {
          return data.json();
        })
        .then(newData => {
          console.log(newData);
          commit("setSellerProducts", newData.products);
        })
        .catch(error => console.log(error));
    }
  },
  modules: {}
});
