function searchFilter() {
	const searchInput = document.querySelector(".creation__search__input");

	function searchTasks(e) {
		const tasks = document.querySelectorAll(".render__item");
		const desc = document.querySelectorAll(".render__item__desc");
		const filter = e.target.value.toUpperCase();

		for (let i = 0; i < desc.length; i++) {
			const txtValue = desc[i].textContent || desc[i].innerText;

			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tasks[i].style.display = "";
			} else {
				tasks[i].style.display = "none";
			}
		}
	}

	searchInput.addEventListener("input", (e) => {
		searchTasks(e);
	});
}

export default searchFilter;
