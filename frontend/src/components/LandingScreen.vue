<template>
  <div>
    <b-jumbotron>
      <template #header>Password Manager</template>

      <template #lead>
        Merhaba önyüz Vue 2 kullanılarak yazılmıştır rest-apiye authorized
        olduktan sonra işlemleri yapmaktadır, kullanılanlar vue-router@3,
        bootstrap bootstrap-vue, sass-loader, axios. arkauç ise javascript
        rest-api yazdım docker'a kurulum yaptım daha sonra digitalocean'da aws
        serverlarında ubuntu kurup içerisinde dockerı çalıştırdım. Burada
        kullandıklarım express, mongoose, body-parser, cors, @hapi/joi,
        bcryptjs, jsonwebtoken</template
      >
      <template>
        <b-container id="mainContainer" align-v="center">
          <b-row align-v="center" align-h="center">
            <b-col md="8">
              <div>
                <b-button variant="dark" @click="logout">logout</b-button>
                <b-button variant="dark" @click="passwords"
                  >password manager</b-button
                >
              </div>
            </b-col>
          </b-row>
          <b-row align-v="center" align-h="center">
            <b-col md="8">
              <div>
                <h2>your _Id: {{ id }}</h2>
                <h1>HELLO {{ name }}</h1>
                <h2>your email is: {{ email }}</h2>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </template>
      <hr class="my-4" />
      <p>
        <b-row>
          <b-col
            >Backend -
            <b-link href="http://143.244.171.39/"
              >Password Manager Backend Link</b-link
            ></b-col
          >
          <b-col
            ><b-link
              href="https://hub.docker.com/r/w3noom/passwordmanager-backend"
              >Password Manager Backend Docker Link</b-link
            ></b-col
          >
        </b-row>
      </p>
      <p>
        <b-row>
          <b-col
            >Frontend -
            <b-link href="http://142.93.108.179/"
              >Password Manager Frontend Link</b-link
            ></b-col
          >
          <b-col
            ><b-link
              href="https://hub.docker.com/r/w3noom/passwordmanager-frontend"
              >Password Manager Frontend Docker Link</b-link
            ></b-col
          >
        </b-row>
      </p>
      <p>
        Proje GitHub Linki :
        <b-link
          href="https://www.github.com/weincreative/PasswordManagerVue2RAPIAuth"
          >github/weincreative/PasswordManagerVue2RAPIAuth</b-link
        >
      </p>
      <hr class="my-4" />

      <p>
        <b-row>
          <b-col
            >Sayfalarım :
            <b-link href="https://www.linkedin.com/in/omerbakiciol/"
              >Linkedin</b-link
            ></b-col
          >
          <b-col
            ><b-link href="https://www.github.com/weincreative/"
              >Github</b-link
            ></b-col
          >
        </b-row>
      </p>
    </b-jumbotron>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "LandingScreen",
  data() {
    return {
      name: "",
      email: "",
      id: "",
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("Authorization") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    axios
      .get("http://143.244.171.39/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
      })
      .then((res) => {
        this.name = res.data[0].userName;
        this.email = res.data[0].userEmail;
        this.id = res.data[0]._id;
      });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    passwords() {
      this.$router.push("/passwordmanager");
    },
  },
};
</script>
