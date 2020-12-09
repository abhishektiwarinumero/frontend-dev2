<template>
	<v-row>
		<v-col>
			<RegisterForm @close="nextStep" @cancel="cancel"></RegisterForm>
		</v-col>
	</v-row>
</template>

<script>
export default {
	methods: {
		nextStep() {
			this.$emit("next", 1);
		},
		cancel() {
			this.$emit("cancel");
		},
	},
};
</script>
