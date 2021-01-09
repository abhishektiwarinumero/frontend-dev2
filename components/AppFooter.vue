<template>
	<v-footer>
		<v-container>
			<v-row class="main">
				<v-col class="left" sm="12" md="6">
					<v-row>
						<img class="logo" src="/img/logo/logo.png" alt="Logo" />
					</v-row>
					<v-row>
						<p class="disclaimer">
							Disclaimer: King Boosting is not endorsed by Riot games and doesn't
							reflect the views or opinions of Riot games or anyone officially
							involved in production or maintaining of League of Legends and Riot
							Games are trademark or registered trademark of Riot Games, Inc,
							League of legends &copy; Riot Games, Inc.
						</p>
					</v-row>
				</v-col>
				<v-col class="right flex-center" sm="12" md="6">
					<img class="cred-cards" src="/img/cred-cards.png" />
				</v-col>
			</v-row>
			<v-row class="bottom mt-16 mb-16">
				<ul class="navs">
					<li v-for="(nav, index) in navs" :key="index">{{ nav.name }}</li>
				</ul>
			</v-row>
		</v-container>
	</v-footer>
</template>

<script>
export default {
	data: () => ({
		navs: [
			{ name: "FAQ", path: "" },
			{ name: "Jobs", path: "" },
			{ name: "Reviews", path: "" },
			{ name: "Term and Conditions", path: "" },
			{ name: "privacy", path: "" },
			{ name: "Policy", path: "" },
			{ name: "Contact", path: "" },
		],
	}),
};
</script>

<style scoped>
.flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}
.v-footer {
	background: rgb(0, 0, 0);
	background: linear-gradient(0deg, #181818 0%, #181818 80%, #18181800 100%);
	margin-top: -80px;
	box-sizing: border-box;
	padding-top: 80px;
	position: relative;
	z-index: 3;
}
.logo {
	width: 100%;
}
.navs {
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	list-style-type: none;
}
.navs li {
	width: 100%;
	font-size: 16px;
	text-align: center;
	white-space: nowrap;
	border-bottom: 3px solid #fff8;
	box-sizing: border-box;
	padding: 8px 24px;
	transition-duration: 0.15s;
}
.navs li:hover {
	border-bottom-color: #8960e3;
	background-image: linear-gradient(to top, #2d1d50, #2d1d5000);
	cursor: pointer;
}
.main,
.bottom {
	width: 100%;
}
.left,
.right {
	box-sizing: border-box;
	padding: 0 80px;
}
.disclaimer {
	font-size: 10px;
}
.cred-cards {
	width: 100%;
}
</style>
