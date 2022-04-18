<template>
  <div class="modal is-active" v-show="show">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"> Download the EP ! </p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <p> Secret Password </p>
        <div class="field has-addons">
          <p class="control is-expanded has-icons-right">
            <input class="input" v-model="password" type="text" placeholder="Type secret password">
            <span class="icon is-small is-right">
              <i :class="passwordIsCorrect() ? 'fas fa-check' : 'fas fa-times'"></i>
            </span>
          </p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-link" @click="submit" :disabled="!passwordIsCorrect()"> DOWNLOAD </button>
        <button class="button" @click="close"> CANCEL </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "DownloadWav",
  data() {
    return {
      password: '',
    }
  },
  computed: {
    show() {
      return this.$store.state.secretDownloadForm;
    },
    secret_password() {
      return this.$store.state.password
    }
  },
  methods: {
    submit() {
      window.open("https://drive.google.com/drive/folders/1C81QVUTCMBw5r1Lz8f2d5jiF4aUemYv9?usp=sharing", '_blank').focus();
      this.close();
    },
    close() {
      this.$store.state.secretDownloadForm = false;
    },
    passwordIsCorrect() {
      return this.secret_password === this.password
    }
  },
};
</script>

<style scoped></style>

