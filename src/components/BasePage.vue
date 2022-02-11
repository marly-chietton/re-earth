<template>
  <div>
    <nav class="navbar is-fixed" ref="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div>
          <a href="/">
            <img class="navbar-item" src="../../public/logo-white.svg" width="100" height="70"/>
          </a>
        </div>
      </div>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="activeNavBarMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      <div :class="isActive('burger') ? 'navbar-menu is-active' : 'navbar-menu'">
        <div class="navbar-start">
          <a class="navbar-item" @click="openContentPage()">
            Home
          </a>
          <a class="navbar-item" @click="openStreamPage()">
            Stream
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
    <div class="hero is-primary is-fullheight">
      <Merch v-if="showMerchPage"></Merch>
      <Content v-if="showContentPage"></Content>
      <Stream v-if="showStreamPage"></Stream>
    </div>
  </div>
</template>

<script>
import Lottie from '@/components/Lottie.vue'
import Content from '@/components/Content.vue'
import Merch from '@/components/Merch.vue'
import Stream from '@/components/Stream.vue'
import * as animationData from '../../assets/animations/data.json';


export default {
  name: 'BasePage',
  components: {
    Lottie,
		Content,
    Merch,
    Stream,
  },
  data() {
    return {
      isActiveNavBarMenu: false,
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
    },
    showStreamPage() {
      return this.$store.state.openStreamPage
    }
  },
  methods: {
		openContentPage () {
			this.$store.state.openMerchPage = false
			this.$store.state.openContentPage = true
			this.$store.state.openStreamPage = false
		},
		openMerchPage () {
			this.$store.state.openMerchPage = true
			this.$store.state.openContentPage = false
			this.$store.state.openStreamPage = false
		},
    openStreamPage () {
			this.$store.state.openMerchPage = false
			this.$store.state.openContentPage = false
			this.$store.state.openStreamPage = true
    },
		volumeChange () {
			this.button = ((this.button === 'fas fa-volume-mute') ? 'fas fa-volume-up' : 'fas fa-volume-mute')
			this.$store.state.generalVolumeMute = (this.button === 'fas fa-volume-mute')
		},
    isActive(item) {
      return this.isActiveNavBarMenu
    },
    activeNavBarMenu() {
      this.isActiveNavBarMenu = !this.isActiveNavBarMenu
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

