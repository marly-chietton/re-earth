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
              <strong style="color:white;"> local dj </strong> - <i>it's a disaster</i> - R001 - 12.5 €
              <br>
              TBA
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item" aria-label="retweet" href="https://re-earthrecords.bandcamp.com/" target="_blank" v-bind:style="styleCartIcon">
                <span class="icon is-small">
                  <i class="fas fa-shopping-cart" aria-hidden="true"></i>
                </span>
              </a>
              <a class="level-item" aria-label="vinyl" href="https://www.one-eye-witness.com/release/1649839761/Local-DJ-It's-A-Disaster-EP" target="_blank" v-bind:style="styleVinylIcon">
                <span class="icon is-small">
                  <i class="fas fa-compact-disc" aria-hidden="true"></i>
                </span>
              </a>
              <a class="level-item" aria-label="like" href="https://soundcloud.com/re-earth" target="_blank" v-bind:style="styleHeartIcon">
                <span class="icon is-small">
                  <i class="fas fa-heart" aria-hidden="true"></i>
                </span>
              </a>
            </div>
            <div class="level-right">
              <a class="level-item" aria-label="download" @click="openSecretDownloadForm" v-bind:style="styleDownloadIcon">
                <span class="icon is-small">
                  <i class="fas fa-download" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </nav>
          <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1252273915&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
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
			muted: true,
      activeColor: 'white',
      hoverColor: 'red'
		}	
	},
	computed: {
    styleCartIcon: function() {
      return {
        '--color': 'white',
        '--color-hover': 'orange'
      }
    },
    styleVinylIcon: function() {
      return {
        '--color': 'white',
        '--color-hover': 'green'
      }
    },
    styleHeartIcon: function() {
      return {
        '--color': 'white',
        '--color-hover': 'red'
      }
    },
    styleDownloadIcon: function() {
      return {
        '--color': 'white',
        '--color-hover': 'grey'
      }
    },
		merchs() {
			return this.$store.state.merchs
		},
	},
	methods: {
		getImg(path) {
			return require(path)
		},
    openSecretDownloadForm() {
      this.$store.state.secretDownloadForm = true
    }
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
a {
  color: var(--color);
}

a:hover {
  color: var(--color-hover);
}
</style>

