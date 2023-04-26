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
	//Since filtering by status and priority is very similar, I decided to make one function for both and pass different arguments depending on what is being filtered
	function filter({item, arr, objectKey, option1, option2, option3}) {
		const originalArr = JSON.parse(localStorage.getItem("tasks"));
		let arrFiltered;

		const i = [...arr].indexOf(item);
		//Depending on which option is pressed in the dropdown menu, the array is filtered and rendered
		switch (i) {
			//Option "All" for both status and priority
			case 0:
				//The original array is rendered
				document.querySelectorAll(".render__item").forEach((a) => a.remove());
				renderTask(originalArr);
				break;
			//Option "Todo" for status, "Low" for priority
			case 1:
				arrFiltered = originalArr.filter((a) => a[objectKey] === option1);
				//The filtered array is rendered
				document.querySelectorAll(".render__item").forEach((a) => a.remove());
				renderTask(arrFiltered);
				break;
			//Option "In progress" for status, "Normal" for priority
			case 2:
				arrFiltered = originalArr.filter((a) => a[objectKey] === option2);
				//The filtered array is rendered
				document.querySelectorAll(".render__item").forEach((a) => a.remove());
				renderTask(arrFiltered);
				break;
			//Option "Done" for status, "High" for priority
			case 3:
				arrFiltered = originalArr.filter((a) => a[objectKey] === option3);
				//The filtered array is rendered
				document.querySelectorAll(".render__item").forEach((a) => a.remove());
				renderTask(arrFiltered);
				break;
			default:
				break;
		}
	}

	statusOptions.forEach((a) => {
		const argumentsObject = {
			item: a,
			arr: statusOptions,
			objectKey: "status",
			option1: "Todo",
			option2: "In progress",
			option3: "Done",
		};

		a.addEventListener("click", () => {
			filter(argumentsObject);
		});
	});

	priorityOptions.forEach((a) => {
		const argumentsObject = {
			item: a,
			arr: priorityOptions,
			objectKey: "priority",
			option1: "Low",
			option2: "Normal",
			option3: "High",
		};

		a.addEventListener("click", () => {
			filter(argumentsObject);
		});
	});

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
