<template>
  <b-container id="mainContainer" align-v="center">
    <b-row align-v="center" align-h="center">
      <b-col md="3">
        <div>
          <b-form @submit.stop.prevent>
            <!-- <label for="text-useremail">User Mail:</label> -->
            <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input
                v-model="email"
                :state="validationEmail"
                id="userMail"
                placeholder="Email"
              ></b-form-input>
            </b-input-group>
            <b-form-invalid-feedback :state="validationEmail">
              Your user E-Mail must be minimum 4 characters long.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationEmail">
            </b-form-valid-feedback>
          </b-form>
        </div>
      </b-col>
    </b-row>
    <b-row align-v="center" align-h="center">
      <b-col md="3">
        <div>
          <b-form @submit.stop.prevent>
            <!-- <label for="text-password">User Password:</label> -->
            <b-input-group prepend="Pass" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input
                type="password"
                id="userPass"
                placeholder="Password"
                v-model="password"
                :state="validationPassword"
              ></b-form-input>
            </b-input-group>
            <b-form-invalid-feedback :state="validationPassword">
              Your user E-Mail must be minimum 8 characters long.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationPassword">
            </b-form-valid-feedback>
          </b-form>
        </div>
      </b-col>
    </b-row>
    <b-row align-v="center" align-h="center">
      <b-col md="3">
        <div>
          <b-button variant="secondary" @click="register"
            >Register Here</b-button
          >
          <b-button variant="success" @click="login">Login</b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import axios from "axios";

export default {
  name: "LoginScreen",
  template: "#comment-form",
  data() {
    return {
      email: "",
      password: "",

      error: "",
    };
  },
  computed: {
    validationEmail() {
      return this.email.length >= 4;
    },
    validationPassword() {
      return this.password.length >= 8;
    },
  },
  methods: {
    login() {
      let user = {
        userEmail: this.email,
        userPassword: this.password,
      };
      axios.post("http://143.244.171.39/auth/login", user).then(
        (res) => {
          if (res.status === 200) {
            localStorage.setItem("Authorization", res.data.accessToken);
            this.$router.push("/");
          }
        },
        (err) => {
          console.log(err.response);
          this.error = err.response.data.error;
        }
      );
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang="scss">
#mainContainer {
  width: 100%;
  height: auto;
  position: relative;
}
.form-wrap {
  padding-top: 35px;
}
.alert {
  padding-top: 1.5rem;
}
.alert h5 {
  margin-bottom: 0rem;
}
</style>
