<template>
  <div v-show="show()">
    <div class="section">
      <div class="container">
        <div class="columns is-multiline">
            <CardItem v-for="card in cards" :key="card.id" :card="card"></CardItem>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import CardItem from '@/components/CardItem.vue'

export default {
	name: 'Content',
	components: {
		CardItem
	},	
	computed: {
		cards() {
			return this.$store.state.cards
		}
	},
	methods: {
		show () {
			return this.$store.state.openContentPage
		}
	}
}
</script>
