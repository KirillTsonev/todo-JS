import renderTask from "./renderTask.js";

function sortTasks() {
	const sortDateAscending = document.querySelector(".render__header__sort-date-ascending");
	const sortDateDescending = document.querySelector(".render__header__sort-date-descending");
	const sortPriorityAscending = document.querySelector(".render__header__sort-priority-ascending");
	const sortPriorityDescending = document.querySelector(".render__header__sort-priority-descending");
	let arrToSort;

	if (localStorage.getItem("directionDate")) {
		sortByDate(localStorage.getItem("directionDate"));
	}

	if (localStorage.getItem("directionPriority")) {
		sortByPriority(localStorage.getItem("directionPriority"));
	}

	function sortByDate(direction) {
		arrToSort = JSON.parse(localStorage.getItem("tasks"));
		//Sorts the array by date, while preserving the immutability of the array
		if (direction === "ascending") {
			arrToSort = [...arrToSort.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))];
		} else {
			arrToSort = [...arrToSort.sort((a, b) => new Date(b.deadline) - new Date(a.deadline))];
		}

		localStorage.setItem("directionDate", direction);
		localStorage.removeItem("directionPriority");
		//Renders the new array
		document.querySelectorAll(".render__item").forEach((a) => a.remove());
		renderTask(arrToSort);
	}

	//The priorityArr passed as an argument establishes the sorting order of the priority strings
	function sortByPriority(priorityArr) {
		arrToSort = JSON.parse(localStorage.getItem("tasks"));
		//Sorts the array by priority, while preserving the immutability of the array
		arrToSort = [...arrToSort.sort((a, b) => priorityArr.indexOf(a.priority) - priorityArr.indexOf(b.priority))];

		localStorage.setItem("directionPriority", priorityArr);
		localStorage.removeItem("directionDate");
		//Renders the new array
		document.querySelectorAll(".render__item").forEach((a) => a.remove());
		renderTask(arrToSort);
	}

	function addEventListenersSort(element, fn, arg) {
		element.addEventListener("click", () => {
			fn(arg);
		});
	}

	addEventListenersSort(sortDateAscending, sortByDate, "ascending");
	addEventListenersSort(sortDateDescending, sortByDate, "descending");
	addEventListenersSort(sortPriorityAscending, sortByPriority, ["Low", "Normal", "High"]);
	addEventListenersSort(sortPriorityDescending, sortByPriority, ["High", "Normal", "Low"]);
}

export default sortTasks;
