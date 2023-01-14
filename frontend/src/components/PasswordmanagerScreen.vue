<template>
  <b-container id="mainContainer" align-v="center" class="bv-example-row">
    <b-row align-v="center" align-h="center">
      <b-col md="8">
        <div>
          <b-button variant="dark" @click="logout">logout</b-button>
          <b-button variant="dark" @click="landing">landing</b-button>
        </div>
      </b-col>
    </b-row>
    <b-row align-v="center" align-h="center">
      <b-col md="12">
        <div>
          <b-form inline>
            <b-row>
              <b-col>
                <label class="sr-only" for="inline-form-input-title"
                  >Title:</label
                >
              </b-col>
              <b-col>
                <label class="sr-only" for="inline-form-input-url"
                  >URL:</label
                ></b-col
              >
              <b-col>
                <label class="sr-only" for="inline-form-input-username"
                  >Username:</label
                ></b-col
              >
              <b-col>
                <label class="sr-only" for="inline-form-input-password"
                  >Password: (Hover input!)</label
                ></b-col
              >
              <b-col
                ><label class="sr-only" for="inline-form-input-password"
                  >Category:</label
                >
              </b-col>
              <b-col> </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-input
                  id="inline-form-input-title"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  placeholder="Title"
                  v-model="title"
                ></b-form-input
              ></b-col>
              <b-col>
                <b-form-input
                  id="inline-form-input-url"
                  placeholder="URL"
                  v-model="url"
                ></b-form-input
              ></b-col>
              <b-col>
                <b-form-input
                  id="inline-form-input-username"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  placeholder="Username"
                  v-model="username"
                ></b-form-input
              ></b-col>
              <b-col>
                <b-form-input
                  type="password"
                  id="inline-form-input-password"
                  placeholder="Password"
                  v-model="password"
                ></b-form-input
                ><b-link href="" @click="strongpassword"
                  >Strong password</b-link
                ></b-col
              >
              <b-col>
                <div>
                  <b-form-select
                    v-model="selectedCategory"
                    :options="options"
                  ></b-form-select>

                  <div class="mt-3">
                    <b-link href="" v-b-modal.modal-prevent-closing>
                      Add new category
                    </b-link>
                  </div>
                  <div class="mt-3">
                    <b-link href="" @click="categorydelete"> Delete </b-link>
                  </div>
                  <div class="mt-3">
                    Selected: <strong>{{ selectedCategory }}</strong>
                  </div>
                </div>
              </b-col>
              <b-col>
                <b-button variant="primary" @click="addpassword">Add</b-button>
              </b-col>
            </b-row>
          </b-form>
        </div>
      </b-col>
    </b-row>
    <div class="text-center my-3">
      <b-popover
        target="inline-form-input-password"
        triggers="hover"
        placement="top"
      >
        <template #title>You Can See The Secret Password</template>
        <b>Password : </b> {{ password }}
      </b-popover>
    </div>
    <div>
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="New Category"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Category name"
            label-for="category-input"
            invalid-feedback="Category name is required"
            :state="categoryState"
          >
            <b-form-input
              id="category-input"
              v-model="newCategory"
              :state="categoryState"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
      <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>
      <template #cell(actions)="row">
        <b-button
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-1"
          variant="danger"
        >
          Delete
        </b-button>
        <b-button size="sm" @click="row.toggleDetails" variant="info">
          {{ row.detailsShowing ? "Hide" : "Show" }} Details
        </b-button>
      </template>
      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </b-card>
      </template>
    </b-table>
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      ok-only
      @hide="resetInfoModal"
    >
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>
<script>
import axios from "axios";

export default {
  name: "PasswordmanagerScreen",
  data() {
    return {
      title: "",
      username: "",
      password: "",
      url: "",
      name: "",
      email: "",
      id: "",
      size: "32",
      selectedCategory: null,
      selectedCategoryTitle: null,
      options: [],
      newCategory: "",
      categoryState: null,

      submittedNewCategory: [],
      items: [],

      fields: [
        {
          key: "title",
          label: "Title",
          sortable: true,
          class: "text-center",
        },
        {
          key: "url",
          label: "URL",
          sortable: true,
          class: "text-center",
        },
        {
          key: "category",
          label: "Category",
          sortable: true,
        },
        {
          key: "userName",
          label: "Username",
          sortable: true,
          class: "text-center",
        },
        {
          key: "passWord",
          label: "Password",
        },
        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  created() {
    if (localStorage.getItem("Authorization") === null) {
      this.$router.push("/login");
    }
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    this.totalRows = this.items.length;
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
    axios
      .get("http://143.244.171.39/categorys/" + this.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          if (res.data.length >= 1) {
            this.options.splice(0);
            this.options.push({
              value: null,
              text: "Please select an category",
            });
            res.data.forEach((element) => {
              this.options.push({
                value: element._id,
                text: element.categoryName,
              });
            });
          }
        }
      });
    axios
      .get("http://143.244.171.39/passwords", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          this.items.splice(0);
          res.data.forEach((element) => {
            this.options.map((data) => {
              if (data.value === element.passwordCategory) {
                this.selectedCategoryTitle = data.text;
              }
            });
            this.items.push({
              _id: element._id,
              userId: element.userId,
              title: element.passwordTitle,
              url: element.passwordURL,
              category: this.selectedCategoryTitle,
              userName: element.passwordUsername,
              passWord: element.passwordPassword,
              isActive: element.passwordActive,
              createAt: element.passwordCreateAt,
            });
            this.selectedCategoryTitle = null;
          });
          this.title = "";
          this.url = "";
          this.username = "";
          this.password = "";
          this.selectedCategory = null;
        }
      });
  },
  methods: {
    info(item) {
      axios
        .delete("http://143.244.171.39/passwords/" + item._id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            axios
              .get("http://143.244.171.39/passwords", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "Authorization"
                  )}`,
                },
              })
              .then((ret) => {
                if (ret.status == 200) {
                  this.items.splice(0);
                  ret.data.forEach((element) => {
                    this.options.map((data) => {
                      if (data.value === element.passwordCategory) {
                        this.selectedCategoryTitle = data.text;
                      }
                    });
                    this.items.push({
                      _id: element._id,
                      userId: element.userId,
                      title: element.passwordTitle,
                      url: element.passwordURL,
                      category: this.selectedCategoryTitle,
                      userName: element.passwordUsername,
                      passWord: element.passwordPassword,
                      isActive: element.passwordActive,
                      createAt: element.passwordCreateAt,
                    });
                    this.selectedCategoryTitle = null;
                  });
                  this.title = "";
                  this.url = "";
                  this.username = "";
                  this.password = "";
                  this.selectedCategory = null;
                }
              });
          }
        }),
        (err) => {
          console.log(err.response);
          this.error = err.response.data.error;
        };
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    strongpassword() {
      let charactersArray = "a-z,A-Z,0-9,#";
      let CharacterSet = "";
      let password = "";

      if (charactersArray.indexOf("a-z") >= 0) {
        CharacterSet += "abcdefghijklmnopqrstuvwxyz";
      }
      if (charactersArray.indexOf("A-Z") >= 0) {
        CharacterSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }
      if (charactersArray.indexOf("0-9") >= 0) {
        CharacterSet += "0123456789";
      }
      if (charactersArray.indexOf("#") >= 0) {
        CharacterSet += "![]{}()%&*$#^<>~@|";
      }

      for (let i = 0; i < this.size; i++) {
        password += CharacterSet.charAt(
          Math.floor(Math.random() * CharacterSet.length)
        );
      }
      this.password = password;
    },
    addpassword() {
      axios
        .post(
          "http://143.244.171.39/passwords",
          {
            userId: this.id,
            passwordTitle: this.title,
            passwordURL: this.url,
            passwordCategory: this.selectedCategory,
            passwordUsername: this.username,
            passwordPassword: this.password,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            axios
              .get("http://143.244.171.39/passwords", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "Authorization"
                  )}`,
                },
              })
              .then((ret) => {
                if (ret.status == 200) {
                  this.items.splice(0);
                  ret.data.forEach((element) => {
                    this.options.map((data) => {
                      if (data.value === element.passwordCategory) {
                        this.selectedCategoryTitle = data.text;
                      }
                    }); //{ value: null, text: 'Please select an option' },
                    this.items.push({
                      _id: element._id,
                      userId: element.userId,
                      title: element.passwordTitle,
                      url: element.passwordURL,
                      category: this.selectedCategoryTitle,
                      userName: element.passwordUsername,
                      passWord: element.passwordPassword,
                      isActive: element.passwordActive,
                      createAt: element.passwordCreateAt,
                    });
                    this.selectedCategoryTitle = null;
                  });
                  this.title = "";
                  this.url = "";
                  this.username = "";
                  this.password = "";
                  this.selectedCategory = null;
                }
              });
          }
        }),
        (err) => {
          console.log(err.response);
          this.error = err.response.data.error;
        };
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.categoryState = valid;
      return valid;
    },
    resetModal() {
      this.newCategory = "";
      this.categoryState = null;
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();
      axios
        .post(
          "http://143.244.171.39/categorys",
          { userId: this.id, categoryName: this.newCategory },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            axios
              .get("http://143.244.171.39/categorys", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "Authorization"
                  )}`,
                },
              })
              .then((ret) => {
                if (ret.status == 200) {
                  this.options.splice(0);
                  this.options.push({
                    value: null,
                    text: "Please select an category",
                  });
                  ret.data.forEach((element) => {
                    this.options.push({
                      value: element._id,
                      text: element.categoryName,
                    });
                  });
                  this.selectedCategory = null;
                }
              });
          }
        }),
        (err) => {
          console.log(err.response);
          this.error = err.response.data.error;
        };
      this.handleSubmit();
    },
    categorydelete() {
      axios
        .delete("http://143.244.171.39/categorys/" + this.selectedCategory, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            axios
              .get("http://143.244.171.39/categorys", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "Authorization"
                  )}`,
                },
              })
              .then((ret) => {
                if (ret.status == 200) {
                  this.options.splice(0);
                  this.options.push({
                    value: null,
                    text: "Please select an category",
                  });
                  ret.data.forEach((element) => {
                    this.options.push({
                      value: element._id,
                      text: element.categoryName,
                    });
                  });
                  this.selectedCategory = null;
                }
              });
          }
        }),
        (err) => {
          console.log(err.response);
          this.error = err.response.data.error;
        };
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.submittedNewCategory.push(this.newCategory);
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    landing() {
      this.$router.push("/");
    },
  },
};
</script>
