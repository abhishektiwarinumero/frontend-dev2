<template>
	<v-stepper v-model="currentStep">
		<v-stepper-header>
			<!-- 3 templates here -->
			<template>
				<v-stepper-step
					:key="register ? 'register' : 'login'"
					:complete="this.$auth.loggedIn"
					step="1"
				>
					{{ register ? "Register" : "Login" }}
				</v-stepper-step>
				<v-divider v-if="1 !== steps" key="1"></v-divider>
			</template>
			<template>
				<v-stepper-step
					key="order-details"
					:complete="currentStep > 2"
					step="2"
				>
					Details
				</v-stepper-step>
				<v-divider v-if="2 !== steps" key="2"></v-divider>
			</template>
			<template>
				<v-stepper-step key="pay" :complete="currentStep > 3" step="3">
					Pay
				</v-stepper-step>
				<v-divider v-if="3 !== steps" key="3"></v-divider>
			</template>
		</v-stepper-header>
		<v-stepper-items>
			<v-stepper-content key="1-content" step="1">
				<login @next="nextStep(1)" @cancel="cancel" v-if="!register" />
				<register
					v-if="register"
					@next="nextStep(1)"
					@cancel="cancel"
				/>
			</v-stepper-content>
			<order-details @next="nextStep(2)" />
			<pay @cancel="cancel" />
		</v-stepper-items>
	</v-stepper>
</template>

<script>
export default {
	data() {
		return {
			currentStep: 1,
			valid: false,
			steps: 3,
			register: false,
		};
	},
	computed: {
		priceUSD() {
			return (this.price * this.exchangeRate).toFixed(2);
		},
	},
	methods: {
		getBoostersList() {
			this.$axios
				.get("/getBoostersNames")
				.then((res) => {
					this.boosters = res.data;
					this.boostersLoading = false;
				})
				.catch((err) => {
					// TODO:
				});
		},
		sendResetPasswordEmail() {
			this.$axios
				.post("/password/email", {
					email: this.email,
				})
				.then((response) => {
					alert(response.data.status);
				})
				.catch((error) => {
					alert(error.response.data.errors.email[0]);
				});
		},
		login() {
			this.$axios
				.post("/login", {
					email: this.email,
					password: this.password,
				})
				.then((response) => {
					alert(response.data.status);
					this.nextStep(1);
					// Make API call to get boosters
					this.getBoostersList();
				})
				.catch((error) => {
					alert(error.response.data.errors);
				});
		},
		closeDialog() {
			this.currentStep = 1;
			this.$emit("closeDialog");
		},
		cancel() {
			this.$emit("closeDialog");
		},
		nextStep(n) {
			if (n === this.steps) {
				this.currentStep = 1;
			} else {
				this.currentStep = n + 1;
			}
		},
	},
	mounted() {
		if (this.$auth.loggedIn) {
			this.currentStep = 2;
		}
		this.$root.$on("openRegisterForm", () => {
			this.register = true;
		});
		this.$root.$on("logout", () => {
			this.currentStep = 1;
		});
	},
};
</script>
