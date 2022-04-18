<template>
  <div v-show="show()">
    <div class="section">
      <div class="container">
        <div class="zoom">
          <div class="box">
            <div class="columns" style="height: 100%;">
              <div class="column" style="flex: 0 1 auto">
                <iframe class="responsive-iframe" src="https://www.youtube.com/embed/TUGCt8N0M-k" title="RE:EARTH SHOW" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                </iframe>
              </div>
              <div class="column">
                <div class="content">
                <h2>RE:EARTH SHOW</h2>
                  <p><i>date </i>: <b>march 6th, 2022</b></p>
                  <p>4h of mix with some friends at home.</p>
                  <a>https://soundcloud.com/seriousa</a></br>
                  <a>https://soundcloud.com/bernadette_musique</a></br>
                  <a>https://soundcloud.com/itslocaldj</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>

export default {
	name: 'Stream',
	methods: {
		show () {
			return this.$store.state.openStreamPage
		}
	}
}
</script>

<style>
/* style for responsive iframe */
.container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

/* Then style the iframe to fit in the container div with full height and width */
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.box {
  background-color: purple;
}
</style
