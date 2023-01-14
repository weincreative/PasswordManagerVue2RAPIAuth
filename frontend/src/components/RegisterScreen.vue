<template>
  <b-container id="mainContainer" align-v="center">
    <b-row align-v="center" align-h="center">
      <b-col md="3">
        <div>
          <b-form @submit.stop.prevent>
            <!-- <label for="text-username">User Name:</label> -->
            <b-input-group prepend="Name" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input
                v-model="name"
                id="userName"
                placeholder="Name"
              ></b-form-input>
            </b-input-group>
          </b-form>
        </div>
      </b-col>
    </b-row>
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
          <b-button variant="secondary" @click="login">Login Here</b-button>
          <b-button variant="success" @click="register">Register</b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import axios from "axios";

export default {
  name: "RegisterScreen",
  data() {
    return {
      name: "",
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
    register() {
      let newUser = {
        userName: this.name,
        userEmail: this.email,
        userPassword: this.password,
      };
      axios.post("http://143.244.171.39/auth/register", newUser).then(
        (res) => {
          console.log(res);
          this.error = "";
          this.$router.push("/login");
        },
        (err) => {
          console.log(err.response);
          this.error = err.response.data.error;
        }
      );
    },
    login() {
      this.$router.push("/login");
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
</style>
