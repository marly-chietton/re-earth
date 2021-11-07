<template>
	<div id="app" style="height: 100vh">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import '../node_modules/bulma/css/bulma.css';
@import '../node_modules/@fortawesome/fontawesome-free/css/all.css';


$white: #ff8606;
$white-invert: findColorInvert($white);
$custom-colors: ("white": ($white, $white-invert));

</style>
