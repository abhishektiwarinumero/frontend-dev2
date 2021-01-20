<template>
	<v-row>
		<v-col cols="12" sm="6" md="7">
			<v-card raised>
				<v-container>
					<v-row>
						<v-col md="3">1. Champion</v-col>
						<v-col md="3">2. Current tier</v-col>
						<v-col md="3">3. Desired tier</v-col>
						<v-col md="3">4. Token remaining</v-col>
					</v-row>
					<v-row justify="center" align="center">
						<v-col>
							<v-avatar size="128">
								<v-img :src="`https://ddragon.leagueoflegends.com/cdn/8.18.2/img/champion/${champion}.png`"></v-img>
							</v-avatar>
						</v-col>
						<v-col>
							<v-avatar size="128">
								<v-img :src="`/img/tiers/${currentTier}.png`"></v-img>
							</v-avatar>
						</v-col>
						<v-col>
							<v-avatar size="128">
								<v-img :src="`/img/tiers/${desiredTier}.png`"></v-img>
							</v-avatar>
						</v-col>
						<v-col v-if="currentTier >= 5">
							<span v-text="token" class="text-h1 purple--text"></span>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-select v-model="champion" :items="champions" item-text="name" item-value="name"></v-select>
						</v-col>
						<v-col>
							<v-select v-model="currentTier" :items="[0,1,2,3,4,5,6]"></v-select>
						</v-col>
						<v-col>
							<v-select v-model="desiredTier" :items="[1,2,3,4,5,6,7]"></v-select>
						</v-col>
						<v-col v-if="currentTier >= 5">
							<v-select v-model="token" :items="[1,2,3,4,5]"></v-select>
						</v-col>
					</v-row>
				</v-container>
			</v-card>
		</v-col>
		<v-col cols="6" md="5">
			<checkout :options="options" />
			<boost-me />
		</v-col>
	</v-row>
</template>

<script>
import champions from "~/assets/js/champions";

export default {
	layout: "order",
	data: () => ({
		champions: champions,
		champion: "Aatrox",
		currentTier: 5,
		desiredTier: 7,
		token: 5,
		options: [
			{
				checked: false,
				icon: "mdi-account-remove",
				title: "Appear offline on chat",
				percentage: 0,
				tip:
					"This option will make your account offline in the League Client chat, therefore your friends won't see when the booster is playing on your account",
			},
			{
				checked: false,
				icon: "mdi-flash",
				title: "Priority order at",
				percentage: 20,
				tip:
					"This option ensures that your order will be treated with a higher priority, thus resulting in a faster completion.",
			},
			{
				checked: false,
				icon: "mdi-video",
				title: "With Streaming at",
				percentage: 15,
				tip:
					"Your assigned booster will record/live stream all the games, depending on your requirements.",
			},
		],
	}),
};
</script>
