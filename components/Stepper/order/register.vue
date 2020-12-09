<template>
	<v-stepper-content key="1-content" step="1">
		<v-row>
			<v-col>
				<RegisterForm @close="nextStep" @cancel="cancel"></RegisterForm>
			</v-col>
		</v-row>
	</v-stepper-content>
</template>

<script>
export default {
	methods: {
		nextStep() {
			this.$emit("next", 1);
		},
		cancel() {
			this.$emit("cancel");
		}
	}
};
</script>
