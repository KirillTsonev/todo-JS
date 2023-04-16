import theme from "./components/theme.js";
import createTask from "./components/createTask.js";
import renderTask from "./components/renderTask.js";
import changeStatusAndPriority from "./components/changeStatusAndPriority.js";
import sortTasks from "./components/sortTasks.js";
import filterTasks from "./components/filterTasks.js";
import tutorial from "./components/tutorial.js";

window.addEventListener("DOMContentLoaded", function () {
	theme();
	createTask();
	renderTask();
	changeStatusAndPriority();
	sortTasks();
	filterTasks();
	tutorial();
});
