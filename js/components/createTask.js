import renderTask from "./renderTask.js";

function createTask() {
	const create = document.querySelector(".creation__form__create");
	const descInput = document.querySelector(".creation__form__desc");
	const deadlineInput = document.querySelector(".creation__form__date");
	const warningDesc = document.getElementById("warningDesc");
	const warningDeadline = document.getElementById("warningDeadline");
	let desc;
	let deadline;

	descInput.addEventListener("input", (e) => {
		desc = e.target.value;

		descInput.classList.remove("alert");
		warningDesc.classList.remove("active");
	});

	deadlineInput.min = new Date().toISOString().split("T")[0];

	deadlineInput.addEventListener("input", () => {
		if (new Date() > deadlineInput.valueAsDate && deadlineInput.valueAsDate) {
			deadlineInput.classList.add("alert");
			warningDeadline.classList.add("active");
		} else {
			deadlineInput.classList.remove("alert");
			warningDeadline.classList.remove("active");

			deadline = deadlineInput.valueAsDate;
		}
	});

	create.addEventListener("click", (e) => {
		e.preventDefault();

		let tasks = JSON.parse(localStorage.getItem("tasks"));

		if (!desc) {
			descInput.classList.add("alert");
			warningDesc.classList.add("active");
		} else {
			descInput.classList.remove("alert");
			warningDesc.classList.remove("active");
		}

		if (desc && !deadlineInput.classList.contains("alert")) {
			tasks = [
				...tasks,
				{
					desc,
					status: "Todo",
					deadline: deadline ? deadline : Infinity,
					priority: "Low",
				},
			];

			localStorage.setItem("tasks", JSON.stringify(tasks));

			descInput.value = "";
			desc = "";
			deadline = "";
			deadlineInput.value = "";
			//Rerenders the new array
			document.querySelectorAll(".render__item").forEach((a) => a.remove());
			renderTask();
		}
	});
}

export default createTask;
