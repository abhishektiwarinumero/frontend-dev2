<template>
	<v-container class="title">
		<div class="text-center">
			<p class="overline">Application</p>
			<p class="h2 bold">Booster Application</p>
			<p>Please fill out the form below!</p>
		</div>
		<v-form ref="form" v-model="valid">
			<v-text-field
				name="summoner"
				v-model="summoner"
				:rules="summonerRules"
				label="Summoner name"
				placeholder="Summoner name"
				required
			></v-text-field>

			<v-text-field
				name="email"
				v-model="email"
				:rules="emailRules"
				label="Email"
				placeholder="Email"
				required
			></v-text-field>

			<v-select
				:items="countries"
				:rules="[(v) => !!v || 'Country is required']"
				name="country"
				v-model="country"
				label="Country"
				placeholder="Country"
				required
			></v-select>

			<v-text-field
				name="discord_skype"
				v-model="discord_skype"
				label="Discord / Skype"
				placeholder="Discord / Skype"
				required
			></v-text-field>

			<v-text-field
				name="rank"
				v-model="rank"
				label="Current soloQ rank"
				placeholder="Current soloQ rank"
				required
			></v-text-field>

			<v-text-field
				name="languages"
				v-model="languages"
				label="Spoken languages"
				placeholder="Spoken languages"
				required
			></v-text-field>

			<v-select
				name="games"
				v-model="games"
				:items="gamesItems"
				:rules="[(v) => !!v || 'Games are required']"
				label="Games"
				placeholder="Games"
				multiple
				required
			></v-select>

			<v-select
				name="servers"
				v-model="servers"
				:items="serversItems"
				:rules="[(v) => !!v || 'Servers are required']"
				label="Servers"
				placeholder="Servers"
				multiple
				required
			></v-select>

			<v-select
				name="hours"
				v-model="hours"
				:items="hoursItems"
				item-text="text"
				item-value="value"
				:rules="[(v) => !!v || 'Hours are required']"
				label="Hours"
				placeholder="Hours"
				required
			></v-select>

			<v-textarea
				outlined
				name="application"
				label="Application (Boosting experience, few words about yourself, what do we need to know?)"
			></v-textarea>

			<v-btn
				:disabled="!valid"
				color="primary"
				class="mr-4"
				@click="submit"
			>
				Submit
			</v-btn>

			<v-btn color="error" class="mr-4" @click="reset">
				Reset Form
			</v-btn>
		</v-form>
	</v-container>
</template>


<script>
import countries from "~/assets/js/countries";
export default {
	data: () => ({
		countries: countries,
		valid: false,
		summoner: "",
		summonerRules: [
			(v) => !!v || "Summoner name is required",
			(v) =>
				(v && v.length <= 10) ||
				"Summoner name must be less than 10 characters",
		],
		email: "",
		emailRules: [
			(v) => !!v || "E-mail is required",
			(v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
		],
		select: null,
		country: "",
		discord_skype: "",
		rank: "",
		languages: "",
		games: [],
		gamesItems: [
			"League of Legends",
			"Valorant",
			"Teamfight Tactics",
			"Legends of Runeterra",
			"Wild Rift",
		],
		servers: [],
		serversItems: [
			"NA",
			"EUW",
			"EUNE",
			"OCE",
			"LAS",
			"LAN",
			"RU",
			"TR",
			"KR",
			"JP",
			"Garena",
		],
		hours: [],
		hoursItems: [
			{ value: "1-3", text: "1-3 H/Day" },
			{ value: "4-6", text: "4-6 H/Day" },
			{ value: "7-8", text: "7-8 H/Day" },
			{ value: "8+", text: "8+ H/Day" },
		],
		// This is like a motivation letter attached to the CV
		application: "",
	}),

	methods: {
		submit() {
			this.validate();
			if (this.valid) {
				const formData = new FormData(this.$refs.form.$el); // reference to form element
				const data = {}; // need to convert it before using not with XMLHttpRequest
				for (let [key, val] of formData.entries()) {
					Object.assign(data, { [key]: val });
				}
				this.$axios
					.post("apply", data)
					.then((response) => {
						this.$store.commit("notification/open", {
							text: response.data.message,
							mode: "success",
						});
						this.reset();
					})
					.catch((errors) => {
						this.$store.commit("notification/open", {
							text: errors.response.data.message,
							mode: "error",
							errors: errors.response.data.errors,
						});
					});
			}
		},
		validate() {
			this.$refs.form.validate();
		},
		reset() {
			this.$refs.form.reset();
		},
	},
};
</script>
