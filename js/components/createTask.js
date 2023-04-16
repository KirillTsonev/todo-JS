import renderTask from "./renderTask.js";

function createTask() {
	//The create button
	const create = document.querySelector(".creation__form__create");
	//The description input
	const descInput = document.querySelector(".creation__form__desc");
	//The deadline input
	const deadlineInput = document.querySelector(".creation__form__date");
	//The warning that appears if the user didn't create a task description
	const warningDesc = document.getElementById("warningDesc");
	//The warning that appears if the user didn't create a task deadline
	const warningDeadline = document.getElementById("warningDeadline");
	//Stores the task description
	let desc;
	//Stores the task deadline
	let deadline;
	//Monitors changes to the description input
	descInput.addEventListener("input", (e) => {
		desc = e.target.value;
	});
	//Validates the deadline - cannot be in the past
	deadlineInput.min = new Date().toISOString().split("T")[0];
	//Monitors changes to the deadline input
	deadlineInput.addEventListener("input", () => {
		deadline = deadlineInput.valueAsDate;
	});

	create.addEventListener("click", (e) => {
		e.preventDefault();
		//Grabs the array from localStorage
		let tasks = JSON.parse(localStorage.getItem("tasks"));
		//Shows the warning if the user didn't enter a description, removes it they did
		if (!desc) {
			descInput.classList.add("alert");
			warningDesc.classList.add("active");
		} else {
			descInput.classList.remove("alert");
			warningDesc.classList.remove("active");
		}
		//Shows the warning if the user didn't enter a deadline, removes it they did
		if (!deadline) {
			deadlineInput.classList.add("alert");
			warningDeadline.classList.add("active");
		} else {
			deadlineInput.classList.remove("alert");
			warningDeadline.classList.remove("active");
		}
		//If the user entered a description and a deadline creates a task with the default deadline and priority values. In the beginning of the development process
		//I tried creating additional input for setting a status and priority, but decided it was too cumbersome of a process, especially since they can be changed with
		//one click after the task is created
		if (desc && deadline) {
			tasks = [
				...tasks,
				{
					desc,
					status: "Todo",
					deadline,
					priority: "Low",
				},
			];
			//Sets the array to localStorage
			localStorage.setItem("tasks", JSON.stringify(tasks));
			//Resets the inputs and values
			descInput.value = "";
			desc = "";
			deadline = "";
			deadlineInput.value = "";
			//Rerenders the new array
			renderTask();
		}
	});
}

export default createTask;
