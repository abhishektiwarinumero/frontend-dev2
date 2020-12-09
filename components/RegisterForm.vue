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
					label="Confirm e-mail address"
					placeholder="Confirm e-mail address"
					v-model="credentials.email_confirmation"
					:rules="emailRules"
					:error-messages="emailErrors"
					required
				></v-text-field>
			</v-flex>
			<v-flex cols="12" md="6">
				<v-text-field
					v-model="username"
					label="Username"
					:rules="usernameRules"
					required
					placeholder="Your username"
				></v-text-field>
			</v-flex>
		</v-layout>
	</v-form>
</template>

<script>
export default {
	data() {
		return {
			valid: true,
			credentials: {
				email: "",
				email_confirmation: ""
			},
			emailErrors: [],
			emailRules: [
				(v) => !!v || "E-mail is required",
				(v) => /.+@.+/.test(v) || "E-mail must be valid",
			],
			username: "",
			usernameRules: [
				(v) => !!v || "Username is required",
				(v) => v.length >= 3 || "Please insert a valid username",
			],
		};
	},
	methods: {
		async login() {
			try {
				let response = await this.$auth
					.loginWith("local", {
						data: this.credentials,
					})
					.then((response) => {
						this.$store.commit("notification/open", {
							text: "Logged In",
							mode: "success",
						});
						this.close();
					})
					.catch((error) => {
						this.$store.commit("notification/open", {
							text: error.response.data.message,
							mode: "error",
						});
					});
			} catch (error) {
				this.$store.commit("notification/open", {
					text: error,
					mode: "error",
				});
			}
		},
		close() {
			this.$emit("close");
		},
	},
};
</script>
