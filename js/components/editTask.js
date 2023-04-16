import renderTask from "./renderTask.js";

function editTask() {
	//All edit buttons
	const pencils = document.querySelectorAll(".render__item__icons__pencil");
	//All delete buttons
	const trash = document.querySelectorAll(".render__item__icons__trash");
	//All descriptions
	const descriptions = document.querySelectorAll(".render__item__desc");
	//All deadlines
	const deadlines = document.querySelectorAll(".render__item__deadline");
	//All confirm buttons when editing
	const editConfirms = document.querySelectorAll(".render__item__icons__confirm-edit");
	//All cancel buttons when editing
	const editCancels = document.querySelectorAll(".render__item__icons__cancel-edit");
	//All edit description inputs
	const texts = document.querySelectorAll(".render__item__text");
	//All edit deadline inputs
	const dates = document.querySelectorAll(".render__item__date");
	//These two variables are used track whether a task is in the process of being edited or deleted
	const yesNoEdit = document.querySelectorAll(".render__item__icons__yn-edit");
	const yesNoDelete = document.querySelectorAll(".render__item__icons__yn-delete");
	//Stores the array to be edited
	let arrToEdit;
	//Stores the edited description
	let editedDesc;
	//Stores the edited deadline
	let editedDeadline;

	function editTask(item) {
		//Grabs the array from the localStorage
		arrToEdit = JSON.parse(localStorage.getItem("tasks"));
		//Tracks which edit button is pressed
		const i = [...pencils].indexOf(item);
		//Ensures only one task can be edited at a time
		if (
			[...yesNoEdit].every((a) => !a.classList.contains("active")) &&
			[...yesNoDelete].every((a) => !a.classList.contains("active"))
		) {
			//Hides the edit and delete buttons, shows the confirm and cancel buttons for editing
			pencils[i].classList.toggle("active");
			trash[i].classList.toggle("active");
			yesNoEdit[i].classList.toggle("active");
			//Preemptively sets the edited description and deadline to the original ones in case the user presses the confirm button without editing anything
			editedDesc = arrToEdit[i].desc;
			editedDeadline = arrToEdit[i].deadline;
			//Validates the deadline - cannot be in the past
			dates[i].min = new Date().toISOString().split("T")[0];
			//Sets the edit description input value to the original description
			texts[i].value = arrToEdit[i].desc;
			//Shows the edit description input, hides the description text
			texts[i].classList.toggle("active");
			descriptions[i].classList.toggle("active");
			//Shows the edit deadline description, hides the deadline text
			dates[i].classList.toggle("active");
			deadlines[i].classList.toggle("active");
			//Forces focus on the edit description input
			texts[i].focus();
			//Monitors changes to the edit description input
			texts[i].addEventListener("input", (e) => {
				editedDesc = e.target.value;
			});
			//Monitors changes to the edit deadline input
			dates[i].addEventListener("input", () => {
				editedDeadline = dates[i].valueAsDate;
			});
		}
	}

	function editCancel(item) {
		//Tracks which cancel button is pressed
		const i = [...editCancels].indexOf(item);
		//Shows the edit and delete buttons, hides the confirm and cancel buttons for editing
		pencils[i].classList.toggle("active");
		trash[i].classList.toggle("active");
		yesNoEdit[i].classList.toggle("active");
		//Hides the edit description input, shows the description text
		texts[i].classList.toggle("active");
		descriptions[i].classList.toggle("active");
		//Hides the edit deadline description, shows the deadline text
		dates[i].classList.toggle("active");
		deadlines[i].classList.toggle("active");
	}

	function editConfirm(item) {
		//Tracks which confirm button is pressed
		const i = [...editConfirms].indexOf(item);
		//Edits the array with the new description and deadline
		arrToEdit[i].desc = editedDesc;
		arrToEdit[i].deadline = editedDeadline;
		//Sets the array to localStorage
		localStorage.setItem("tasks", JSON.stringify(arrToEdit));
		//Rerenders the new array
		renderTask();
	}
	//Assigns an event listener to each edit button
	pencils.forEach((a) => {
		a.addEventListener("click", () => {
			editTask(a);
		});
	});
	//Assigns an event listener to each cancel edit button
	editCancels.forEach((a) => {
		a.addEventListener("click", () => {
			editCancel(a);
		});
	});
	//Assigns an event listener to each confirm edit button
	editConfirms.forEach((a) => {
		a.addEventListener("click", () => {
			editConfirm(a);
		});
	});
}

export default editTask;
