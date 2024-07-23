<script setup lang="ts">

</script>

<template>
	<nav>
		<ul>
			<li>
				<router-link to="/">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
						<path fill="currentColor"
									d="M6 19h3v-5q0-.425.288-.712T10 13h4q.425 0 .713.288T15 14v5h3v-9l-6-4.5L6 10zm-2 0v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-4q-.425 0-.712-.288T13 20v-5h-2v5q0 .425-.288.713T10 21H6q-.825 0-1.412-.587T4 19m8-6.75" />
					</svg>
				</router-link>
			</li>
			<li>
				<router-link to="/search">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
						<path fill="currentColor"
									d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" />
					</svg>
				</router-link>
			</li>
			<!--			<li><router-link to="/about"></router-link></li>-->
		</ul>
		<div class="hilighter"></div>
	</nav>
</template>

<style scoped>
	nav {
		background-color: #333;
		position: fixed;
		top: calc(50% - ((2 * (32px + 10px)) + 30px) / 2); /* 50% - (2 * (icon + margin) + padding) / 2 */
		left: 10px;
		height: calc((2 * (32px + 10px)) + 30px); /* 2 * (icon + margin) + padding */
		width: calc(32px + 20px);
		border-radius: 20px;
	}

	ul {
		padding: 0;
		display: flex;
		flex-direction: column;
		list-style-type: none;
	}

	li {
		margin-left: 10px;
		margin-right: 10px;
		margin-bottom: 10px;

		border-radius: 10px;
	}

	a {
		color: white;
		text-decoration: none;
	}

	li:has(a.router-link-active) {
		background-color: #242424;
	}

	a:hover {
		filter: drop-shadow(0 0 5px white);
	}
</style>