<template>
  <div class="column is-one-quarter">
      <div class="zoom"  @mouseover="unmute()" @mouseout="mute()">
        <video :id="card.path" v-show="!show()" playsinline autoplay loop :muted="muted">
          <source :src="getImg(card.path)" type="video/mp4">
        </video>
        <img :src="getImg(card.path)" v-show="show()">
      </div>
  </div>
</template>

<script>
export default {
	name: 'CardItem',
	props: ["card"],
	data() {
		return {
			muted: true
		}	
	},
	computed: {
		cards() {
			return this.$store.state.cards
		},
		generalVolume() {
			return this.$store.state.generalVolumeMute
		},
    autoPlayAll() {
      return this.$store.state.autoPlayAll
    },
	},
	methods: {
		getImg(path) {
			return require('../../assets/'+path)
		},
		show() {
			return this.card.type === 'image'
		},
		unmute() {
			this.muted = (this.generalVolume ? true : false)
		},
		mute() {
			this.muted = true
		}
	}
}
</script>
<style>
@import "../../node_modules/bulma/bulma.sass";
.zoom {
  transition: transform .2s
}

.zoom:hover {
  transform: scale(1.1)
}
</style>
