<template>
  <div>
    <section class="hero is-fullheight">
    <nav class="navbar" ref="navbar" role="navigation" aria-label="main navigation">
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
        <div class="navbar-start has-text-white">
          <a class="navbar-item" @click="openHomePage()">
            Home
          </a>
          <a class="navbar-item" @click="openContentPage()">
            Media
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
      <div class="container is-fluid flex-direction">
        <Home v-show="showHomePage()"></Home>
        <Content v-show="showContentPage()"></Content>
        <Stream v-show="showStreamPage()"></Stream>
        <Merch v-show="showMerchPage()"></Merch>
      </div>
    </section>
  </div>
</template>

<script>
import Lottie from '@/components/Lottie.vue'
import Home from '@/components/Home.vue'
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
    Home,
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
  methods: {
    showContentPage() {
      return this.$store.state.openContentPage
    },
    showMerchPage() {
      return this.$store.state.openMerchPage
    },
    showStreamPage() {
      return this.$store.state.openStreamPage
    },
    showHomePage() {
      return this.$store.state.openHomePage
    },
		openContentPage () {
			this.$store.state.openMerchPage = false
			this.$store.state.openStreamPage = false
			this.$store.state.openHomePage = false
			this.$store.state.openContentPage = true
		},
		openMerchPage () {
			this.$store.state.openContentPage = false
			this.$store.state.openStreamPage = false
			this.$store.state.openHomePage = false
			this.$store.state.openMerchPage = true
		},
    openStreamPage () {
			this.$store.state.openMerchPage = false
			this.$store.state.openContentPage = false
			this.$store.state.openHomePage = false
			this.$store.state.openStreamPage = true
    },
    openHomePage () {
			this.$store.state.openMerchPage = false
			this.$store.state.openContentPage = false
			this.$store.state.openStreamPage = false
			this.$store.state.openHomePage = true
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
 background: #BCD9DA;
} 
</style>

