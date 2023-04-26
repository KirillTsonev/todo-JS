import renderTask from "./renderTask.js";

function changePriority() {
	const priorityArr = document.querySelectorAll(".render__item__priority");
	const priorityEditDropdown = document.querySelectorAll(".render__item__priority__dropdown");
	const optionsLow = document.querySelectorAll(".render__item__priority__dropdown__option-low");
	const optionsNormal = document.querySelectorAll(".render__item__priority__dropdown__option-normal");
	const optionsHigh = document.querySelectorAll(".render__item__priority__dropdown__option-high");
	const yesNoDelete = document.querySelectorAll(".render__item__icons__yn-delete");
	const yesNoEdit = document.querySelectorAll(".render__item__icons__yn-edit");

	function showHideMenu(arr, item) {
		const i = [...arr].indexOf(item);

		priorityEditDropdown[i].classList.toggle("active");

		document.addEventListener("click", (e) => {
			if (
				priorityEditDropdown[i].classList.contains("active") &&
				e.target !== priorityEditDropdown[i] &&
				e.target !== priorityArr[i]
			) {
				priorityEditDropdown[i].classList.remove("active");
			}
		});
	}

	function editPriority(arr, item, priority) {
		let arrToChange = JSON.parse(localStorage.getItem("tasks"));

		const i = [...arr].indexOf(item);

		arrToChange[i].priority = priority;

		localStorage.setItem("tasks", JSON.stringify(arrToChange));
		//Rerenders the new array
		document.querySelectorAll(".render__item").forEach((a) => a.remove());
		renderTask();
	}

	priorityArr.forEach((a) => {
		a.addEventListener("click", () => {
			//Prevents changing the priority of a task while a task is in the process of being edited or deleted
			if (
				[...yesNoEdit].every((a) => !a.classList.contains("active")) &&
				[...yesNoDelete].every((a) => !a.classList.contains("active"))
			) {
				showHideMenu(priorityArr, a);
			}
		});
	});

	optionsLow.forEach((a) => {
		a.addEventListener("click", () => {
			editPriority(optionsLow, a, "Low");
		});
	});

	optionsNormal.forEach((a) => {
		a.addEventListener("click", () => {
			editPriority(optionsNormal, a, "Normal");
		});
	});

	optionsHigh.forEach((a) => {
		a.addEventListener("click", () => {
			editPriority(optionsHigh, a, "High");
		});
	});
}

export default changePriority;
