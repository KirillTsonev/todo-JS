import renderTask from "./renderTask.js";

function sortTasks() {
	//The button for sorting by date, ascending
	const sortDateAscending = document.querySelector(".render__header__sort-date-ascending");
	//The button for sorting by date, descending
	const sortDateDescending = document.querySelector(".render__header__sort-date-descending");
	//The button for sorting by priority, ascending
	const sortPriorityAscending = document.querySelector(".render__header__sort-priority-ascending");
	//The button for sorting by priority, descending
	const sortPriorityDescending = document.querySelector(".render__header__sort-priority-descending");
	//Stores the array to be edited
	let arrToSort;

	function sortByDateAscending() {
		//Grabs the array from localStorage
		arrToSort = JSON.parse(localStorage.getItem("tasks"));
		//Sorts the array by date, while preserving the immutability of the array
		arrToSort = [...arrToSort.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))];
		//Sets the array to localStorage
		localStorage.setItem("tasks", JSON.stringify(arrToSort));
		//Rerenders the new array
		renderTask();
	}

	function sortByDateDescending() {
		//Grabs the array from localStorage
		arrToSort = JSON.parse(localStorage.getItem("tasks"));
		//Sorts the array by date, while preserving the immutability of the array
		arrToSort = [...arrToSort.sort((a, b) => new Date(b.deadline) - new Date(a.deadline))];
		//Sets the array to localStorage
		localStorage.setItem("tasks", JSON.stringify(arrToSort));
		//Rerenders the new array
		renderTask();
	}

	function sortByPriority(priorityArr) {
		//The priorityArr passed as an argument establishes the sorting order of the priority strings

		//Grabs the array from localStorage
		arrToSort = JSON.parse(localStorage.getItem("tasks"));
		//Sorts the array by date, while preserving the immutability of the array
		arrToSort = [...arrToSort.sort((a, b) => priorityArr.indexOf(a.priority) - priorityArr.indexOf(b.priority))];
		//Sets the array to localStorage
		localStorage.setItem("tasks", JSON.stringify(arrToSort));
		//Rerenders the new array
		renderTask();
	}
	//Assigns an event listener to the "sort by date, ascending" button
	sortDateAscending.addEventListener("click", () => {
		sortByDateAscending();
	});
	//Assigns an event listener to the "sort by date, descending" button
	sortDateDescending.addEventListener("click", () => {
		sortByDateDescending();
	});
	//Assigns an event listener to the "sort by priority, ascending" button
	sortPriorityAscending.addEventListener("click", () => {
		sortByPriority(["Low", "Normal", "High"]);
	});
	//Assigns an event listener to the "sort by priority, descending" button
	sortPriorityDescending.addEventListener("click", () => {
		sortByPriority(["High", "Normal", "Low"]);
	});
}

export default sortTasks;
