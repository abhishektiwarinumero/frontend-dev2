<template>
  <v-form v-model="valid" @submit.prevent="login">
    <v-layout column>
      <v-flex>
        <v-text-field
          label="Email address"
          placeholder="Your email address"
          v-model="credentials.email"
          :rules="emailRules"
          :error-messages="emailErrors"
          required
        ></v-text-field>
      </v-flex>
      <v-flex>
        <v-text-field
          type="password"
          v-model="credentials.password"
          label="Password *"
          placeholder="Your password"
          :rules="passwordRules"
          required
        ></v-text-field>
      </v-flex>
      <v-flex>
        <v-row dark class="ml-2 mt-2">
          <v-btn text small @click="requestPasswordReset">
            Forgotten Password?
          </v-btn>
          <v-btn color="#673AB7" small :disabled="!valid" type="submit"
            >Continue</v-btn
          >
          <v-btn text small @click="close">Cancel</v-btn>
        </v-row>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  props: {
    redirect: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    valid: true,
    credentials: {
      email: "",
      password: "",
    },
    emailErrors: [],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length >= 8 || "Password must be at least 8 characters",
    ],
  }),
  methods: {
    async login() {
      try {
        let response = await this.$auth
          .loginWith("local", {
            data: this.credentials,
          })
          .then((response) => {
            this.$notify("Logged In", "success");
            if (this.redirect) {
              // Only authenticate nova immediately if redirect prop is true
              // i.e when the user decided to go to dashboard (from members are in nav bar)
              let token = $auth.$storage.getUniversal("_token.local");
              token = token.split("Bearer ")[1];
              window.location = `https://${process.env.HOST_URL}/login/${token}`;
            }
            this.close();
          })
          .catch((errors) => {
            console.log(errors);
            this.$notify(
              errors.response.data.message,
              "error",
              errors.response.data.errors
            );
          });
      } catch (error) {
        // TODO: send error to sentry
        this.$notify("Could not contact server", "error");
      }
    },
    requestPasswordReset() {
      if (!this.email) {
        this.emailErrors = [
          "Please fill out email field to reset your password",
        ];
        this.$notify(
          "Please fill out email field to reset your password",
          "error"
        );
        return;
      } else {
        // Send the email via axios to request password reset
        this.$axios
          .$post("/password/email", { email: this.email })
          .then((response) => {
            this.$notify(
              "We have sent you an email to reset your password",
              "success"
            );
          })
          .catch((errors) => {
            this.$notify("Something went wrong", "error");
          });
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
