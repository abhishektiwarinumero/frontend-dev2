<template>
	<div class="why-us">
		<div class="section-name">
			<h1>{{ $t('Why Us') }}</h1>
		</div>
		<v-container class="container">
			<v-row>
				<v-card class="card" align-self="center" v-for="(item, index) in priorities" :key="index">
					<v-col>
						<v-icon size="100px" class="icons">{{icons[index]}}</v-icon>
						<v-card-title>
							<h2>{{ item.title }}</h2>
						</v-card-title>
						<v-card-text class="headline">
							<p>{{ item.description }}</p>
						</v-card-text>
					</v-col>
				</v-card>
			</v-row>
		</v-container>
	</div>
</template>

<script>
export default {
	data() {
		return {
			priorities: [
{
"icon": "/nothing.png",
"title": "+5 Years of Expertise in LOL boosting",
"description": "KingBoosting has been operating in the lol elo boost market for more than five years. Throughout this time the company amassed an incredible amount of experience in elo boosting. We continue to gather experience to this day and continue to improve our lol boost services to stay ahead of the competition in all aspects of the services that we provide. Every new buyer and new order adds to this experience and helps our organization to grow and perform even better in the future. Staying customer oriented and being agile to the different changes in the lol elo boosting environment is a crucial factor for our success."
},
{
"icon": "/nothing.png",
"title": "Challenger LOL ELO boosting team",
"description": "The company is known for employing the top LoL boosters, who are playing at the highest levels of the game. The minimum requirement to boost at BoostRoyal, is reaching the challenger tier and high prior experience in lol boosting. By employing and managing the best lol boosting team available, we are able to provide the highest win-rates and top quality performances. To make this possible, we never stop manage our lol boosters, who have to go through a strict selection process. By having increased control over the lol elo booster team, it allows us to get the most performance out of our players and provide a seamless boosting experience for all of our users."
},
{
"icon": "/nothing.png",
"title": "Best & Highly Customizable ELO boosting experience",
"description": "We provide the widest range of lol elo boosting related services in the boosting industry. Our service portfolio is designed with the ultimate goal of providing maximum user satisfaction. We believe, that having a high number of services are required in the field of lol elo boosting as each LoL player has different goals in the game. To help in reaching these goals, BoostRoyal does not only offer a high selection of different lol elo boosting methods, such as solo queue, duoe queue or placement matches, but additional customizability features for each of these boost types. We offer add-on options, such as priority delivery, specific champions or coaching."
}
],
			icons: [
				"mdi-school",
				"mdi-google-circles-communities",
				"mdi-chart-bubble"
			]
		};
	}
};
</script>

<style scoped>
.container {
	margin-top: 50px;
	margin-bottom: 30px;
}
.icons {
	background: -webkit-linear-gradient(#673ab7, #9c27b0);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.why-us {
	background-color: #212224;
	position: relative;
	background-image: url("/img/backgrounds/priorities-bg.webp");
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
}

h1 {
	margin: 0;
}

ul {
	list-style-type: none;
	background-color: #212224;
}

h2 {
	color: #9c27b0;
}

p {
	color: #999a9c;
	font-size: 14px;
}
.section-name {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 200px;
	height: 60px;
	background: linear-gradient(#673ab7, #9c27b0);
	z-index: 1;
	position: absolute;
	top: -30px;
}

.card {
	margin-top: 20px;
	margin-bottom: 20px;
	opacity: 0.8;
}
</style>

<i18n>
{
    "en": {
        "Why Us": "Why Us"
	},
    "fr": {
       "Why Us": "Pourquoi nous"
	},
	"it": {
		"Why Us": "Perché noi"
	},
	"de": {
		"Why Us": "Why Us"
	},
	"at": {
		"Why Us": "Why Us"
	},
	"swiss": {
		"Why Us": "Why Us"
	},
	"es": {
		"Why Us": "Why Us"
	},
	"nl": {
		"Why Us": "Why Us"
	},
	"se": {
		"Why Us": "Why Us"
	},
	"ne": {
		"Why Us": "Why Us"
	},
	"dk": {
		"Why Us": "Why Us"
	}
}
</i18n>
