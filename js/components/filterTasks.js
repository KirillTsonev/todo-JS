import renderTask from "./renderTask.js";

function filterTasks() {
	const dropdownStatus = document.querySelector(".render__header__filter-status");
	const statusMenu = document.querySelector(".render__header__status__dropdown");
	const statusOptions = document.querySelectorAll(".render__header__status__dropdown__option");
	const statusPaths = document.querySelectorAll(".render__header__filter-status-path");
	const dropdownPriority = document.querySelector(".render__header__filter-priority");
	const priorityMenu = document.querySelector(".render__header__priority__dropdown");
	const priorityOptions = document.querySelectorAll(".render__header__priority__dropdown__option");
	const priorityPaths = document.querySelectorAll(".render__header__filter-priority-path");
	const allStatus = document.querySelector(".allStatus");
	const todoStatus = document.querySelector(".todoStatus");
	const inProgressStatus = document.querySelector(".inProgressStatus");
	const doneStatus = document.querySelector(".doneStatus");
	const allPriority = document.querySelector(".allPriority");
	const lowPriority = document.querySelector(".lowPriority");
	const normalPriority = document.querySelector(".normalPriority");
	const highPriority = document.querySelector(".highPriority");

	if (localStorage.getItem("sortStatus")) {
		filterStatus(localStorage.getItem("sortStatus"));
	}

	if (localStorage.getItem("sortPriority")) {
		filterPriority(localStorage.getItem("sortPriority"));
	}

	function filterStatus(option) {
		const originalArr = JSON.parse(localStorage.getItem("tasks"));
		let arrFiltered;

		localStorage.setItem("sortStatus", option);
		localStorage.removeItem("sortPriority");

		document.querySelectorAll(".render__item").forEach((a) => a.remove());

		if (option === "All") {
			renderTask(originalArr);
		} else {
			arrFiltered = originalArr.filter((a) => a.status === option);
			renderTask(arrFiltered);
		}
	}

	function filterPriority(option) {
		const originalArr = JSON.parse(localStorage.getItem("tasks"));
		let arrFiltered;

		localStorage.setItem("sortPriority", option);
		localStorage.removeItem("sortStatus");

		document.querySelectorAll(".render__item").forEach((a) => a.remove());

		if (option === "All") {
			renderTask(originalArr);
		} else {
			arrFiltered = originalArr.filter((a) => a.priority === option);
			renderTask(arrFiltered);
		}
	}

	function addEventListenersFilter(element, fn, arg) {
		element.addEventListener("click", () => {
			fn(arg);
		});
	}

	addEventListenersFilter(allStatus, filterStatus, "All");
	addEventListenersFilter(todoStatus, filterStatus, "Todo");
	addEventListenersFilter(inProgressStatus, filterStatus, "In progress");
	addEventListenersFilter(doneStatus, filterStatus, "Done");

	addEventListenersFilter(allPriority, filterPriority, "All");
	addEventListenersFilter(lowPriority, filterPriority, "Low");
	addEventListenersFilter(normalPriority, filterPriority, "Normal");
	addEventListenersFilter(highPriority, filterPriority, "High");

	document.addEventListener("click", (e) => {
		if (
			statusMenu.classList.contains("active") &&
			(e.target === dropdownStatus || ![...statusOptions].includes(e.target))
		) {
			statusMenu.classList.remove("active");
		} else if (e.target === dropdownStatus || [...statusPaths].includes(e.target)) {
			statusMenu.classList.add("active");
		}

		if (
			priorityMenu.classList.contains("active") &&
			(e.target === dropdownPriority || ![...priorityOptions].includes(e.target))
		) {
			priorityMenu.classList.remove("active");
		} else if (e.target === dropdownPriority || [...priorityPaths].includes(e.target)) {
			priorityMenu.classList.add("active");
		}
	});
}

export default filterTasks;
