import renderTask from "./renderTask.js";

function editTask() {
	const pencils = document.querySelectorAll(".render__item__icons__pencil");
	const trash = document.querySelectorAll(".render__item__icons__trash");
	const descriptions = document.querySelectorAll(".render__item__desc");
	const deadlines = document.querySelectorAll(".render__item__deadline");
	const editConfirms = document.querySelectorAll(".render__item__icons__confirm-edit");
	const editCancels = document.querySelectorAll(".render__item__icons__cancel-edit");
	const texts = document.querySelectorAll(".render__item__text");
	const dates = document.querySelectorAll(".render__item__date");
	const yesNoEdit = document.querySelectorAll(".render__item__icons__yn-edit");
	const yesNoDelete = document.querySelectorAll(".render__item__icons__yn-delete");
	let arrToEdit;
	let editedDesc;
	let editedDeadline;

	function editTask(item) {
		arrToEdit = JSON.parse(localStorage.getItem("tasks"));

		const i = [...pencils].indexOf(item);

		pencils[i].classList.toggle("active");
		trash[i].classList.toggle("active");
		yesNoEdit[i].classList.toggle("active");
		//Preemptively sets the edited description and deadline to the original ones in case the user presses the confirm button without editing anything
		editedDesc = arrToEdit[i].desc;
		editedDeadline = arrToEdit[i].deadline;

		dates[i].min = new Date().toISOString().split("T")[0];

		texts[i].value = arrToEdit[i].desc;

		texts[i].classList.toggle("active");
		descriptions[i].classList.toggle("active");

		dates[i].classList.toggle("active");
		deadlines[i].classList.toggle("active");

		texts[i].focus();

		texts[i].addEventListener("input", (e) => {
			editedDesc = e.target.value;
		});

		dates[i].addEventListener("input", () => {
			if (new Date() < dates[i].valueAsDate) {
				editedDeadline = dates[i].valueAsDate;
			}
		});
	}

	function editCancel(item) {
		const i = [...editCancels].indexOf(item);

		pencils[i].classList.toggle("active");
		trash[i].classList.toggle("active");
		yesNoEdit[i].classList.toggle("active");

		texts[i].classList.toggle("active");
		descriptions[i].classList.toggle("active");

		dates[i].classList.toggle("active");
		deadlines[i].classList.toggle("active");
	}

	function editConfirm(item) {
		const i = [...editConfirms].indexOf(item);

		arrToEdit[i].desc = editedDesc;
		arrToEdit[i].deadline = editedDeadline;

		localStorage.setItem("tasks", JSON.stringify(arrToEdit));
		//Rerenders the new array
		document.querySelectorAll(".render__item").forEach((a) => a.remove());
		renderTask();
	}

	pencils.forEach((a) => {
		a.addEventListener("click", () => {
			//Ensures only one task can be deleted at a time
			if (
				[...yesNoEdit].every((a) => !a.classList.contains("active")) &&
				[...yesNoDelete].every((a) => !a.classList.contains("active"))
			) {
				editTask(a);
			}
		});
	});

	editCancels.forEach((a) => {
		a.addEventListener("click", () => {
			editCancel(a);
		});
	});

	editConfirms.forEach((a) => {
		a.addEventListener("click", () => {
			if (editedDesc) {
				editConfirm(a);
			}
		});
	});
}

export default editTask;
