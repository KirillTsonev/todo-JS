import renderTask from "./renderTask.js";

function filterTasks() {
	//The "filter by status" button
	const dropdownStatus = document.querySelector(".render__header__filter-status");
	//The "filter by status" menu
	const statusMenu = document.querySelector(".render__header__status__dropdown");
	//All "filter by status" options
	const statusOptions = document.querySelectorAll(".render__header__status__dropdown__option");
	//All "filter by status" SVG paths
	const statusPaths = document.querySelectorAll(".render__header__filter-status-path");
	//The "filter by priority" button
	const dropdownPriority = document.querySelector(".render__header__filter-priority");
	//The "filter by priority" menu
	const priorityMenu = document.querySelector(".render__header__priority__dropdown");
	//All "filter by priority" options
	const priorityOptions = document.querySelectorAll(".render__header__priority__dropdown__option");
	//All "filter by priority" SVG paths
	const priorityPaths = document.querySelectorAll(".render__header__filter-priority-path");
	//Stores array to be filtered
	let arrToFilter;
	//Stores unfiltered array
	let originalArr;
	//Since filtering by status and priority is very similar, I decided to make one function for both and pass different arguments depending on what is being filtered
	function filter(item, arr, objectKey, option1, option2, option3) {
		//Grabs the array from localStorage
		arrToFilter = JSON.parse(localStorage.getItem("tasks"));
		//Makes a backup of the array
		originalArr = [...arrToFilter];
		//Tracks which option is clicked
		const i = [...arr].indexOf(item);
		//Depending on which option is pressed the array is filtered
		switch (i) {
			case 0:
				//If "All" is pressed - the original, unfiltered array is set to localStorage
				localStorage.setItem("tasks", JSON.stringify(originalArr));
				//The original array is rendered
				renderTask();
				break;
			case 1:
				//If option1 is pressed - the array filtered by that option
				arrToFilter = arrToFilter.filter((a) => a[objectKey] === option1);
				//The filtered array is set to localStorage
				localStorage.setItem("tasks", JSON.stringify(arrToFilter));
				//The filtered array is rerendered
				renderTask();
				//The original array is set to localStorage so it can be filtered again
				localStorage.setItem("tasks", JSON.stringify(originalArr));
				break;
			case 2:
				//If option2 is pressed - the array filtered by that option
				arrToFilter = arrToFilter.filter((a) => a[objectKey] === option2);
				//The filtered array is set to localStorage
				localStorage.setItem("tasks", JSON.stringify(arrToFilter));
				//The filtered array is rerendered
				renderTask();
				//The original array is set to localStorage so it can be filtered again
				localStorage.setItem("tasks", JSON.stringify(originalArr));
				break;
			case 3:
				//If option3 is pressed - the array filtered by that option
				arrToFilter = arrToFilter.filter((a) => a[objectKey] === option3);
				//The filtered array is set to localStorage
				localStorage.setItem("tasks", JSON.stringify(arrToFilter));
				//The filtered array is rerendered
				renderTask();
				//The original array is set to localStorage so it can be filtered again
				localStorage.setItem("tasks", JSON.stringify(originalArr));
				break;
			default:
				break;
		}
	}
	//Assigns an event listener to the "filter by status" button
	statusOptions.forEach((a) => {
		a.addEventListener("click", () => {
			filter(a, statusOptions, "status", "Todo", "In progress", "Done");
		});
	});
	//Assigns an event listener to the "filter by priority" button
	priorityOptions.forEach((a) => {
		a.addEventListener("click", () => {
			filter(a, priorityOptions, "priority", "Low", "Normal", "High");
		});
	});
	//Assings an event listener to the document for opening and closing the filter dropdown menus
	document.addEventListener("click", (e) => {
		//If you press the filter button and the menu is hidden - shows the menu
		//If you press the filter button and the menu is shown - hides the menu
		//If the menu is shown and you press anywhere that is not the menu options - hides the menu
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
