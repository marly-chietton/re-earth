<template>
  <div>
    <nav class="navbar is-fixed is-white" ref="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div>
          <a href="/">
            <img class="navbar-item" src="../../public/logo.svg" width="100" height="20"/>
          </a>
        </div>
      </div>
      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <a class="navbar-item" @click="openContentPage()">
            Home
          </a>
          <a class="navbar-item" @click="openMerchPage()">
            Merch
          </a>
        </div>
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
    <div class="hero is-white is-fullheight">
      <Merch v-if="showMerchPage"></Merch>
      <Content v-if="showContentPage"></Content>
    </div>
  </div>
</template>

<script>
import Lottie from '@/components/Lottie.vue'
import Content from '@/components/Content.vue'
import Merch from '@/components/Merch.vue'
import * as animationData from '../../assets/animations/data.json'

export default {
  name: 'BasePage',
  components: {
    Lottie,
		Content,
    Merch,
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
			button:'fas fa-volume-mute',
    }
  },
  computed: {
    showContentPage() {
      return this.$store.state.openContentPage
    },
    showMerchPage() {
      return this.$store.state.openMerchPage
    }
  },
  methods: {
		openContentPage () {
			this.$store.state.openMerchPage = false
			this.$store.state.openContentPage = true
		},
		openMerchPage () {
			this.$store.state.openMerchPage = true
			this.$store.state.openContentPage = false
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

