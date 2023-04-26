import renderTask from "./renderTask.js";

function deleteTask() {
	const pencils = document.querySelectorAll(".render__item__icons__pencil");
	const trash = document.querySelectorAll(".render__item__icons__trash");
	const deleteConfirms = document.querySelectorAll(".render__item__icons__confirm-delete");
	const deleteCancels = document.querySelectorAll(".render__item__icons__cancel-delete");
	const yesNoDelete = document.querySelectorAll(".render__item__icons__yn-delete");
	const yesNoEdit = document.querySelectorAll(".render__item__icons__yn-edit");
	let arrToDelete;

	function deleteTask(item) {
		arrToDelete = JSON.parse(localStorage.getItem("tasks"));

		const i = [...trash].indexOf(item);

		trash[i].classList.toggle("active");
		pencils[i].classList.toggle("active");
		yesNoDelete[i].classList.toggle("active");
	}

	function deleteCancel(item) {
		const i = [...deleteCancels].indexOf(item);

		pencils[i].classList.toggle("active");
		trash[i].classList.toggle("active");
		yesNoDelete[i].classList.toggle("active");
	}

	function deleteConfirm(item) {
		const i = [...deleteConfirms].indexOf(item);

		arrToDelete = arrToDelete.filter((a, index) => index !== i);

		localStorage.setItem("tasks", JSON.stringify(arrToDelete));
		//Rerenders the new array
		document.querySelectorAll(".render__item").forEach((a) => a.remove());
		renderTask();
	}

	trash.forEach((a) => {
		a.addEventListener("click", () => {
			//Ensures only one task can be deleted at a time
			if (
				[...yesNoEdit].every((a) => !a.classList.contains("active")) &&
				[...yesNoDelete].every((a) => !a.classList.contains("active"))
			) {
				deleteTask(a);
			}
		});
	});

	deleteCancels.forEach((a) => {
		a.addEventListener("click", () => {
			deleteCancel(a);
		});
	});

	deleteConfirms.forEach((a) => {
		a.addEventListener("click", () => {
			deleteConfirm(a);
		});
	});
}

export default deleteTask;
