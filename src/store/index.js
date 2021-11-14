import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		generalVolumeMute: true,
		openContentPage: false,
		openMerchPage: true,
    autoPlayAll: false,
		cards: {
			0: {
				title: "Choose your character",
				path: "animations/01-2020 animation.mp4",
				type: "video"
			},
			1: {
				title: "Choose your character",
				path: "animations/water - 2gether.mp4",
				type: "video"
			},
			2: {
				title: "Choose your character",
				path: "animations/10-2019 animation (1).mp4",
				type: "video"
			},
			3: {
				title: "Choose your character",
				path: "animations/teaser 01 - reearth.mp4",
				type: "video",
			},
			4: {
				title: "Choose your character",
				path: "animations/animation.mp4",
				type: "video",
			},
			5: {
				title: "Choose your character",
				path: "animations/11-2019 animation.mp4",
				type: "video",
			},
			6: {
				title: "Choose your character",
				path: "animations/12-2019 animation.mp4",
				type: "video",
			},
			7: {
				title: "Choose your character",
				path: "animations/09-2019 animation.mp4",
				type: "video",
			},
			8: {
				title: "Choose your character",
				path: "animations/02-2020 animation (florian).mp4",
				type: "video",
			},
		},
    merchs: {
      1: {
        title: "local dj",
        path: "./assets/re-earth_logo_H_blanc_1.png",
      }
    }
	}
});
