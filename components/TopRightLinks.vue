<template>
	<div>
		<span>
			<v-icon color="white">mdi-cellphone-iphone</v-icon>
			<a href="/pay-with-mobile">Mobile Pay</a>
		</span>
		<span>
			<a href="/contact">Contact</a>
		</span>
		<span>
			<a href="/loyalty-program">Loyalty Program</a>
		</span>
		<span v-if="this.$auth.loggedIn">
			<v-btn @click="logout">Logout</v-btn>
		</span>
	</div>
</template>

<script>
export default {
	methods: {
		async logout() {
			await this.$auth.logout();
			this.$root.$emit("logout");
		},
	},
};
</script>

<style scoped>
a {
	color: white;
	text-decoration: none;
	color: linear-gradient(to right, purple 50%, white 50%);
	transition: all 500ms ease;
}

a:hover {
	color: purple !important;
}

span {
	padding-right: 10px;
	color: white;
}

.v-overflow-btn {
	margin-top: 22px;
	max-width: 51%;
}

.theme--dark.v-list {
	background-color: #250f24;
	border-radius: 1px;
}
</style>
