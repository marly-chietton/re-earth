<template>
  <div v-show="show()">
    <div class="section">
      <div class="container">
        <MerchItem v-for="merch in merchs" :key="merch.id" :merch="merch"></MerchItem>
      </div>
    </div>
	</div>
</template>

<script>
import MerchItem from '@/components/MerchItem.vue'

export default {
	name: 'Merch',
	components: {
		MerchItem
	},	
	computed: {
		merchs() {
			return this.$store.state.merchs
		}
	},
	methods: {
		show () {
			return this.$store.state.openMerchPage
		}
	}
}
</script>

