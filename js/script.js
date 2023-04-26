import theme from "./components/theme.js";
import createTask from "./components/createTask.js";
import renderTask from "./components/renderTask.js";
import sortTasks from "./components/sortTasks.js";
import filterTasks from "./components/filterTasks.js";
import tutorial from "./components/tutorial.js";
import searchFilter from "./components/searchTasks.js";

window.addEventListener("DOMContentLoaded", function () {
	theme();
	createTask();
	renderTask();
	sortTasks();
	filterTasks();
	tutorial();
	searchFilter();
});
