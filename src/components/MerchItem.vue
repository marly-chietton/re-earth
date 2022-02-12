<template>
  <div class="zoom">
    <div class="box">
      <div class="columns" style="height: 100%;">
        <div class="column" style="flex: 0 1 auto">
            <img class="image" src="../../assets/R001.png">
        </div>
        <div class="column">
          <div class="content">
            <p>
              <strong>local dj</strong> - <i>it's a disaster</i> - RE001 - 12€
              <br>
              TBA
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item" aria-label="retweet" href="https://re-earthrecords.bandcamp.com/" target="_blank">
                <span class="icon is-small">
                  <i class="fas fa-shopping-cart" aria-hidden="true"></i>
                </span>
              </a>
              <a class="level-item" aria-label="like" href="https://soundcloud.com/re-earth" target="_blank">
                <span class="icon is-small">
                  <i class="fas fa-heart" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'MerchItem',
	props: ["merch"],
	data() {
		return {
			muted: true
		}	
	},
	computed: {
		merchs() {
			return this.$store.state.merchs
		},
	},
	methods: {
		getImg(path) {
			return require(path)
		},
	}
}
</script>
<style>
.zoom {
  transition: transform .2s
}

.zoom:hover {
  transform: scale(1.01)
}
</style>

