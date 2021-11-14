<template>
  <div class="zoom">
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-128x128">
            <img class="image" src="../../assets/RE001.png">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>local dj</strong> - <i>it's a disaster</i> - RE001
              <br>
              Released in 2022, local dj allows us to...
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
      </article>
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
  transform: scale(1.1)
}
</style>

