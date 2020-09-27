<template>
  <div class="init">
    <div><p>Drunk</p></div>
    <div>
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="md-layout-item ">
          <md-card-header>
            <div class="md-title">Bejelentkezés</div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('username')">
                  <label for="username">Felhasználó név</label>
                  <md-input
                    required
                    name="username"
                    id="username"
                    v-model="form.username"
                  />
                  <span v-if="!$v.form.username.required" class="md-error"
                    >Kötelező mező</span
                  >
                </md-field>
                <md-field :class="getValidationClass('password')">
                  <label for="password">Jelszó</label>
                  <md-input
                    required
                    name="password"
                    id="password"
                    v-model="form.password"
                  />
                  <span v-if="!$v.form.password.required" class="md-error"
                    >Kötelező mező</span
                  >
                </md-field>
              </div>
            </div>
            <md-button to="/register" class="md-primary"
              >Regisztráció</md-button
            >
            <md-button type="submit" class="md-raised md-primary"
              >Bejelentkezés</md-button
            >
          </md-card-content>
        </md-card>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { validationMixin } from "vuelidate";
import { Component, Vue } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { required, minLength, between } from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      username: null,
      password: null,
    },
  }),
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    validateUser() {
      this.$v.$touch();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../variables.scss";

.init {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  > * {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    &:first-child {
      background-color: $primary;
      user-select: none;
      text-transform: uppercase;
      font-size: 70px;
      font-weight: 800;
      color: $secondary;
    }
  }
}
</style>
