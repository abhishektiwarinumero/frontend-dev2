<template>
	<v-form v-model="valid" ref="form" @submit.prevent="userLogin">
		<v-layout column>
			<v-flex>
				<v-text-field
					label="Email address"
					placeholder="Your email address"
					v-model="login.email"
					:rules="emailRules"
					:error-messages="emailErrors"
					required
				></v-text-field>
			</v-flex>
			<v-flex>
				<v-text-field
					type="password"
					v-model="login.password"
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
					<v-btn
						color="#673AB7"
						small
						:disabled="!valid"
						type="submit"
						>Continue</v-btn
					>
					<v-btn text small @click="cancel">Cancel</v-btn>
				</v-row>
			</v-flex>
		</v-layout>
	</v-form>
</template>

<script>
export default {
	data() {
		return {
			valid: true,
			login: {
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
				(v) =>
					v.length >= 8 || "Password must be at least 8 characters",
			],
		};
	},
	methods: {
		async userLogin() {
			try {
				const { data } = await this.$auth.loginWith("laravelSanctum", {
					data: this.login,
				});
				this.$store.commit("notification/open", {
					text: "Logged In",
					mode: "success",
				});
				this.close();
			} catch (errors) {
				this.$store.commit("notification/open", {
					text: errors,
					mode: "error",
				});
			}
		},
		requestPasswordReset() {
			if (!this.email) {
				this.emailErrors = [
					"Please fill out email field to reset your password",
				];
				this.$store.commit("notification/open", {
					text: "Please fill out email field to reset your password",
					mode: "error",
				});
				return;
			} else {
				// Send the email via axios to request password reset
				this.$axios
					.$post("/password/email", { email: this.email })
					.then((response) => {
						this.$store.commit("notification/open", {
							text:
								"We have sent you an email to reset your password",
							mode: "success",
						});
					})
					.catch((errors) => {
						this.$store.commit("notification/open", {
							text: {
								text: "Something went wrong",
								mode: "error",
							},
						});
					});
			}
		},
		close() {
			this.$emit("close");
		},
		cancel() {
			this.$emit("close");
		},
	},
};
</script>
