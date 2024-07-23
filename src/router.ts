import {createMemoryHistory, createRouter} from "vue-router";

const router = createRouter({
	history: createMemoryHistory(),
	routes: [
		{
			path: "/",
			component: () => import("./pages/HomePage.vue"),
		},
		{
			path: "/search",
			component: () => import("./pages/HomePage.vue"),
		},
	],
});

export default router;