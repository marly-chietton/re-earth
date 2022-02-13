<template>
	<div id="app" style="height: 100vh;">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
/* Order is important */
@import '../node_modules/bulma/css/bulma.css';
/* Order is important */
@import '../css/mystyles.css';

</style>
