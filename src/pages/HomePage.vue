<script setup lang="ts">
	import {onMounted, ref} from "vue";
	import {getNewGames, setWindowTitle} from "@/data/IPC/IPCMessages";

	const games = ref<any[]>([]);

	onMounted(async () =>{
		games.value = await getNewGames()
	})



</script>

<template>
	<div class="page">
		<h1>Popular games</h1>
		<div class="container">
			<div v-for="game in games" :key="game.name" class="card">
				<img :src="game.image" alt="game.name" />
				<p>{{ game.name }}</p>
<!--				<a :href="game.magnet">Download</a>-->
			</div>
		</div>
	</div>
</template>

<style scoped>
	img {
		margin-top: 5px;
		width: 120px;
		border-radius: 25px;
	}

	.page {
		position: absolute;
		left: 90px;
	}

	.card {
		border-radius: 25px;
		background-color: #333;
		padding: 10px;
		margin: 10px;
		width: 125px;
		text-align: center;
	}

	.container {
		display: flex;
		flex-wrap: wrap;
	}
</style>