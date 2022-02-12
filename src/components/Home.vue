<template>
  <div v-show="show()">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="section" style="height: 100%;">
          <div class="container has-text-vcentered" style="height: 100%;">
            <div class="columns" style="height: 100%;">
              <div class="column" style="flex: 0 1 auto">
                <p class="title has-text-white">
                  Please welcome on the re:earth records website
                </p>
                <p class="subtitle has-text-white">
                  Have fun looking around :)
                </p>
              </div>
              <div class="column" style="flex: 0 1 auto">
                <img class="image" style="height: 400px;" src="../../assets/white-transparency.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
	</div>
</template>

<script>

export default {
	name: 'Home',
	methods: {
		show () {
			return this.$store.state.openHomePage
		}
	}
}
</script>

<style>
</style

