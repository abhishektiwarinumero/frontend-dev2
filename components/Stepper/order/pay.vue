<template>
  <v-stepper-content key="3-content" step="3">
    <form id="payment-form">
      <div id="card-element" class="mb-12"></div>
      <v-btn color="primary" @click="sendOrder" :disabled="!valid">
        Continue
      </v-btn>
      <v-btn text @click="cancel">Cancel</v-btn>
    </form>
  </v-stepper-content>
</template>

<script>
import tiers from "~/assets/js/tiers";
import services from "~/assets/js/services";
export default {
  data: () => ({
    valid: false,
    // Declared in instance but not referenced during render, just outsourcing scope
    client_secret: "",
    stripeToken: "",
    tiers: tiers,
    services: services,
  }),
  methods: {
    sendOrder() {
      if (!this.valid) {
        return;
      }

      // Gather current service, get slug from url (pure JS)
      let service = _.find(this.services, [
        "slug",
        document.location.pathname.replace("/", ""),
      ]).name;
      // Gather current tier and division
      let currentTier = _.find(this.tiers, [
        "id",
        this.$store.state.league.tier,
      ]);
      let desiredTier = _.find(this.tiers, [
        "id",
        this.$store.state.desired.tier,
      ]);
      let division = _.find(currentTier.divisions, [
        "id",
        this.$store.state.league.division,
      ]).name;
      let desiredDivision = _.find(desiredTier.divisions, [
        "id",
        this.$store.state.desired.division,
      ]).name;
      currentTier = currentTier.name;
      desiredTier = desiredTier.name;
      // Purchase here is "current (tier & division) to desired (tier & division)"
      let purchase = `${currentTier} ${division} to ${desiredTier} ${desiredDivision}`;
      // Gather selected server
      let server = this.$store.state.league.server;
      // Gather number of wins
      let wins = this.$store.state.wins.wins;
      // Gather game mode (solo/duo)
      this.$store.commit("checkout/addOption", this.$store.state.wins.mode);
      // Gather extra options
      let options = this.$store.state.checkout.options;
      // Gather price
      let price = this.$store.getters["price/price"];
      // Gather discount code
      let discountCode = this.$store.state.checkout.discountCode;
      // Gather in-game-nickname (summoner name)
      let nickname = this.$store.state.order.nickname;
      // Gather selected booster
      let booster = this.$store.state.order.booster;
      // Gather Comment
      let comment = this.$store.state.order.comment;
      // Gather (appear offline in chat)
      let offline = this.$store.state.order.chatMode;
      // Get all data from store and post them to DB
      this.$axios
        .post("orders", {
          purchase,
          service,
          //   currentTier,
          //   division,
          server,
          //   wins,
          //   queue: mode === "Solo/Duo" ? "solo_duo" : "flex_5v5", // undocumented
          options,
          price, // end of documented
          discountCode,
          nickname,
          booster_id: 0,
          comment,
          offline,
          stripeToken: this.stripeToken,
        })
        .then((response) => {
          this.$notify(response.data.message, "success");
          // Login the user into the web session when they get a sanctum token
          // So they wouldn't stumble upon the Laravel nova login page here
          // Also, maybe return the id of the order from the API response
          // And redirect the users to their newly created order directly
          setTimeout(() => {
            window.location = `${process.env.HOST_URL}/resources/orders/${response.data.order_id}`;
          }, 4000);
          // Actually just close the dialog, semantics ¯\_(ツ)_/¯
          this.cancel();
        })
        .catch((errors) => {
          this.$notify(errors.response.data.error, "error");
        });
    },
    cancel() {
      this.$emit("cancel");
    },
    async tokenize(card) {
      const { token, error } = await this.$stripe.createToken(card);
      return token;
    },
    confirm(clientSecret, card) {
      (async () => {
        const response = await fetch("api/secret");
        const { client_secret: clientSecret } = await response.json();
        // Call stripe.confirmCardPayment() with the client secret.
        this.$stripe
          .confirmCardPayment(clientSecret, {
            payment_method: {
              card: card,
            },
          })
          .then((result) => {
            if (result.error) {
              // Show error to your customer (e.g., insufficient funds)
              this.$notify(result.error.message, "error");
            } else {
              // The payment has been processed!
              if (result.paymentIntent.status === "succeeded") {
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
                this.$notify(result.paymentIntent.status, "success");
              }
            }
          });
      })();
    },
  },
  mounted() {
    const elements = this.$stripe.elements();
    const card = elements.create("card", {
      style: {
        base: {
          iconColor: "#c4f0ff",
          color: "#fff",
          fontWeight: 500,
          fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
          fontSize: "16px",
          fontSmoothing: "antialiased",
          ":-webkit-autofill": {
            color: "#fce883",
          },
          "::placeholder": {
            color: "#87BBFD",
          },
        },
        invalid: {
          iconColor: "#FFC7EE",
          color: "#FFC7EE",
        },
      },
    });
    // Add an instance of the card Element into the `card-element` <div>
    card.mount("#card-element");
    card.on("change", (event) => {
      if (event.complete) {
        this.valid = true;
        this.$stripe.createToken(card).then((result) => {
          if (result.error) {
            this.valid = false;
            this.$notify("Invalid card", "error");
          } else if (result.token) {
            this.valid = true;
            this.$notify("Valid Card", "success");
            this.stripeToken = result.token.id;
          }
        });
      } else if (event.error) {
        this.valid = false;
        this.$notify(event.error.message, "error");
      } else if (event.empty) {
        this.valid = false;
        this.$notify("Please enter your credit card number", "error");
      }
    });
  },
};
</script>
