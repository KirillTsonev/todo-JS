import changeStatus from "./changeStatus.js";
import changePriority from "./changePriority.js";
import editTask from "./editTask.js";
import deleteTask from "./deleteTask.js";

function renderTask(arr) {
	//This could be done with the insertAdjacentHTML() method as a safe and more performant alternative to innerHTML, but in my research I found that methods, which
	//work with DOM nodes rather than parsing strings are even faster
	function renderEachTask(obj) {
		const parent = document.createElement("div");
		parent.classList.add("render__item");

		const descContainer = document.createElement("div");
		const taskDesc = document.createElement("div");

		taskDesc.classList.add("render__item__desc", "active");
		taskDesc.textContent = `${obj.desc}`;

		const editDesc = document.createElement("input");
		editDesc.classList.add("render__item__text");
		descContainer.append(taskDesc, editDesc);

		const deadlineContainer = document.createElement("div");

		const taskDeadline = document.createElement("div");
		taskDeadline.classList.add("render__item__deadline", "active");
		taskDeadline.textContent = obj.deadline ? `${obj.deadline}`.slice(0, 10) : "No date";

		const editDeadline = document.createElement("input");
		editDeadline.setAttribute("type", "date");
		editDeadline.classList.add("render__item__date");
		deadlineContainer.append(taskDeadline, editDeadline);

		const status = document.createElement("div");
		status.classList.add("render__item__status", `${obj.status}`.replace(/\s/, "").toLocaleLowerCase());
		status.textContent = `${obj.status}`;

		const statusDropdown = document.createElement("div");
		statusDropdown.classList.add("render__item__status__dropdown");

		const optionTodo = document.createElement("div");
		optionTodo.classList.add("render__item__status__dropdown__option-todo");
		optionTodo.textContent = "Todo";

		const optionInProgress = document.createElement("div");
		optionInProgress.classList.add("render__item__status__dropdown__option-inProgress");
		optionInProgress.textContent = "In progress";

		const optionDone = document.createElement("div");
		optionDone.classList.add("render__item__status__dropdown__option-done");
		optionDone.textContent = "Done";
		statusDropdown.append(optionTodo, optionInProgress, optionDone);
		status.append(statusDropdown);

		const priority = document.createElement("div");
		priority.classList.add("render__item__priority", `${obj.priority}`.toLocaleLowerCase());
		priority.textContent = `${obj.priority}`;

		const priorityDropdown = document.createElement("div");
		priorityDropdown.classList.add("render__item__priority__dropdown");

		const optionLow = document.createElement("div");
		optionLow.classList.add("render__item__priority__dropdown__option-low");
		optionLow.textContent = "Low";

		const optionNormal = document.createElement("div");
		optionNormal.classList.add("render__item__priority__dropdown__option-normal");
		optionNormal.textContent = "Normal";

		const optionHigh = document.createElement("div");
		optionHigh.classList.add("render__item__priority__dropdown__option-high");
		optionHigh.textContent = "High";
		priorityDropdown.append(optionLow, optionNormal, optionHigh);
		priority.append(priorityDropdown);

		const iconContainer = document.createElement("div");
		iconContainer.classList.add("render__item__icons");

		const editContainer = document.createElement("div");

		const pencilSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

		const pencilPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
		pencilSvg.classList.add("render__item__icons__pencil", "active");
		pencilSvg.setAttribute("viewBox", "0 0 512 512");
		pencilPath.setAttribute(
			"d",
			"M500.055,42.745l-30.81-30.81c-7.69-7.69-17.948-11.925-28.885-11.925c-10.937,0-21.195,4.235-28.885,11.925 L56.312,367.099c-0.193,0.193-0.375,0.394-0.547,0.605c-0.141,0.171-0.267,0.35-0.392,0.529c-0.027,0.039-0.059,0.076-0.085,0.115 c-0.317,0.474-0.578,0.974-0.784,1.49L0.616,500.709c-1.256,3.049-0.554,6.555,1.778,8.888c1.563,1.563,3.652,2.393,5.779,2.393 c1.047,0,2.103-0.201,3.109-0.615l130.872-53.888c0.272-0.109,0.539-0.233,0.801-0.373c0.243-0.131,0.468-0.265,0.686-0.411 c0.048-0.032,0.093-0.07,0.139-0.102c0.171-0.12,0.342-0.24,0.505-0.375c0.21-0.172,0.413-0.354,0.605-0.547l355.165-355.165 C515.982,84.586,515.982,58.672,500.055,42.745z M23.19,488.798l10.334-25.098l14.763,14.763L23.19,488.798z M64.656,471.726 l-24.392-24.392l24.712-60.016l59.695,59.695L64.656,471.726z M139.114,438.347l-26.959-26.959l210.741-210.741 c3.191-3.191,3.191-8.364,0-11.553c-3.191-3.191-8.364-3.191-11.553,0L100.601,399.835l-26.959-26.959L347.929,98.588 l26.959,26.959l-40.438,40.438c-3.191,3.191-3.191,8.364,0,11.553c1.595,1.595,3.686,2.393,5.777,2.393s4.182-0.797,5.777-2.393 l40.438-40.438l26.959,26.959L139.114,438.347z M424.955,152.506l-65.473-65.471l19.257-19.257l65.471,65.471L424.955,152.506z M488.501,88.961l-32.736,32.736l-65.472-65.471l32.736-32.736c4.603-4.603,10.758-7.139,17.331-7.139 c6.572,0,12.727,2.536,17.331,7.139l30.81,30.81C498.057,63.854,498.057,79.404,488.501,88.961z"
		);
		pencilSvg.append(pencilPath);

		const editYesNoContainer = document.createElement("div");
		editYesNoContainer.classList.add("render__item__icons__yn-edit");

		const editConfirm = document.createElement("img");
		editConfirm.classList.add("render__item__icons__confirm-edit");
		editConfirm.setAttribute("src", "./icons/green-check.svg");
		editConfirm.setAttribute("alt", "Confirm");

		const editCancel = document.createElement("img");
		editCancel.classList.add("render__item__icons__cancel-edit");
		editCancel.setAttribute("src", "./icons/x.png");
		editCancel.setAttribute("alt", "Cancel");
		editYesNoContainer.append(editConfirm, editCancel);
		editContainer.append(pencilSvg, editYesNoContainer);

		const deleteContainer = document.createElement("div");

		const trashSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

		const trashPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");

		const trashPath2 = document.createElementNS("http://www.w3.org/2000/svg", "path");

		const trashPath3 = document.createElementNS("http://www.w3.org/2000/svg", "path");

		const trashPath4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
		trashSvg.classList.add("render__item__icons__trash", "active");
		trashSvg.setAttribute("viewBox", "0 0 612 612");
		trashPath1.setAttribute(
			"d",
			"M510.812,85.933c-29.254-14.929-58.367-16.325-59.592-16.375c-0.246-0.012-0.492-0.017-0.737-0.017H404.18 c0.003-0.139,0.022-0.273,0.022-0.415c0-26.812-12.761-48.09-35.931-59.913c-16.138-8.234-31.876-9.122-33.618-9.194 C334.409,0.006,334.163,0,333.917,0h-55.832c-0.246,0-0.492,0.006-0.737,0.017c-1.741,0.074-17.48,0.96-33.616,9.194 C220.56,21.035,207.8,42.313,207.8,69.124c0,0.142,0.017,0.276,0.022,0.415h-46.303c-0.246,0-0.492,0.006-0.737,0.017 c-1.226,0.051-30.337,1.446-59.593,16.375c-28.241,14.41-61.905,44.075-61.905,103.548c0,9.581,7.767,17.35,17.35,17.35h15.245 l67.087,390.755c1.43,8.328,8.65,14.416,17.099,14.416h299.873c8.449,0,15.67-6.088,17.099-14.416l67.087-390.755h15.245 c9.581,0,17.35-7.768,17.35-17.35C572.718,130.006,539.053,100.341,510.812,85.933z M75.398,172.13 c4.22-24.493,17.846-42.891,40.665-54.828c21.272-11.123,43.329-12.888,45.936-13.063h288.005 c2.585,0.172,24.08,1.906,45.034,12.6c23.361,11.922,37.29,30.475,41.562,55.29L75.398,172.13L75.398,172.13z M242.5,69.125 c0-13.566,5.156-22.656,16.226-28.599c8.889-4.773,18.372-5.701,19.886-5.825h54.742c1.736,0.142,11.12,1.102,19.92,5.825 c11.07,5.944,16.228,15.033,16.228,28.599c0,0.142,0.017,0.276,0.022,0.415H242.48C242.482,69.401,242.5,69.265,242.5,69.125z M441.312,577.301H170.688l-63.605-370.472h397.834L441.312,577.301z"
		);
		trashPath2.setAttribute(
			"d",
			"M306,519.57c9.581,0,17.35-7.768,17.35-17.35V257.909c0-9.581-7.768-17.35-17.35-17.35c-9.583,0-17.35,7.768-17.35,17.35 V502.22C288.65,511.802,296.419,519.57,306,519.57z"
		);
		trashPath3.setAttribute(
			"d",
			"M203.782,503.754c0.801,9.022,8.373,15.816,17.261,15.816c0.513,0,1.032-0.023,1.553-0.068 c9.545-0.847,16.596-9.273,15.749-18.816l-21.687-244.311c-0.847-9.545-9.265-16.609-18.817-15.749 c-9.545,0.847-16.595,9.27-15.748,18.816L203.782,503.754z"
		);
		trashPath4.setAttribute(
			"d",
			"M389.404,519.502c0.52,0.045,1.04,0.068,1.553,0.068c8.889,0,16.462-6.794,17.263-15.816l21.687-244.313 c0.847-9.545-6.202-17.968-15.748-18.816c-9.544-0.856-17.968,6.204-18.817,15.749l-21.687,244.311 C372.808,510.229,379.859,518.655,389.404,519.502z"
		);
		trashSvg.append(trashPath1, trashPath2, trashPath3, trashPath4);

		const deleteYesNoContainer = document.createElement("div");
		deleteYesNoContainer.classList.add("render__item__icons__yn-delete");

		const deleteConfirm = document.createElement("img");
		deleteConfirm.classList.add("render__item__icons__confirm-delete");
		deleteConfirm.setAttribute("src", "./icons/green-check.svg");
		deleteConfirm.setAttribute("alt", "Confirm");

		const deleteCancel = document.createElement("img");
		deleteCancel.classList.add("render__item__icons__cancel-delete");
		deleteCancel.setAttribute("src", "./icons/x.png");
		deleteCancel.setAttribute("alt", "Cancel");
		deleteYesNoContainer.append(deleteConfirm, deleteCancel);
		deleteContainer.append(trashSvg, deleteYesNoContainer);
		iconContainer.append(editContainer, deleteContainer);

		parent.append(descContainer, deadlineContainer, status, priority, iconContainer);

		document.querySelector(".render__list").append(parent);
	}
	//If there are no tasks in the localStorage, creates example tasks
	!localStorage.getItem("tasks")
		? localStorage.setItem(
				"tasks",
				JSON.stringify([
					{
						desc: "Example task one.",
						status: "Todo",
						deadline: "2023-04-23T00:00:00.000Z",
						priority: "Low",
					},
					{
						desc: "Example task two.",
						status: "In progress",
						deadline: "2023-04-26T00:00:00.000Z",
						priority: "Normal",
					},
					{
						desc: "Example task three.",
						status: "Done",
						deadline: "2023-04-29T00:00:00.000Z",
						priority: "High",
					},
				])
		  )
		: null;

	let arrToRender;

	arr ? (arrToRender = arr) : (arrToRender = JSON.parse(localStorage.getItem("tasks")));
	//Renders all tasks from the array
	arrToRender.forEach((a) => renderEachTask(a));
	//These four function calls assign all the necessary event listeners to their specific elements
	changeStatus();
	changePriority();
	editTask();
	deleteTask();
}

export default renderTask;
