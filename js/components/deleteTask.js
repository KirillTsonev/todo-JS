import renderTask from "./renderTask.js";

function deleteTask() {
	//All edit buttons
	const pencils = document.querySelectorAll(".render__item__icons__pencil");
	//All delete buttons
	const trash = document.querySelectorAll(".render__item__icons__trash");
	//All cofirm buttons when deleting
	const deleteConfirms = document.querySelectorAll(".render__item__icons__confirm-delete");
	//All cancel buttons when deleting
	const deleteCancels = document.querySelectorAll(".render__item__icons__cancel-delete");
	//These two variables are used track whether a task is in the process of being edited or deleted
	const yesNoDelete = document.querySelectorAll(".render__item__icons__yn-delete");
	const yesNoEdit = document.querySelectorAll(".render__item__icons__yn-edit");
	//Stores the array to be edited
	let arrToDelete;

	function deleteTask(item) {
		//Grabs the array from localStorage
		arrToDelete = JSON.parse(localStorage.getItem("tasks"));
		//Tracks which delete button is pressed
		const i = [...trash].indexOf(item);
		//Ensures only one task can be deleted at a time
		if (
			[...yesNoEdit].every((a) => !a.classList.contains("active")) &&
			[...yesNoDelete].every((a) => !a.classList.contains("active"))
		) {
			//Hides the edit and delete buttons, shows the confirm and cancel buttons for delete
			trash[i].classList.toggle("active");
			pencils[i].classList.toggle("active");
			yesNoDelete[i].classList.toggle("active");
		}
	}

	function deleteCancel(item) {
		//Tracks which cancel button is pressed
		const i = [...deleteCancels].indexOf(item);
		//Shows the edit and delete buttons, hides the confirm and cancel buttons for delete
		pencils[i].classList.toggle("active");
		trash[i].classList.toggle("active");
		yesNoDelete[i].classList.toggle("active");
	}

	function deleteConfirm(item) {
		//Tracks which confirm button is pressed
		const i = [...deleteConfirms].indexOf(item);
		//Edits the array by filtering it
		arrToDelete = arrToDelete.filter((a, index) => index !== i);
		//Sets the array to localStorage
		localStorage.setItem("tasks", JSON.stringify(arrToDelete));
		//Rerenders the new array
		renderTask();
	}
	//Assigns an event listener to each delete button
	trash.forEach((a) => {
		a.addEventListener("click", () => {
			deleteTask(a);
		});
	});
	//Assigns an event listener to each cancel delete button
	deleteCancels.forEach((a) => {
		a.addEventListener("click", () => {
			deleteCancel(a);
		});
	});
	//Assigns an event listener to each confirm delete button
	deleteConfirms.forEach((a) => {
		a.addEventListener("click", () => {
			deleteConfirm(a);
		});
	});
}

export default deleteTask;
