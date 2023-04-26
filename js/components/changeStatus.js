import renderTask from "./renderTask.js";

function changeStatus() {
	const statusArr = document.querySelectorAll(".render__item__status");
	const statusEditDropdown = document.querySelectorAll(".render__item__status__dropdown");
	const optionsTodo = document.querySelectorAll(".render__item__status__dropdown__option-todo");
	const optionsInProgress = document.querySelectorAll(".render__item__status__dropdown__option-inProgress");
	const optionsDone = document.querySelectorAll(".render__item__status__dropdown__option-done");
	const yesNoDelete = document.querySelectorAll(".render__item__icons__yn-delete");
	const yesNoEdit = document.querySelectorAll(".render__item__icons__yn-edit");

	function showHideMenu(arr, item) {
		const i = [...arr].indexOf(item);

		statusEditDropdown[i].classList.toggle("active");

		document.addEventListener("click", (e) => {
			if (
				statusEditDropdown[i].classList.contains("active") &&
				e.target !== statusEditDropdown[i] &&
				e.target !== statusArr[i]
			) {
				statusEditDropdown[i].classList.remove("active");
			}
		});
	}

	function editStatus(arr, item, status) {
		let arrToChange = JSON.parse(localStorage.getItem("tasks"));

		const i = [...arr].indexOf(item);

		arrToChange[i].status = status;

		localStorage.setItem("tasks", JSON.stringify(arrToChange));
		//Rerenders the new array
		document.querySelectorAll(".render__item").forEach((a) => a.remove());
		renderTask();
	}

	statusArr.forEach((a) => {
		a.addEventListener("click", () => {
			//Prevents changing the status of a task while a task is in the process of being edited or deleted
			if (
				[...yesNoEdit].every((a) => !a.classList.contains("active")) &&
				[...yesNoDelete].every((a) => !a.classList.contains("active"))
			) {
				showHideMenu(statusArr, a);
			}
		});
	});

	optionsTodo.forEach((a) => {
		a.addEventListener("click", () => {
			editStatus(optionsTodo, a, "Todo");
		});
	});

	optionsInProgress.forEach((a) => {
		a.addEventListener("click", () => {
			editStatus(optionsInProgress, a, "In progress");
		});
	});

	optionsDone.forEach((a) => {
		a.addEventListener("click", () => {
			editStatus(optionsDone, a, "Done");
		});
	});
}

export default changeStatus;
