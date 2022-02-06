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
              Released in may 2022, local dj allows us to...
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item" aria-label="reply">
                <span class="icon is-small">
                  <i class="fas fa-reply" aria-hidden="true"></i>
                </span>
              </a>
              <a class="level-item" aria-label="retweet">
                <span class="icon is-small">
                  <i class="fas fa-shopping-cart" aria-hidden="true"></i>
                </span>
              </a>
              <a class="level-item" aria-label="like">
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
@import "../../node_modules/bulma/bulma.sass";
.zoom {
  transition: transform .2s
}

.zoom:hover {
  transform: scale(1.01)
}
</style>

