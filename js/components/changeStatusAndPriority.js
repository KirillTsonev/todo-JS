import renderTask from "./renderTask.js";

function changeStatusAndPriority() {
	//All statuses
	const statusArr = document.querySelectorAll(".render__item__status");
	//All priorities
	const priorityArr = document.querySelectorAll(".render__item__priority");
	//These two variables are used track whether a task is in the process of being edited or deleted
	const yesNoDelete = document.querySelectorAll(".render__item__icons__yn-delete");
	const yesNoEdit = document.querySelectorAll(".render__item__icons__yn-edit");

	//Since changing the status and priority is very similar, I decided to make one function for both and pass different arguments depending on what changes
	function changeStatusAndPriority(arr, item, option1, option2, option3, optionToChange) {
		//Grabs the task array from localStorage
		let arrToChange = JSON.parse(localStorage.getItem("tasks"));
		//Tracks which status or priority is to be changed in the array
		const i = [...arr].indexOf(item);
		//Stores the new status/priority, that will be added to the array instead of the old one
		let newOption;
		//Prevents changing the priority or status of a task while a task is in the process of being edited or deleted
		if (
			[...yesNoEdit].every((a) => !a.classList.contains("active")) &&
			[...yesNoDelete].every((a) => !a.classList.contains("active"))
		) {
			//Depending on what the current status/priority of the task is, a new one is chosen
			switch (arrToChange[i][optionToChange]) {
				case option1:
					newOption = option2;
					break;
				case option2:
					newOption = option3;
					break;
				case option3:
					newOption = option1;
					break;
				default:
					break;
			}
			//Edits the array to change the old status/priority to the new one
			arrToChange[i][optionToChange] = newOption;
			//Sets the new array ro localStorage
			localStorage.setItem("tasks", JSON.stringify(arrToChange));
			//Rerenders the new task array
			renderTask();
		}
	}
	//An event listener assigned to the status of each task
	statusArr.forEach((a) => {
		a.addEventListener("click", () => {
			changeStatusAndPriority(statusArr, a, "Todo", "In progress", "Done", "status");
		});
	});
	//An event listener assigned to the priority of each task
	priorityArr.forEach((a) => {
		a.addEventListener("click", () => {
			changeStatusAndPriority(priorityArr, a, "Low", "Normal", "High", "priority");
		});
	});
}

export default changeStatusAndPriority;
