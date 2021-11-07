<template>
  <div class="hero is-white is-fullheight">
    <nav class="navbar is-fixed is-white is-active" ref="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div>
          <a href="/">
            <img class="navbar-item" src="../../assets/animations/re-earth-site.gif" style="width: 150px; padding: 0.85rem"/>
          </a>
        </div>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item">
            <button class="button" @click="volumeChange()">
							<span class="icon is-small">
								<i :class="button"></i>
							</span>
						</button>
          </a>
        </div>
      </div>
    </nav>
		<Content></Content>
  </div>
</template>

<script>
import Lottie from '@/components/Lottie.vue'
import Content from '@/components/Content.vue'
import * as animationData from '../../assets/animations/data.json'

export default {
  name: 'BasePage',
  components: {
    Lottie,
		Content
  },
  data() {
    return {
      defaultOptions: {
        animationData: animationData,
        loop: true,
        autoplay: true,
        renderer: 'svg'
      },
      animationSpeed: 1,
      imgfile: '../../assets/re-earth_logo_H_blanc_1.png',
			button:'fas fa-volume-mute',
    }
  },
  methods: {
		openContentPage () {
			this.$store.state.openHomePage = false
			this.$store.state.openContentPage = true
		},
		openHomePage () {
			this.$store.state.openHomePage = true
			this.$store.state.openContentPage = false
		},
		show () {
			return this.$store.state.openHomePage
		},
		volumeChange () {
			this.button = ((this.button === 'fas fa-volume-mute') ? 'fas fa-volume-up' : 'fas fa-volume-mute')
			this.$store.state.generalVolumeMute = (this.button === 'fas fa-volume-mute')
		}
  },
  mounted () {
  }
}

</script>

<style>
.hero {
 background: white
} 
</style>

